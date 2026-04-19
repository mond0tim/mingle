'use client';

import React from 'react';
import Link from 'next/link';
import type { GradientColors } from '../types';

interface VisualizerControlsProps {
  gradientColors: GradientColors;
  resolvedGradientColors?: GradientColors;
  channelLabels?: { start?: string; mid?: string; end?: string };
  onGradientChange: (colors: GradientColors) => void;
  bpmSpeedMultiplier: number;
  onBpmSpeedMultiplierChange: (value: number) => void;
  colorMode?: 'track' | 'custom';
  onColorModeChange?: (mode: 'track' | 'custom') => void;
}

const ColorPicker: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}> = ({ label, value, onChange, disabled }) => (
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor={`${label}-color`} className="text-xs font-medium tracking-wider text-zinc-300 uppercase">
      {label}
    </label>
    <div className={`relative h-12 w-12 overflow-hidden rounded-full border-2 border-zinc-600 shadow-lg ${disabled ? 'opacity-60' : 'cursor-pointer'}`}>
      <input
        type="color"
        id={`${label}-color`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      <div className="h-full w-full" style={{ backgroundColor: value }} />
    </div>
  </div>
);

export const VisualizerControls: React.FC<VisualizerControlsProps> = ({
  gradientColors,
  resolvedGradientColors,
  channelLabels,
  onGradientChange,
  bpmSpeedMultiplier,
  onBpmSpeedMultiplierChange,
  colorMode = 'track',
  onColorModeChange,
}) => {
  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
      <div className="mb-4 flex w-full items-center gap-3 md:mb-0 md:w-1/4">
        <Link
          href="/"
          className="shrink-0 rounded-lg border border-zinc-600 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-zinc-400 hover:text-white"
        >
          ← На главную
        </Link>
        {onColorModeChange && (
          <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-950/40 px-2 py-1">
            <button
              type="button"
              onClick={() => onColorModeChange('track')}
              className={`rounded px-2 py-1 text-[11px] font-semibold transition ${
                colorMode === 'track' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Цвета трека
            </button>
            <button
              type="button"
              onClick={() => onColorModeChange('custom')}
              className={`rounded px-2 py-1 text-[11px] font-semibold transition ${
                colorMode === 'custom' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Свои
            </button>
          </div>
        )}
      </div>

      <div className="flex w-full flex-col items-center justify-center space-y-2 md:w-1/4">
        <label className="text-xs font-medium tracking-wider text-zinc-300 uppercase">
          Множитель скорости BPM: {bpmSpeedMultiplier.toFixed(1)}x
        </label>
        <input
          type="range"
          min={0.1}
          max={5.0}
          step={0.1}
          value={bpmSpeedMultiplier}
          onChange={(e) => onBpmSpeedMultiplierChange(parseFloat(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-700"
        />
      </div>

      <div className="flex w-full items-center justify-end space-x-4 md:w-1/4">
        <ColorPicker
          label="Start"
          value={(resolvedGradientColors ?? gradientColors).start}
          onChange={(e) => onGradientChange({ ...gradientColors, start: e.target.value })}
            disabled={colorMode === 'track'}
        />
        <ColorPicker
          label="Mid"
          value={(resolvedGradientColors ?? gradientColors).mid}
          onChange={(e) => onGradientChange({ ...gradientColors, mid: e.target.value })}
          disabled={colorMode === 'track'}
        />
        <ColorPicker
          label="End"
          value={(resolvedGradientColors ?? gradientColors).end}
          onChange={(e) => onGradientChange({ ...gradientColors, end: e.target.value })}
          disabled={colorMode === 'track'}
        />
      </div>
      {(channelLabels?.start || channelLabels?.mid || channelLabels?.end) && (
        <div className="w-full text-right text-[10px] tracking-wide text-zinc-500 md:w-1/4">
          <span>Start: {channelLabels?.start ?? 'manual'} · </span>
          <span>Mid: {channelLabels?.mid ?? 'manual'} · </span>
          <span>End: {channelLabels?.end ?? 'manual'}</span>
        </div>
      )}
    </div>
  );
};
