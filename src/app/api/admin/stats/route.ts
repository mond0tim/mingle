import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.role !== "admin") return null;
  return session;
}

// GET /api/admin/stats
export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const [trackCount, playlistCount, userCount, totalStats, topTracks, recentHistory] = await Promise.all([
    prisma.track.count(),
    prisma.playlist.count(),
    prisma.user.count(),
    prisma.user.aggregate({
      _sum: {
        totalPlayTime: true
      }
    }),
    prisma.trackHistory.groupBy({
      by: ['trackId'],
      _count: {
        trackId: true
      },
      orderBy: {
        _count: {
          trackId: 'desc'
        }
      },
      take: 5
    }),
    prisma.trackHistory.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        track: true,
        user: {
          select: { name: true, email: true }
        }
      }
    })
  ]);

  // Fetch full track details for top tracks
  const topTracksDetails = await prisma.track.findMany({
    where: {
      id: { in: topTracks.map(t => t.trackId) }
    }
  });

  return NextResponse.json({ 
    trackCount, 
    playlistCount, 
    userCount, 
    totalPlayTime: totalStats._sum.totalPlayTime || 0,
    topTracks: topTracks.map(t => ({
      ...topTracksDetails.find(td => td.id === t.trackId),
      playCount: t._count.trackId
    })),
    recentHistory
  });
}
