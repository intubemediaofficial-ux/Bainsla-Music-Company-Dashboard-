import { prisma } from "@/lib/db";
import { ADMIN_ROLES } from "@/lib/auth";

export interface AutomationOutcome {
  ruleName: string;
  triggered: number;
  notified: number;
  message: string;
}

/**
 * Built-in automation checks. Each check inspects live data and returns a
 * summary plus the notifications it wants delivered to admins/owners.
 */
export const AUTOMATION_CHECKS = [
  "INVOICE_DUE_REMINDER",
  "OVERDUE_INVOICE_ALERT",
  "PENDING_PAYMENT_ALERT",
  "SONG_WITHOUT_AGREEMENT",
  "STALE_COPYRIGHT_CASE",
  "TASK_OVERDUE",
  "HIGH_RISK_AI_MATCH",
  "GST_FILING_REMINDER",
] as const;

export type AutomationCheck = (typeof AUTOMATION_CHECKS)[number];

const DAY = 24 * 60 * 60 * 1000;

async function adminUserIds(): Promise<string[]> {
  const admins = await prisma.user.findMany({
    where: { role: { in: ADMIN_ROLES as never }, status: "active" },
    select: { id: true },
  });
  return admins.map((admin) => admin.id);
}

async function notify(
  userIds: string[],
  payload: {
    title: string;
    message: string;
    type: string;
    relatedType?: string;
    relatedId?: string;
  }
): Promise<number> {
  if (userIds.length === 0) return 0;

  const existing = await prisma.notification.findMany({
    where: {
      title: payload.title,
      relatedType: payload.relatedType ?? null,
      relatedId: payload.relatedId ?? null,
      createdAt: { gte: new Date(Date.now() - DAY) },
    },
    select: { userId: true },
  });
  const alreadyNotified = new Set(existing.map((row) => row.userId));
  const targets = userIds.filter((id) => !alreadyNotified.has(id));
  if (targets.length === 0) return 0;

  await prisma.notification.createMany({
    data: targets.map((userId) => ({
      userId,
      title: payload.title,
      message: payload.message,
      type: payload.type,
      relatedType: payload.relatedType,
      relatedId: payload.relatedId,
    })),
  });
  return targets.length;
}

async function runCheck(
  check: AutomationCheck,
  recipients: string[]
): Promise<AutomationOutcome> {
  const now = new Date();

  switch (check) {
    case "INVOICE_DUE_REMINDER": {
      const invoices = await prisma.financeInvoice.findMany({
        where: {
          status: { in: ["INV_SENT", "INV_VIEWED", "INV_PARTIALLY_PAID"] },
          dueDate: { gte: now, lte: new Date(now.getTime() + 3 * DAY) },
        },
        select: { id: true, invoiceNumber: true, dueDate: true, balanceAmount: true },
      });
      let notified = 0;
      for (const invoice of invoices) {
        notified += await notify(recipients, {
          title: `Invoice ${invoice.invoiceNumber} due soon`,
          message: `Balance ₹${invoice.balanceAmount ?? 0} is due on ${invoice.dueDate?.toDateString()}.`,
          type: "finance",
          relatedType: "FinanceInvoice",
          relatedId: invoice.id,
        });
      }
      return {
        ruleName: "Invoice Due Reminder",
        triggered: invoices.length,
        notified,
        message: `${invoices.length} invoice(s) due within 3 days`,
      };
    }

    case "OVERDUE_INVOICE_ALERT": {
      const invoices = await prisma.financeInvoice.findMany({
        where: {
          status: { in: ["INV_SENT", "INV_VIEWED", "INV_PARTIALLY_PAID", "INV_OVERDUE"] },
          dueDate: { lt: now },
        },
        select: { id: true, invoiceNumber: true, balanceAmount: true },
      });
      let notified = 0;
      for (const invoice of invoices) {
        notified += await notify(recipients, {
          title: `Invoice ${invoice.invoiceNumber} is overdue`,
          message: `₹${invoice.balanceAmount ?? 0} is still unpaid past the due date.`,
          type: "finance",
          relatedType: "FinanceInvoice",
          relatedId: invoice.id,
        });
      }
      await prisma.financeInvoice.updateMany({
        where: {
          status: { in: ["INV_SENT", "INV_VIEWED"] },
          dueDate: { lt: now },
        },
        data: { status: "INV_OVERDUE" },
      });
      return {
        ruleName: "Overdue Invoice Alert",
        triggered: invoices.length,
        notified,
        message: `${invoices.length} overdue invoice(s)`,
      };
    }

    case "PENDING_PAYMENT_ALERT": {
      const payments = await prisma.financePayment.findMany({
        where: {
          status: { in: ["pending", "partial"] },
          createdAt: { lt: new Date(now.getTime() - 7 * DAY) },
        },
        select: { id: true, paymentCode: true, payeeType: true, pendingAmount: true },
      });
      let notified = 0;
      for (const payment of payments) {
        notified += await notify(recipients, {
          title: `Payment ${payment.paymentCode} pending over 7 days`,
          message: `${payment.payeeType} payout of ₹${payment.pendingAmount ?? 0} is still pending.`,
          type: "finance",
          relatedType: "FinancePayment",
          relatedId: payment.id,
        });
      }
      return {
        ruleName: "Artist Payment Alert",
        triggered: payments.length,
        notified,
        message: `${payments.length} payout(s) pending more than 7 days`,
      };
    }

    case "SONG_WITHOUT_AGREEMENT": {
      const signed = await prisma.copyrightAgreement.findMany({
        where: { signedStatus: "signed", songId: { not: null } },
        select: { songId: true },
      });
      const signedSongIds = signed
        .map((row) => row.songId)
        .filter((id): id is string => Boolean(id));

      const songs = await prisma.song.findMany({
        where: {
          id: { notIn: signedSongIds },
          agreementStatus: { not: "signed" },
        },
        select: { id: true, songTitle: true },
        take: 50,
      });
      let notified = 0;
      for (const song of songs) {
        notified += await notify(recipients, {
          title: `No signed agreement for "${song.songTitle}"`,
          message: "Add and sign the artist/writer agreement before release.",
          type: "legal",
          relatedType: "Song",
          relatedId: song.id,
        });
      }
      return {
        ruleName: "Agreement Missing Alert",
        triggered: songs.length,
        notified,
        message: `${songs.length} song(s) without a signed agreement`,
      };
    }

    case "STALE_COPYRIGHT_CASE": {
      const cases = await prisma.copyrightCase.findMany({
        where: {
          status: { notIn: ["CASE_RESOLVED", "CASE_CLOSED", "CASE_ARCHIVED"] },
          updatedAt: { lt: new Date(now.getTime() - 7 * DAY) },
        },
        select: { id: true, caseCode: true, caseTitle: true },
      });
      let notified = 0;
      for (const item of cases) {
        notified += await notify(recipients, {
          title: `Copyright case ${item.caseCode} has no update for 7 days`,
          message: `${item.caseTitle} — follow up with the platform or escalate.`,
          type: "copyright",
          relatedType: "CopyrightCase",
          relatedId: item.id,
        });
      }
      return {
        ruleName: "Copyright Follow-up",
        triggered: cases.length,
        notified,
        message: `${cases.length} stale copyright case(s)`,
      };
    }

    case "TASK_OVERDUE": {
      const tasks = await prisma.task.findMany({
        where: {
          status: { in: ["PENDING", "IN_PROGRESS"] },
          dueDate: { lt: now },
        },
        select: { id: true, title: true, assignedToId: true },
      });
      let notified = 0;
      for (const task of tasks) {
        const targets = task.assignedToId ? [task.assignedToId] : recipients;
        notified += await notify(targets, {
          title: `Task overdue: ${task.title}`,
          message: "This task has passed its due date.",
          type: "task",
          relatedType: "Task",
          relatedId: task.id,
        });
      }
      return {
        ruleName: "Overdue Task Reminder",
        triggered: tasks.length,
        notified,
        message: `${tasks.length} overdue task(s)`,
      };
    }

    case "HIGH_RISK_AI_MATCH": {
      const matches = await prisma.copyrightAiMatch.findMany({
        where: {
          riskLevel: { in: ["RISK_HIGH", "RISK_CRITICAL"] },
          reviewStatus: "pending",
        },
        select: { id: true, matchedUrl: true, matchScore: true },
      });
      let notified = 0;
      for (const match of matches) {
        notified += await notify(recipients, {
          title: "High risk copyright match needs review",
          message: `${match.matchedUrl ?? "Unknown URL"} matched at ${match.matchScore ?? 0}%.`,
          type: "copyright",
          relatedType: "CopyrightAiMatch",
          relatedId: match.id,
        });
      }
      return {
        ruleName: "High Risk Match Alert",
        triggered: matches.length,
        notified,
        message: `${matches.length} high risk match(es) pending review`,
      };
    }

    case "GST_FILING_REMINDER": {
      const previous = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const pending = await prisma.financeGstEntry.count({
        where: {
          gstMonth: previous.getMonth() + 1,
          gstYear: previous.getFullYear(),
          status: "pending",
        },
      });
      let notified = 0;
      if (pending > 0) {
        notified = await notify(recipients, {
          title: "GST filing pending for last month",
          message: `${pending} GST entr(ies) for ${previous.toLocaleString("en-IN", { month: "long", year: "numeric" })} are not filed yet.`,
          type: "finance",
          relatedType: "FinanceGstEntry",
          relatedId: `${previous.getFullYear()}-${previous.getMonth() + 1}`,
        });
      }
      return {
        ruleName: "GST Monthly Reminder",
        triggered: pending,
        notified,
        message: pending > 0 ? `${pending} unfiled GST entr(ies)` : "GST up to date",
      };
    }
  }
}

/** Runs every built-in automation check and writes an AutomationLog row per check. */
export async function runAutomations(
  only?: AutomationCheck
): Promise<AutomationOutcome[]> {
  const recipients = await adminUserIds();
  const checks = only ? [only] : [...AUTOMATION_CHECKS];
  const outcomes: AutomationOutcome[] = [];

  for (const check of checks) {
    try {
      const outcome = await runCheck(check, recipients);
      outcomes.push(outcome);
      await prisma.automationLog.create({
        data: {
          triggerData: check,
          actionData: JSON.stringify(outcome),
          status: "success",
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      outcomes.push({
        ruleName: check,
        triggered: 0,
        notified: 0,
        message: `Failed: ${message}`,
      });
      await prisma.automationLog.create({
        data: { triggerData: check, status: "error", error: message },
      });
    }
  }

  await prisma.automationRule.updateMany({
    where: { isActive: true },
    data: { lastTriggeredAt: new Date() },
  });

  return outcomes;
}
