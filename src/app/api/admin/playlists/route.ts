import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") return null;
  return session;
}

// GET /api/admin/playlists?page=1&search=...
export async function GET(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const limit = 20;
  const skip = (page - 1) * limit;

  const where = search ? { title: { contains: search } } : {};

  const [playlists, total] = await Promise.all([
    prisma.playlist.findMany({
      where,
      include: { _count: { select: { tracks: true } } },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.playlist.count({ where }),
  ]);

  return NextResponse.json({ playlists, total, page, pages: Math.ceil(total / limit) });
}

// PUT /api/admin/playlists
export async function PUT(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await request.json();
  const { id, title, cover, category, isPublic, colors } = body;

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const updated = await prisma.playlist.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(cover !== undefined && { cover }),
      ...(category !== undefined && { category }),
      ...(isPublic !== undefined && { isPublic }),
      ...(colors !== undefined && { colors }),
    },
  });

  return NextResponse.json({ playlist: updated });
}

// DELETE /api/admin/playlists
export async function DELETE(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.playlist.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

// POST /api/admin/playlists
export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await request.json();
  const { title, cover, category, isPublic, authorId } = body;

  const playlist = await prisma.playlist.create({
    data: {
      title: title || "Новый плейлист",
      cover: cover || null,
      category: category || "PLAYLIST",
      isPublic: isPublic ?? false,
      authorId: authorId || session.user.id,
    }
  });

  return NextResponse.json({ playlist });
}
