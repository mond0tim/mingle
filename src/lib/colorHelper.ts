import { FastAverageColor } from 'fast-average-color';

export interface ColorThiefOutput {
  background: string;
  title: string;
  button: string;
  buttonColor?: string;
}

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

export const getColorFromURL = async (
  imageUrl: string
): Promise<ColorThiefOutput | null> => {
  const storageKey = 'playlistColorsCacheArr';

  type PlaylistColorCache = { url: string; colors: ColorThiefOutput };

  let cacheArr: PlaylistColorCache[] = [];

  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        cacheArr = JSON.parse(raw);
        const found = cacheArr.find((item) => item.url === imageUrl);
        if (found) {
          return found.colors;
        }
      } catch {}
    }
  }

  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = imageUrl;

  return new Promise((resolve) => {
    img.onload = () => {
      const fac = new FastAverageColor();
      try {
        const color = fac.getColor(img);
        const [r, g, b] = color.value;
        const background = color.hex;

        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const isLight = luminance > 128;

        const title = isLight ? darkenColor([r, g, b], 0.7) : lightenColor([r, g, b], 0.8);
        const button = isLight ? darkenColor([r, g, b], 0.4) : lightenColor([r, g, b], 0.5);

        const result = { background, title, button };
        if (typeof window !== 'undefined') {
          try {
            cacheArr.push({ url: imageUrl, colors: result });
            localStorage.setItem(storageKey, JSON.stringify(cacheArr));
          } catch {}
        }
        resolve(result);
      } catch (err) {
        console.error('Error in fac:', err);
        resolve(null);
      }
    };
    img.onerror = () => {
      console.error('Error loading image for color thief:', imageUrl);
      resolve(null);
    };
  });
};

export const getContrastingColor = (hexColor: string, alpha = 1): string => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate perceived luminance (brightness)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Choose white or black based on luminance
  return luminance > 0.6
    ? `rgba(0, 0, 0, ${alpha})`
    : `rgba(255, 255, 255, ${alpha})`;
};

const componentToHex = (c: number): string => {
  const hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

const rgbToHex = (rgb: number[]): string => {
  return (
    '#' +
    componentToHex(rgb[0]) +
    componentToHex(rgb[1]) +
    componentToHex(rgb[2])
  );
};