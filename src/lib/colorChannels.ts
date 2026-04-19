export const COLOR_CHANNELS = [
  'dominant',
  'accent',
  'vibrant',
  'muted',
  'darkVibrant',
  'darkMuted',
  'lightVibrant',
  'lightMuted',
  'facetSimple',
  'facetSqrt',
  'facetDominant',
  'vibrantDominant',
  'vibrantAccent',
  'background',
  'button',
  'title',
  'icon',
] as const;

export type ColorChannel = (typeof COLOR_CHANNELS)[number];

export type ColorBinding = {
  channel?: ColorChannel;
  manual?: string;
  adjust?: number; // -1..1 ; negative darkens, positive lightens
};

export type ColorBindings = {
  playerPrimary?: ColorBinding;
  playerSecondary?: ColorBinding;
  visualizerStart?: ColorBinding;
  visualizerMid?: ColorBinding;
  visualizerEnd?: ColorBinding;
};

export const DEFAULT_TRACK_BINDINGS: ColorBindings = {
  playerPrimary: { channel: 'dominant', adjust: 0 },
  playerSecondary: { channel: 'accent', adjust: 0 },
  visualizerStart: { channel: 'darkMuted', adjust: 0 },
  visualizerMid: { channel: 'vibrant', adjust: 0 },
  visualizerEnd: { channel: 'darkVibrant', adjust: 0 },
};

const HEX_RE = /^#([0-9a-fA-F]{6})$/;

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function toHex(n: number) {
  return Math.round(n).toString(16).padStart(2, '0');
}

export function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && HEX_RE.test(value);
}

export function adjustColor(hex: string, adjust = 0) {
  if (!isHexColor(hex)) return hex;
  const amount = Math.max(-1, Math.min(1, adjust));
  if (amount === 0) return hex;

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (amount > 0) {
    const k = clamp01(amount);
    return `#${toHex(r + (255 - r) * k)}${toHex(g + (255 - g) * k)}${toHex(b + (255 - b) * k)}`;
  }

  const k = clamp01(Math.abs(amount));
  return `#${toHex(r * (1 - k))}${toHex(g * (1 - k))}${toHex(b * (1 - k))}`;
}

export function pickChannelColor(
  palette: Record<string, unknown> | null | undefined,
  binding: ColorBinding | undefined,
  fallback: string,
) {
  if (binding?.manual && isHexColor(binding.manual)) {
    return adjustColor(binding.manual, binding.adjust ?? 0);
  }

  const fromChannel = binding?.channel ? palette?.[binding.channel] : undefined;
  if (isHexColor(fromChannel)) {
    return adjustColor(fromChannel, binding?.adjust ?? 0);
  }

  return fallback;
}

export function withDefaultTrackBindings(bindings?: ColorBindings): ColorBindings {
  const b = bindings ?? {};
  return {
    playerPrimary: { ...DEFAULT_TRACK_BINDINGS.playerPrimary, ...b.playerPrimary },
    playerSecondary: { ...DEFAULT_TRACK_BINDINGS.playerSecondary, ...b.playerSecondary },
    visualizerStart: { ...DEFAULT_TRACK_BINDINGS.visualizerStart, ...b.visualizerStart },
    visualizerMid: { ...DEFAULT_TRACK_BINDINGS.visualizerMid, ...b.visualizerMid },
    visualizerEnd: { ...DEFAULT_TRACK_BINDINGS.visualizerEnd, ...b.visualizerEnd },
  };
}

