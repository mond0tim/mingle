import { useState, useEffect } from 'react';
import ColorThief from 'colorthief';
import { Track } from '@/types';

// Simple in-memory cache for extracted colors
const colorCache = new Map<string, { dominant: string; rgb: [number, number, number]; accent: string }>();

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
  const [accentColor, setAccentColor] = useState<string>('#f5f5f5');

  useEffect(() => {
    if (!currentTrack || !currentTrack.cover) {
      setDominantColor('#f5f5f5');
      setRgb([245, 245, 245]);
      setAccentColor('#0c0312');
      return;
    }

    const cacheKey = currentTrack.cover;

    if (colorCache.has(cacheKey)) {
      const cached = colorCache.get(cacheKey)!;
      setDominantColor(cached.dominant);
      setRgb(cached.rgb);
      setAccentColor(cached.accent);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = currentTrack.cover;

    const handleImageLoad = () => {
      try {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(img);
        const finalColor = currentTrack.color ? hexToRgb(currentTrack.color) : color;
        const hexColor = `#${finalColor.map((x: number) => x.toString(16).padStart(2, '0')).join('')}`;
        const [r, g, b] = finalColor;
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const isLight = luminance > 128;

        const calculatedAccent = isLight ? darkenColor(finalColor, 0.5) : lightenColor(finalColor, 0.7);

        setAccentColor(calculatedAccent);
        setDominantColor(hexColor);
        setRgb([r, g, b]);

        // Save to cache
        colorCache.set(cacheKey, {
          dominant: hexColor,
          rgb: [r, g, b],
          accent: calculatedAccent,
        });
      } catch (error) {
        console.error('Failed to extract color:', error);
        setDominantColor('#0f0f23');
        setRgb([245, 245, 245]);
        setAccentColor('#f5f5f5');
      }
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
  }, [currentTrack]);

  return { dominantColor, rgb, accentColor };
};
