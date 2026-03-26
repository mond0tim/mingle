import { NextRequest, NextResponse } from 'next/server';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Добавляем простой in-memory кэш ---
const lyricsCache = new Map<string, Record<string, unknown>>();

function getCacheKey(track_name: string, artist_name: string, album_name: string, duration: string) {
    return `${track_name}__${artist_name}__${album_name}__${duration}`;
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const track_name = searchParams.get('track_name');
    const artist_name = searchParams.get('artist_name');
    const album_name = searchParams.get('album_name') || '';
    const duration = searchParams.get('duration') || '';

    if (!track_name || !artist_name) {
        return NextResponse.json(
            { error: 'Missing required query parameters: track_name and artist_name are required' },
            { status: 400 }
        );
    }

    const cacheKey = getCacheKey(track_name, artist_name, album_name, duration);

    // --- Проверяем кэш ---
    if (lyricsCache.has(cacheKey)) {
        return NextResponse.json(lyricsCache.get(cacheKey));
    }

    const apiUrl = `https://lrclib.net/api/get?track_name=${encodeURIComponent(
        track_name
    )}&artist_name=${encodeURIComponent(
        artist_name
    )}&album_name=${encodeURIComponent(
        album_name
    )}&duration=${encodeURIComponent(duration)}`;

    let attempts = 0;
    let data;
    let res;
    const maxAttempts = 2;
    const delayMs = 10;

    while (attempts < maxAttempts) {
        try {
            res = await fetch(apiUrl);
            data = await res.json();

            if (res.status !== 404) {
                // --- Кэшируем только успешные ответы ---
                if (res.ok) {
                    lyricsCache.set(cacheKey, data);
                    return NextResponse.json(data);
                } else {
                    return NextResponse.json(data, { status: res.status });
                }
            }
            // Если 404 — ждём и пробуем ещё раз
            attempts++;
            if (attempts < maxAttempts) {
                await sleep(delayMs);
            }
        } catch (error) {
            return NextResponse.json(
                { error: `Failed to fetch lyrics ${error}`  },
                { status: 500 }
            );
        }
    }

    // Если после всех попыток всё равно 404 — возвращаем 404 (не кэшируем)
    return NextResponse.json(data, { status: 404 });
}