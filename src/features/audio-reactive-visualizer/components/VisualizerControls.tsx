'use client';

import React from 'react';
import Link from 'next/link';
import type { GradientColors } from '../types';

import { Switch } from '@/components/animate-ui/components/radix/switch';

interface VisualizerControlsProps {
  gradientColors: GradientColors;
  resolvedGradientColors?: GradientColors;
  channelLabels?: { start?: string; mid?: string; end?: string };
  onGradientChange: (colors: GradientColors) => void;
  bpmSpeedMultiplier: number;
  onBpmSpeedMultiplierChange: (value: number) => void;
  colorMode?: 'track' | 'custom';
  onColorModeChange?: (mode: 'track' | 'custom') => void;
  smoothColorTransitions?: boolean;
  onSmoothColorTransitionsChange?: (value: boolean) => void;
  colorBrightness?: number;
  onColorBrightnessChange?: (value: number) => void;
}

const ColorPicker: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}> = ({ label, value, onChange, disabled }) => (
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor={`${label}-color`} className="text-[10px] font-black tracking-[0.1em] text-zinc-500 uppercase">
      {label}
    </label>
    <div className={`relative h-10 w-10 overflow-hidden rounded-xl border border-zinc-800 shadow-lg ${disabled ? 'opacity-40' : 'cursor-pointer hover:border-zinc-500 transition-colors'}`}>
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
  smoothColorTransitions = true,
  onSmoothColorTransitionsChange,
  colorBrightness = 1.0,
  onColorBrightnessChange,
}) => {
  return (
    <div className="flex w-full max-w-7xl flex-col gap-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        {/* Left: Navigation & Mode */}
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-fit shrink-0 rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 transition hover:border-zinc-600 hover:text-white"
          >
            ← Home
          </Link>
          {onColorModeChange && (
            <div className="flex items-center gap-1 w-fit rounded-xl border border-zinc-800 bg-zinc-950/40 p-1">
              <button
                type="button"
                onClick={() => onColorModeChange('track')}
                className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                  colorMode === 'track' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                Track
              </button>
              <button
                type="button"
                onClick={() => onColorModeChange('custom')}
                className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${
                  colorMode === 'custom' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                Custom
              </button>
            </div>
          )}
        </div>

        {/* Center-Left: BPM Speed */}
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-center">
             <label className="text-[10px] font-black tracking-[0.1em] text-zinc-500 uppercase">
               BPM Speed Multiplier
             </label>
             <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded-md border border-zinc-800">{bpmSpeedMultiplier.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={5.0}
            step={0.1}
            value={bpmSpeedMultiplier}
            onChange={(e) => onBpmSpeedMultiplierChange(parseFloat(e.target.value))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-zinc-200"
          />
        </div>

        {/* Center-Right: Brightness & Smooth */}
        <div className="flex flex-col gap-4">
           <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black tracking-[0.1em] text-zinc-500 uppercase">
                  Brightness
                </label>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded-md border border-zinc-800">{Math.round(colorBrightness * 100)}%</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={2.0}
                step={0.05}
                value={colorBrightness}
                onChange={(e) => onColorBrightnessChange?.(parseFloat(e.target.value))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-zinc-200"
              />
           </div>
           {onSmoothColorTransitionsChange && (
             <div className="flex items-center justify-between">
                <label className="text-[10px] font-black tracking-[0.1em] text-zinc-500 uppercase">Smooth transitions</label>
                <Switch 
                  checked={smoothColorTransitions} 
                  onCheckedChange={onSmoothColorTransitionsChange}
                />
             </div>
           )}
        </div>

        {/* Right: Colors */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-end space-x-4">
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
            <div className="text-right text-[9px] font-black uppercase tracking-widest text-zinc-600">
              {channelLabels?.start ?? 'man'} · {channelLabels?.mid ?? 'man'} · {channelLabels?.end ?? 'man'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
