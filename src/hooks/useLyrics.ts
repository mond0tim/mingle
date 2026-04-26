'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Track, LyricsApiResponse } from '@/types';
import { usePlayerStore } from '@/features/player/store/playerStore';

interface SyncedLine {
  time: number | null;
  text: string;
}

function parseSyncedLyrics(syncedLyrics: string): SyncedLine[] {
  const lines = syncedLyrics.split('\n');
  return lines.map((line) => {
    if (line.trim() === '') return { time: null, text: '' };
    const match = line.match(/^\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]\s*(.*)$/);
    if (!match) return { time: null, text: line };
    const [, min, sec, ms, text] = match;
    const time =
      parseInt(min) * 60 + parseInt(sec) + (ms ? parseInt(ms) / (ms.length === 3 ? 1000 : 100) : 0);
    return { time, text };
  });
}

const lyricsCache = new Map<string, LyricsApiResponse>();

export const useLyrics = (currentTrack: Track | null) => {
  const seek = usePlayerStore(state => state.seek);
  const duration = usePlayerStore(state => state.duration);
  const playing = usePlayerStore(state => state.playing);
  
  const [lyricsData, setLyricsData] = useState<LyricsApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track the last track ID to clear stale data immediately
  const lastTrackIdRef = useRef<string | number | null>(null);

  const getArtistForApi = (artist: string) => artist.split(',')[0].trim();
  const getCacheKey = (track: Track) => String(track.id);

  // Clear lyrics data IMMEDIATELY when the track changes (prevents stale line flash)
  useEffect(() => {
    const trackId = currentTrack?.id ?? null;
    if (trackId !== lastTrackIdRef.current) {
      lastTrackIdRef.current = trackId;
      setLyricsData(null);
      setError(null);
      setLoading(false);
    }
  }, [currentTrack?.id]);

  // Fetch lyrics
  useEffect(() => {
    if (!currentTrack || !currentTrack.title || !currentTrack.artist || !duration) {
      return;
    }

    const cacheKey = getCacheKey(currentTrack);
    if (lyricsCache.has(cacheKey)) {
      setLyricsData(lyricsCache.get(cacheKey)!);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetchLyrics = () => {
      const params = new URLSearchParams({
        track_name: currentTrack.title,
        artist_name: getArtistForApi(currentTrack.artist),
        duration: Math.round(duration).toString(),
      });

      fetch(`https://lrclib.net/api/get?${params.toString()}`)
        .then(async (res) => {
          if (!res.ok) throw new Error('Lyrics not found');
          return res.json();
        })
        .then((data) => {
          if (cancelled) return;
          lyricsCache.set(cacheKey, data);
          setLyricsData(data);
          setLoading(false);
        })
        .catch((e) => {
          if (cancelled) return;
          setError(e.message);
          setLoading(false);
        });
    };

    fetchLyrics();
    return () => { cancelled = true; };
  }, [currentTrack?.id, duration]);

  const syncedLines = useMemo(() => {
    if (lyricsData?.syncedLyrics) return parseSyncedLyrics(lyricsData.syncedLyrics);
    return null;
  }, [lyricsData?.syncedLyrics]);

  const currentLineIdx = useMemo(() => {
    if (!syncedLines) return -1;
    for (let i = syncedLines.length - 1; i >= 0; i--) {
      const line = syncedLines[i];
      if (line && line.time !== null && seek >= line.time) return i;
    }
    return -1;
  }, [syncedLines, seek]);

  // Find the first synced line with actual text content
  const firstLineTime = useMemo(() => {
    if (!syncedLines) return null;
    const first = syncedLines.find(l => l.text.trim() !== '' && l.time !== null);
    return first?.time ?? null;
  }, [syncedLines]);

  // Whether lyrics playback is "active" (500ms before first line, or any line reached)
  const lyricsActive = useMemo(() => {
    if (!lyricsData) return false;
    // Plain lyrics without sync — always active when track is playing
    if (lyricsData.plainLyrics && !lyricsData.syncedLyrics) return playing;
    // Synced: already past a line
    if (currentLineIdx >= 0) return true;
    // Synced: within 500ms of first line
    if (firstLineTime !== null && seek >= firstLineTime - 0.5) return true;
    return false;
  }, [lyricsData, currentLineIdx, firstLineTime, seek, playing]);

  return {
    lyricsData,
    syncedLines,
    currentLineIdx,
    loading,
    error,
    playing,
    lyricsActive,
    firstLineTime,
    currentLine: syncedLines && currentLineIdx !== -1 ? syncedLines[currentLineIdx] : null,
    nextLine: syncedLines && currentLineIdx !== -1 && currentLineIdx + 1 < syncedLines.length ? syncedLines[currentLineIdx + 1] : null,
    prevLine: syncedLines && currentLineIdx > 0 ? syncedLines[currentLineIdx - 1] : null,
  };
};
