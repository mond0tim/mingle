'use client';
 
import React, { useMemo } from 'react';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContents, 
  TabsContent 
} from '@/components/animate-ui/components/animate/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/animate-ui/components/radix/toggle-group';
import { Switch } from '@/components/animate-ui/components/radix/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RefreshCw, Palette, Settings2, SlidersHorizontal, MousePointer2 } from 'lucide-react';
import { 
  COLOR_CHANNELS, 
  type ColorBindings, 
  type ColorChannel, 
  withDefaultTrackBindings, 
  pickChannelColor 
} from '@/lib/colorChannels';
import { cn } from '@/lib/utils';
 
export interface ColorStudioProps {
  colors: any;
  onChange: (colors: any) => void;
  onReextract?: () => void;
  isReextracting?: boolean;
  coverUrl?: string | null;
  className?: string;
  showReextract?: boolean;
}
 
const BINDING_ROWS: Array<{ key: keyof ColorBindings; title: string }> = [
  { key: 'playerPrimary', title: 'Player Primary' },
  { key: 'playerSecondary', title: 'Player Secondary' },
  { key: 'visualizerStart', title: 'Visualizer Start' },
  { key: 'visualizerMid', title: 'Visualizer Mid' },
  { key: 'visualizerEnd', title: 'Visualizer End' },
];
 
function Swatch({ color, className }: { color?: string; className?: string }) {
  return (
    <div
      className={cn("h-4 w-4 rounded-sm border border-zinc-800 shadow-inner flex-shrink-0", className)}
      style={{ backgroundColor: color || 'transparent' }}
    />
  );
}
 
export function ColorStudio({
  colors,
  onChange,
  onReextract,
  isReextracting = false,
  coverUrl,
  className,
  showReextract = true,
}: ColorStudioProps) {
  const bindings = useMemo(
    () => withDefaultTrackBindings((colors?.bindings ?? {}) as ColorBindings),
    [colors?.bindings]
  );
 
  const setBinding = (key: keyof ColorBindings, patch: any) => {
    const updatedColors = {
      ...(colors ?? {}),
      bindings: {
        ...(colors?.bindings ?? {}),
        [key]: { ...((colors?.bindings ?? {})[key] ?? {}), ...patch },
      },
    };
    onChange(updatedColors);
  };
 
  const extractedEntries = COLOR_CHANNELS.filter(
    (k) => typeof colors?.[k] === 'string' && colors[k].startsWith('#')
  );
 
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Tabs defaultValue="bindings" className="w-full">
        <TabsList className="w-full grid grid-cols-3 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800/50">
          <TabsTrigger value="bindings" className="gap-2">
            <Settings2 className="size-3.5" />
            <span>Привязки</span>
          </TabsTrigger>
          <TabsTrigger value="extracted" className="gap-2">
            <Palette className="size-3.5" />
            <span>Палитра</span>
          </TabsTrigger>
          <TabsTrigger value="manual" className="gap-2">
            <SlidersHorizontal className="size-3.5" />
            <span>Manual</span>
          </TabsTrigger>
        </TabsList>
 
        <TabsContents className="mt-4">
          <TabsContent value="bindings" className="space-y-3">
            {BINDING_ROWS.map((row) => {
              const binding = bindings[row.key] ?? {};
              const resolved = pickChannelColor(colors ?? {}, binding, '#111111');
              const channelColor = binding.channel && colors?.[binding.channel] ? String(colors[binding.channel]) : undefined;
 
              return (
                <div key={row.key} className="p-4 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 group/row hover:border-zinc-700/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover/row:text-zinc-200 transition-colors">{row.title}</span>
                      <Swatch color={resolved} className="size-3" />
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                          <span className="text-[10px] font-mono text-zinc-500">Result:</span>
                          <span className="text-[10px] font-mono text-zinc-100">{resolved}</span>
                       </div>
                    </div>
                  </div>
 
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Выбор канала</Label>
                      <ToggleGroup 
                        type="single" 
                        value={binding.channel ?? ''} 
                        onValueChange={(v) => setBinding(row.key, { channel: v as ColorChannel })}
                        className="bg-zinc-950/50 p-1 rounded-xl border border-zinc-800/30 flex-wrap w-full h-auto"
                      >
                         <ToggleGroupItem value="" className="px-3 py-1.5 h-8">
                            <span className="text-[10px] font-bold uppercase">Auto</span>
                         </ToggleGroupItem>
                         {extractedEntries.map((channel) => (
                           <ToggleGroupItem key={channel} value={channel} className="px-3 py-1.5 h-8 gap-2">
                              <Swatch color={colors[channel]} className="size-2 rounded-full border-white/20" />
                              <span className="text-[10px] font-bold uppercase">{channel}</span>
                           </ToggleGroupItem>
                         ))}
                      </ToggleGroup>
                    </div>
 
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Manual Override</Label>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Input 
                                className="bg-zinc-950/50 border-zinc-800/30 h-9 text-xs font-mono pl-8"
                                placeholder="#HEX color"
                                value={binding.manual ?? ''}
                                onChange={(e) => setBinding(row.key, { manual: e.target.value })}
                              />
                              <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
                                <Swatch color={binding.manual} className="size-3.5 border-white/10" />
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="size-9 bg-zinc-950/50 border border-zinc-800/30 text-zinc-500 hover:text-zinc-200"
                              onClick={() => setBinding(row.key, { manual: undefined })}
                            >
                               <RefreshCw className="size-3.5" />
                            </Button>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Яркость ({binding.adjust ?? 0})</Label>
                          <Input 
                            type="number" 
                            step={0.1} 
                            min={-1} 
                            max={1}
                            className="bg-zinc-950/50 border-zinc-800/30 h-9 text-xs"
                            value={binding.adjust ?? 0}
                            onChange={(e) => setBinding(row.key, { adjust: parseFloat(e.target.value) })}
                          />
                       </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </TabsContent>
 
          <TabsContent value="extracted" className="space-y-4">
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {extractedEntries.map((k) => (
                  <div key={k} className="p-3 bg-zinc-900/30 border border-zinc-800/50 rounded-xl flex items-center gap-3">
                     <Swatch color={colors[k]} className="size-8 rounded-lg shadow-lg" />
                     <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 truncate">{k}</p>
                        <p className="text-xs font-mono text-zinc-300">{colors[k]}</p>
                     </div>
                  </div>
                ))}
             </div>
          </TabsContent>
 
          <TabsContent value="manual" className="space-y-4">
             <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 text-center space-y-4">
                <MousePointer2 className="size-8 text-zinc-700 mx-auto" />
                <div>
                   <p className="text-sm font-bold text-zinc-400">Прямое управление цветами</p>
                   <p className="text-xs text-zinc-600 mt-1 max-w-[280px] mx-auto">Здесь вы можете видеть все активные ручные переопределения для текущего объекта.</p>
                </div>
             </div>
             <div className="space-y-2">
                {BINDING_ROWS.map(row => {
                  const b = bindings[row.key];
                  if (!b?.manual) return null;
                  return (
                    <div key={row.key} className="flex items-center justify-between p-3 bg-zinc-900/50 border border-zinc-800/30 rounded-xl">
                       <span className="text-xs font-medium text-zinc-400">{row.title}</span>
                       <div className="flex items-center gap-3">
                          <Swatch color={b.manual} />
                          <span className="text-xs font-mono text-zinc-200">{b.manual}</span>
                       </div>
                    </div>
                  );
                })}
             </div>
          </TabsContent>
        </TabsContents>
      </Tabs>
 
      {showReextract && onReextract && (
        <div className="pt-4 border-t border-zinc-800/50 flex justify-between items-center">
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Действия</span>
               <span className="text-[11px] text-zinc-500">Переизвлечь заново из обложки</span>
            </div>
            <Button 
              variant="outline" 
              className="border-zinc-800 bg-zinc-900/30 hover:bg-zinc-800 rounded-xl gap-2"
              onClick={onReextract}
              disabled={isReextracting || !coverUrl}
            >
              <RefreshCw className={cn("size-3.5", isReextracting && "animate-spin")} />
              {isReextracting ? 'Извлечение...' : 'Переизвлечь палитру'}
            </Button>
        </div>
      )}
    </div>
  );
}
