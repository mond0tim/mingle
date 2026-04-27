'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Settings2, RefreshCw, Palette, Loader2 } from 'lucide-react';
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
import { ColorStudio } from './ColorStudio';
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
  entityId?: string | number;
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

  const saveColors = async () => {
    if (!entityId) return;
    setIsSaving(true);
    try {
      const endpoint =
        entityType === 'track'
          ? `/api/admin/tracks`
          : `/api/admin/playlists`;
      const payload = { id: entityId, colors };
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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" variant="outline" className="border-zinc-800 bg-zinc-900/50 text-zinc-200 hover:bg-zinc-800 rounded-xl gap-2 font-bold uppercase tracking-widest text-[10px]">
          <Settings2 className="size-3.5" />
          {triggerLabel}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-[calc(100vw-80px)] xl:max-w-[1200px] border-zinc-800 bg-zinc-950 text-zinc-100 p-0 flex flex-col shadow-2xl">
        <SheetHeader className="p-8 border-b border-zinc-800/50 bg-zinc-900/20">
          <div className="flex items-center gap-4 mb-2">
             <div className="p-3 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                <Palette className="size-6 text-zinc-400" />
             </div>
             <div>
                <SheetTitle className="text-2xl font-black uppercase tracking-tighter italic">Color Studio</SheetTitle>
                <SheetDescription className="text-zinc-500 font-medium">Каналы, ручное управление и настройка тонов медиа-объекта.</SheetDescription>
             </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <ColorStudio 
            colors={colors}
            onChange={setColors}
            onReextract={reextract}
            isReextracting={isReextracting}
            coverUrl={coverUrl}
            showReextract={true}
          />
        </div>

        <div className="p-8 border-t border-zinc-800/50 bg-zinc-900/20 flex items-center justify-between">
           <Button variant="ghost" className="text-zinc-500 hover:text-zinc-100" onClick={() => setOpen(false)}>
              Закрыть
           </Button>
            <Button 
             className="bg-zinc-100 text-zinc-900 font-bold px-8 py-6 rounded-full uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-white/5 gap-2" 
             onClick={saveColors} 
             disabled={isSaving || !entityId}
            >
               {isSaving ? <Loader2 className="size-4 animate-spin" /> : null}
               {isSaving ? 'Сохранение...' : 'Применить изменения'}
            </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

