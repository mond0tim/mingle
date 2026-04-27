'use client';

import React from 'react';
import { COLOR_CHANNELS, type ColorBindings } from '@/lib/colorChannels';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

type BindingKey = keyof ColorBindings;

const BINDING_FIELDS: Array<{ key: BindingKey; title: string }> = [
  { key: 'playerPrimary', title: 'Плеер · Primary' },
  { key: 'playerSecondary', title: 'Плеер · Secondary' },
  { key: 'visualizerStart', title: 'Визуалайзер · Start' },
  { key: 'visualizerMid', title: 'Визуалайзер · Mid' },
  { key: 'visualizerEnd', title: 'Визуалайзер · End' },
];

export function ColorBindingsEditor({
  bindings,
  onChange,
  onReextract,
  isReextracting = false,
}: {
  bindings: ColorBindings;
  onChange: (next: ColorBindings) => void;
  onReextract?: () => void;
  isReextracting?: boolean;
}) {
  const updateField = (key: BindingKey, patch: Partial<NonNullable<ColorBindings[BindingKey]>>) => {
    const prev = bindings[key] ?? {};
    onChange({ ...bindings, [key]: { ...prev, ...patch } });
  };

  return (
    <div className="space-y-3 rounded-xl border border-zinc-800/70 bg-zinc-900/30 p-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Каналы и ручные override</p>
        {onReextract && (
          <Button size="sm" variant="outline" className="h-7 border-zinc-700 text-zinc-300" onClick={onReextract} disabled={isReextracting}>
            <RefreshCw className={`mr-1 h-3 w-3 ${isReextracting ? 'animate-spin' : ''}`} />
            Переизвлечь
          </Button>
        )}
      </div>

      {BINDING_FIELDS.map(({ key, title }) => (
        <div key={key} className="grid grid-cols-12 gap-2">
          <div className="col-span-12 text-[10px] font-semibold text-zinc-400 md:col-span-3">{title}</div>
          <div className="col-span-4 md:col-span-3">
            <Label className="mb-1 block text-[9px] text-zinc-500">Channel</Label>
            <select
              className="h-9 w-full rounded-md border border-zinc-800 bg-zinc-950 px-2 text-xs text-zinc-200"
              value={bindings[key]?.channel ?? ''}
              onChange={(e) => updateField(key, { channel: (e.target.value || undefined) as any })}
            >
              <option value="">auto</option>
              {COLOR_CHANNELS.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-4 md:col-span-3">
            <Label className="mb-1 block text-[9px] text-zinc-500">Manual</Label>
            <Input
              className="h-9 border-zinc-800 bg-zinc-950 text-xs"
              placeholder="#112233"
              value={bindings[key]?.manual ?? ''}
              onChange={(e) => updateField(key, { manual: e.target.value || undefined })}
            />
          </div>
          <div className="col-span-4 md:col-span-3">
            <Label className="mb-1 block text-[9px] text-zinc-500">Adjust (-1..1)</Label>
            <Input
              className="h-9 border-zinc-800 bg-zinc-950 text-xs"
              type="number"
              min={-1}
              max={1}
              step={0.05}
              value={bindings[key]?.adjust ?? 0}
              onChange={(e) => updateField(key, { adjust: Number(e.target.value || 0) })}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

