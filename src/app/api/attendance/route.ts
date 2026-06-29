import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const records = await prisma.attendanceRecord.findMany({
    orderBy: { attendanceDate: "desc" },
    take: 100,
  });
  return NextResponse.json(records);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  const record = await prisma.attendanceRecord.create({
    data: {
      staffId: session.id,
      attendanceDate: new Date(),
      checkInTime: new Date(),
      checkInLatitude: data.latitude ? parseFloat(data.latitude) : null,
      checkInLongitude: data.longitude ? parseFloat(data.longitude) : null,
      deviceId: data.deviceId || null,
      notes: data.notes || null,
    },
  });

  return NextResponse.json(record, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  if (!data.recordId) {
    return NextResponse.json({ error: "recordId is required" }, { status: 400 });
  }

  const record = await prisma.attendanceRecord.update({
    where: { id: data.recordId },
    data: {
      checkOutTime: new Date(),
      checkOutLatitude: data.latitude ? parseFloat(data.latitude) : null,
      checkOutLongitude: data.longitude ? parseFloat(data.longitude) : null,
    },
  });

  return NextResponse.json(record);
}
