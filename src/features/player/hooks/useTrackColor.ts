import { useState, useEffect } from 'react';
import { FastAverageColor } from 'fast-average-color';
import { Track } from '@/types';
import { usePlayerStore } from '@/features/player/store/playerStore';
import { pickChannelColor, withDefaultTrackBindings } from '@/lib/colorChannels';

// Simple in-memory cache for extracted colors
const colorCache = new Map<string, {
  dominant: string;
  rgb: [number, number, number];
  accent: string;
  fullPalette?: Track['colors'];
}>();

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
};

const darkenColor = (color: [number, number, number], amount: number): string => {
  const [r, g, b] = color;
  return `#${[r, g, b]
    .map((c) =>
      Math.max(0, Math.round(c - c * amount))
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`;
};

const lightenColor = (color: [number, number, number], amount: number): string => {
  const [r, g, b] = color;
  return `#${[r, g, b]
    .map((c) =>
      Math.min(255, Math.round(c + (255 - c) * amount))
        .toString(16)
        .padStart(2, '0')
    )
    .join('')}`;
};

export const useTrackColor = (currentTrack: Track | null) => {
  const [dominantColor, setDominantColor] = useState<string>('#0c0312');
  const [rgb, setRgb] = useState<[number, number, number]>([245, 245, 245]);
  const [accentColor, setAccentColor] = useState<string>('#000000ff');
  const [fullPalette, setFullPalette] = useState<Track['colors']>(null);

  const updateTrackColors = usePlayerStore(state => state.updateTrackColors);

  useEffect(() => {
    if (!currentTrack || !currentTrack.cover) {
      setDominantColor('#000000ff');
      setRgb([245, 245, 245]);
      setAccentColor('#ffffffff');
      setFullPalette(null);
      return;
    }

    const trackId = String(currentTrack.id);
    const cacheKey = currentTrack.cover;

    // 1. ПРИОРИТЕТ: Объект трека (если цвета уже в объекте)
    if (currentTrack.colors && currentTrack.colors.dominant && currentTrack.colors.accent) {
      const { dominant, accent } = currentTrack.colors;
      const parsedRgb = hexToRgb(dominant);
      const bindings = withDefaultTrackBindings((currentTrack.colors as any)?.bindings);
      const resolvedPrimary = pickChannelColor(
        currentTrack.colors as any,
        bindings.playerPrimary,
        dominant,
      );
      const resolvedSecondary = pickChannelColor(
        currentTrack.colors as any,
        bindings.playerSecondary,
        accent,
      );
      setDominantColor(resolvedPrimary);
      setRgb(parsedRgb);
      setAccentColor(resolvedSecondary);
      setFullPalette(currentTrack.colors);

      // Обновляем кэш, чтобы он не хранил старые данные после ре-экстракции
      colorCache.set(cacheKey, { dominant, rgb: parsedRgb, accent, fullPalette: currentTrack.colors });
      return;
    }

    // 2. ВТОРОЙ ШАНС: Локальный кэш модуля (только если в объекте пусто)
    if (colorCache.has(cacheKey)) {
      const cached = colorCache.get(cacheKey)!;
      setDominantColor(cached.dominant);
      setRgb(cached.rgb);
      setAccentColor(cached.accent);
      if (cached.fullPalette) setFullPalette(cached.fullPalette);
      return;
    }

    // 3. ЭКСТРАКЦИЯ: Если цветов нет нигде
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentTrack.cover;

    const handleImageLoad = () => {
      // Defer heavy calculation so it doesn't block track transition animations
      setTimeout(() => {
        try {
          const fac = new FastAverageColor();
          fac.getColorAsync(img)
            .then((color) => {
              const { value, hex } = color;
              const [r, g, b] = value;
              const finalColor: [number, number, number] = currentTrack.color ? hexToRgb(currentTrack.color) : [r, g, b] as [number, number, number];
              const hexColor = currentTrack.color ? `#${finalColor.map((x: number) => x.toString(16).padStart(2, '0')).join('')}` : hex;

              const luminance = (0.2126 * finalColor[0]) + (0.7152 * finalColor[1]) + (0.0722 * finalColor[2]);
              const isLight = luminance > 128;

              const calculatedAccent = isLight ? darkenColor(finalColor, 0.5) : lightenColor(finalColor, 0.7);

              // Мгновенное обновление UI (пре-экстракция)
              setAccentColor(calculatedAccent);
              setDominantColor(hexColor);
              setRgb([finalColor[0], finalColor[1], finalColor[2]]);

              colorCache.set(cacheKey, {
                dominant: hexColor,
                rgb: [finalColor[0], finalColor[1], finalColor[2]],
                accent: calculatedAccent,
                fullPalette: null,
              });

              // Запрос на полноценную серверную экстракцию (или получение из кэша БД)
              fetch(`/api/colors/extract`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: currentTrack.cover, id: trackId, type: 'track' })
              })
                .then(res => res.json())
                .then(data => {
                  if (data && data.colors) {
                    const newColors = data.colors;

                    // Сначала обновляем локальный кэш, чтобы Effect при следующем прогоне увидел новые данные
                    const parsedRgb = hexToRgb(newColors.dominant);
                    const bindings = withDefaultTrackBindings(newColors.bindings);
                    const resolvedPrimary = pickChannelColor(
                      newColors,
                      bindings.playerPrimary,
                      newColors.dominant,
                    );
                    const resolvedSecondary = pickChannelColor(
                      newColors,
                      bindings.playerSecondary,
                      newColors.accent,
                    );
                    colorCache.set(cacheKey, {
                      dominant: resolvedPrimary,
                      rgb: parsedRgb,
                      accent: resolvedSecondary,
                      fullPalette: newColors,
                    });

                    // Обновляем глобальный стор
                    updateTrackColors(trackId, newColors);

                    // Локальное состояние хука
                    setFullPalette(newColors);
                    if (newColors.dominant && newColors.accent) {
                      setDominantColor(resolvedPrimary);
                      setAccentColor(resolvedSecondary);
                      setRgb(parsedRgb);
                    }
                  }
                })
                .catch((e) => console.error('Failed to trigger deep extraction', e));
            })
            .catch((error) => {
              console.error('Failed to extract color:', error);
              setDominantColor('#0f0f23');
              setRgb([245, 245, 245]);
              setAccentColor('#f5f5f5');
            });
        } catch (error) {
          console.error('Failed to init color extraction:', error);
        }
      }, 0);
    };

    img.onerror = () => {
      console.error('Image failed to load for color extraction:', currentTrack.cover);
      setDominantColor('#0f0f23');
      setRgb([245, 245, 245]);
      setAccentColor('#f5f5f5');
    };

    if (img.complete) {
      handleImageLoad();
    } else {
      img.onload = handleImageLoad;
    }
  }, [currentTrack, updateTrackColors]);

  return { dominantColor, rgb, accentColor, fullPalette };
};
