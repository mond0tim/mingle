'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Settings2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from '@/components/animate-ui/components/animate/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/animate-ui/components/radix/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  COLOR_CHANNELS,
  type ColorBindings,
  type ColorChannel,
  withDefaultTrackBindings,
  pickChannelColor,
} from '@/lib/colorChannels';

type BindingKey = keyof ColorBindings;

const BINDING_ROWS: Array<{ key: BindingKey; title: string }> = [
  { key: 'playerPrimary', title: 'Player primary' },
  { key: 'playerSecondary', title: 'Player secondary' },
  { key: 'visualizerStart', title: 'Visualizer start' },
  { key: 'visualizerMid', title: 'Visualizer mid' },
  { key: 'visualizerEnd', title: 'Visualizer end' },
];

function Swatch({ color }: { color?: string }) {
  return (
    <span
      className="inline-block h-4 w-4 rounded border border-zinc-700"
      style={{ backgroundColor: color || 'transparent' }}
    />
  );
}

export function ColorStudioSheet({
  entityType,
  entityId,
  coverUrl,
  initialColors,
  onSaved,
  triggerLabel = 'Color Studio',
}: {
  entityType: 'track' | 'playlist';
  entityId?: string;
  coverUrl?: string | null;
  initialColors?: any;
  onSaved?: (colors: any) => void;
  triggerLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState<any>(initialColors ?? {});
  useEffect(() => {
    setColors(initialColors ?? {});
  }, [initialColors, entityId]);

  const [isSaving, setIsSaving] = useState(false);
  const [isReextracting, setIsReextracting] = useState(false);

  const bindings = useMemo(
    () => withDefaultTrackBindings((colors?.bindings ?? {}) as ColorBindings),
    [colors?.bindings],
  );

  const setBinding = (key: BindingKey, patch: any) => {
    setColors((prev: any) => ({
      ...(prev ?? {}),
      bindings: {
        ...(prev?.bindings ?? {}),
        [key]: { ...((prev?.bindings ?? {})[key] ?? {}), ...patch },
      },
    }));
  };

  const saveColors = async () => {
    if (!entityId) return;
    setIsSaving(true);
    try {
      const endpoint =
        entityType === 'track'
          ? `/api/admin/tracks`
          : `/api/admin/playlists`;
      const payload =
        entityType === 'track'
          ? { id: entityId, colors }
          : { id: entityId, colors };
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('save failed');
      onSaved?.(colors);
    } finally {
      setIsSaving(false);
    }
  };

  const reextract = async () => {
    if (!entityId || !coverUrl) return;
    setIsReextracting(true);
    try {
      const res = await fetch('/api/colors/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: entityId, url: coverUrl, type: entityType, force: true }),
      });
      const data = await res.json();
      if (data?.colors) {
        setColors((prev: any) => ({
          ...data.colors,
          bindings: prev?.bindings ?? data.colors.bindings ?? {},
        }));
      }
    } finally {
      setIsReextracting(false);
    }
  };

  const extractedEntries = COLOR_CHANNELS.filter((k) => typeof colors?.[k] === 'string');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline" className="border-zinc-700 text-zinc-200">
          <Settings2 className="mr-1 h-3.5 w-3.5" />
          {triggerLabel}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-[920px] overflow-hidden border-zinc-800 bg-zinc-950 text-zinc-100">
        <SheetHeader className="border-b border-zinc-800">
          <SheetTitle>Color Studio</SheetTitle>
          <SheetDescription>
            Каналы, manual override и tone adjust. Отображение extracted/manual/result.
          </SheetDescription>
        </SheetHeader>

        <div className="flex h-[calc(100%-88px)] flex-col overflow-hidden p-4">
          <Tabs defaultValue="bindings" className="h-full">
            <TabsList className="mb-3">
              <TabsTrigger value="bindings">Bindings</TabsTrigger>
              <TabsTrigger value="extracted">Extracted</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
            <TabsContents className="min-h-0 flex-1 overflow-hidden">
              <TabsContent value="bindings" className="h-full overflow-auto pr-1">
                <div className="space-y-4">
                  {BINDING_ROWS.map((row) => {
                    const binding = bindings[row.key] ?? {};
                    const resolved = pickChannelColor(colors ?? {}, binding, '#777777');
                    const channelColor =
                      binding.channel && typeof colors?.[binding.channel] === 'string'
                        ? String(colors[binding.channel])
                        : undefined;
                    return (
                      <div key={row.key} className="rounded-xl border border-zinc-800 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-sm font-semibold">{row.title}</p>
                          <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <span>Result</span>
                            <Swatch color={resolved} />
                            <span className="font-mono">{resolved}</span>
                          </div>
                        </div>
                        <div className="mb-3 flex flex-wrap gap-3 text-[11px] text-zinc-500">
                          <span>
                            channel: <span className="font-mono text-zinc-300">{binding.channel ?? 'auto'}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            extracted:
                            <Swatch color={channelColor} />
                            <span className="font-mono text-zinc-300">{channelColor ?? '—'}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            manual:
                            <Swatch color={binding.manual} />
                            <span className="font-mono text-zinc-300">{binding.manual ?? '—'}</span>
                          </span>
                        </div>
                        <div className="grid gap-3 md:grid-cols-3">
                          <div>
                            <Label className="text-[10px] uppercase tracking-wider text-zinc-500">Manual</Label>
                            <Input
                              className="mt-1 border-zinc-800 bg-zinc-900 text-xs"
                              placeholder="#112233"
                              value={binding.manual ?? ''}
                              onChange={(e) => setBinding(row.key, { manual: e.target.value || undefined })}
                            />
                          </div>
                          <div>
                            <Label className="text-[10px] uppercase tracking-wider text-zinc-500">Adjust</Label>
                            <Input
                              className="mt-1 border-zinc-800 bg-zinc-900 text-xs"
                              type="number"
                              min={-1}
                              max={1}
                              step={0.05}
                              value={binding.adjust ?? 0}
                              onChange={(e) => setBinding(row.key, { adjust: Number(e.target.value || 0) })}
                            />
                          </div>
                          <div>
                            <Label className="text-[10px] uppercase tracking-wider text-zinc-500">Selected channel</Label>
                            <div className="mt-1 rounded-md border border-zinc-800 p-2">
                              <RadioGroup
                                value={binding.channel ?? ''}
                                onValueChange={(v) => setBinding(row.key, { channel: (v || undefined) as ColorChannel | undefined })}
                                className="grid grid-cols-2 gap-2 md:grid-cols-3"
                              >
                                <label className="flex items-center gap-2 text-xs text-zinc-300">
                                  <RadioGroupItem value="" id={`${row.key}-auto`} />
                                  <span>auto</span>
                                </label>
                                {COLOR_CHANNELS.map((channel) => (
                                  <label key={channel} className="flex items-center gap-2 text-xs text-zinc-300">
                                    <RadioGroupItem value={channel} id={`${row.key}-${channel}`} />
                                    <span>{channel}</span>
                                  </label>
                                ))}
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="extracted" className="h-full overflow-auto pr-1">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {extractedEntries.map((k) => (
                    <div key={k} className="flex items-center justify-between rounded-md border border-zinc-800 p-2 text-xs">
                      <span className="text-zinc-300">{k}</span>
                      <div className="flex items-center gap-2">
                        <Swatch color={colors[k]} />
                        <span className="font-mono text-zinc-400">{String(colors[k])}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="manual" className="h-full overflow-auto pr-1">
                <div className="space-y-2 text-xs text-zinc-400">
                  {BINDING_ROWS.map((row) => (
                    <div key={row.key} className="flex items-center justify-between rounded-md border border-zinc-800 p-2">
                      <span>{row.title}</span>
                      <div className="flex items-center gap-2">
                        <Swatch color={bindings[row.key]?.manual} />
                        <span className="font-mono">{bindings[row.key]?.manual || '—'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </TabsContents>
          </Tabs>

          <div className="mt-3 flex items-center justify-between border-t border-zinc-800 pt-3">
            <Button variant="outline" className="border-zinc-700 text-zinc-200" onClick={reextract} disabled={isReextracting || !coverUrl}>
              <RefreshCw className={`mr-1 h-3.5 w-3.5 ${isReextracting ? 'animate-spin' : ''}`} />
              Переизвлечь
            </Button>
            <Button onClick={saveColors} disabled={isSaving || !entityId}>
              {isSaving ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

