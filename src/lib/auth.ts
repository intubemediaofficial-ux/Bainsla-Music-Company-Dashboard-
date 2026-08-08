import { cookies } from "next/headers";
import { prisma } from "./db";
import jwt from "jsonwebtoken";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  return secret;
}

const JWT_SECRET = getJwtSecret();

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string | null;
  clientId?: string | null;
}

export async function createToken(user: SessionUser): Promise<string> {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      clientId: user.clientId ?? null,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export async function verifyToken(token: string): Promise<SessionUser | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as SessionUser;
    return decoded;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatarUrl: true,
      phone: true,
    },
  });
  return user;
}

export function hasPermission(
  userRole: string,
  allowedRoles: string[]
): boolean {
  return allowedRoles.includes(userRole);
}

/** Landing page for a role after login: portal users never see the staff dashboard. */
export function homePathForRole(role: string): string {
  return role === "ARTIST_CLIENT" ? "/artist" : "/dashboard";
}

export const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER"];
export const ALL_STAFF_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "MANAGER",
  "YOUTUBE_MANAGER",
  "COPYRIGHT_MANAGER",
  "DESIGNER",
  "STUDIO_STAFF",
  "VIDEO_TEAM",
  "ACCOUNTANT",
];
