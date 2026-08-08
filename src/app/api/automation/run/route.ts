import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { AUTOMATION_CHECKS, runAutomations, type AutomationCheck } from "@/lib/automation";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { check?: string };
  const check =
    body.check && (AUTOMATION_CHECKS as readonly string[]).includes(body.check)
      ? (body.check as AutomationCheck)
      : undefined;

  const outcomes = await runAutomations(check);
  return NextResponse.json({ outcomes });
}
