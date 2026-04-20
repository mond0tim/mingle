export interface GradientColors {
  start: string;
  mid: string;
  end: string;
}

export interface AudioReactiveVisualizerPrefs {
  gradientColors: GradientColors;
  bpmSpeedMultiplier: number;
  colorMode?: 'track' | 'custom';
  smoothColorTransitions?: boolean;
  colorBrightness?: number;
}
