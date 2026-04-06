import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import fs from "fs";
import path from "path";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") {
    return null;
  }
  return session;
}

// GET /api/admin/tracks?limit=100&search=...
export async function GET(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "100");
  const search = searchParams.get("search") || "";

  const where = search
    ? {
        OR: [
          { title: { contains: search } },
          { artist: { contains: search } },
        ],
      }
    : {};

  const tracks = await prisma.track.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return NextResponse.json({ tracks });
}

// PUT /api/admin/tracks  — update track metadata
export async function PUT(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const body = await request.json();
  const { id, title, artist, cover, colors } = body;

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const updated = await prisma.track.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(artist !== undefined && { artist }),
      ...(cover !== undefined && { cover }),
      ...(colors !== undefined && { colors }),
    },
  });

  return NextResponse.json({ track: updated });
}

// DELETE /api/admin/tracks
export async function DELETE(request: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id, deleteFile } = await request.json();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const track = await prisma.track.findUnique({ where: { id } });
  if (!track) return NextResponse.json({ error: "Track not found" }, { status: 404 });

  // 1. Если запрошено удаление файла - удаляем физически
  if (deleteFile === true && track.src) {
    try {
      // track.src обычно "/audio/filename.mp3"
      const relativePath = track.src.startsWith("/") ? track.src.slice(1) : track.src;
      const filePath = path.join(process.cwd(), "public", relativePath);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error("File deletion error:", err);
      // Мы продолжаем удаление записи из БД, даже если файл не удалился (например, его уже нет)
    }
  }

  // 2. Удаляем запись из БД
  await prisma.track.delete({ where: { id } });
  
  return NextResponse.json({ success: true });
}
