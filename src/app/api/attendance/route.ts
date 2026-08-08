import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession, type SessionUser } from "@/lib/auth";

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function coord(value: unknown): number | null {
  const parsed = typeof value === "number" ? value : parseFloat(String(value ?? ""));
  return Number.isFinite(parsed) ? parsed : null;
}

async function todayRecord(session: SessionUser) {
  return prisma.attendanceRecord.findFirst({
    where: { staffId: session.id, attendanceDate: { gte: startOfToday() } },
    orderBy: { createdAt: "desc" },
  });
}

async function logGps(
  userId: string,
  latitude: number | null,
  longitude: number | null,
  data: Record<string, unknown>
) {
  if (latitude === null || longitude === null) return;
  await prisma.gpsLog.create({
    data: {
      userId,
      relatedModule: "attendance",
      latitude,
      longitude,
      accuracy: coord(data.accuracy),
      address: typeof data.address === "string" ? data.address : null,
      deviceId: typeof data.deviceId === "string" ? data.deviceId : null,
    },
  });
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [today, records] = await Promise.all([
    todayRecord(session),
    prisma.attendanceRecord.findMany({
      where: { staffId: session.id },
      orderBy: { attendanceDate: "desc" },
      take: 60,
    }),
  ]);

  return NextResponse.json({ today, records });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await todayRecord(session);
  if (existing) {
    return NextResponse.json(
      { error: "You have already checked in today", record: existing },
      { status: 400 }
    );
  }

  const data = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const latitude = coord(data.latitude);
  const longitude = coord(data.longitude);

  const record = await prisma.attendanceRecord.create({
    data: {
      staffId: session.id,
      attendanceDate: startOfToday(),
      checkInTime: new Date(),
      checkInLatitude: latitude,
      checkInLongitude: longitude,
      deviceId: typeof data.deviceId === "string" ? data.deviceId : null,
      notes: typeof data.notes === "string" ? data.notes : null,
    },
  });

  await logGps(session.id, latitude, longitude, data);

  return NextResponse.json(record, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const existing =
    typeof data.recordId === "string"
      ? await prisma.attendanceRecord.findFirst({
          where: { id: data.recordId, staffId: session.id },
        })
      : await todayRecord(session);

  if (!existing) {
    return NextResponse.json({ error: "No check-in found to close" }, { status: 400 });
  }
  if (existing.checkOutTime) {
    return NextResponse.json(
      { error: "You have already checked out", record: existing },
      { status: 400 }
    );
  }

  const latitude = coord(data.latitude);
  const longitude = coord(data.longitude);
  const checkOutTime = new Date();
  const workingMinutes = existing.checkInTime
    ? Math.max(
        0,
        Math.round(
          (checkOutTime.getTime() - existing.checkInTime.getTime()) / 60000
        ) - (existing.breakMinutes ?? 0)
      )
    : null;

  const record = await prisma.attendanceRecord.update({
    where: { id: existing.id },
    data: {
      checkOutTime,
      checkOutLatitude: latitude,
      checkOutLongitude: longitude,
      workingMinutes,
    },
  });

  await logGps(session.id, latitude, longitude, data);

  return NextResponse.json(record);
}
