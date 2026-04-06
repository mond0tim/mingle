import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") return null;
  return session;
}

// GET /api/admin/users?page=1&search=...
export async function GET(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const limit = 20;
  const skip = (page - 1) * limit;

  const where = search
    ? {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
        ],
      }
    : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        banned: true,
        isReadOnly: true,
        canMakePlaylistsPublic: true,
        loginCount: true,
        lastLoginAt: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return NextResponse.json({ users, total, page, pages: Math.ceil(total / limit) });
}

// PUT /api/admin/users — update role/permissions
export async function PUT(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await request.json();
  const { id, role, banned, isReadOnly, canMakePlaylistsPublic } = body;

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  // Нельзя забанить себя
  if (id === session.user.id && banned === true) {
    return NextResponse.json({ error: "Cannot ban yourself" }, { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id },
    data: {
      ...(role !== undefined && { role }),
      ...(banned !== undefined && { banned }),
      ...(isReadOnly !== undefined && { isReadOnly }),
      ...(canMakePlaylistsPublic !== undefined && { canMakePlaylistsPublic }),
    },
  });

  return NextResponse.json({ user: updated });
}
