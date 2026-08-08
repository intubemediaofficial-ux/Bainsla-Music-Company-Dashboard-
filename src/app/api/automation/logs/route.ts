import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const logs = await prisma.automationLog.findMany({
    orderBy: { executedAt: "desc" },
    take: 100,
  });
  return NextResponse.json(logs);
}
