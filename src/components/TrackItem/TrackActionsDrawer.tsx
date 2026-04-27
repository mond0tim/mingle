"use client";

import React from 'react';
import { Drawer } from 'vaul';
import { Track } from '@/types';
import { TrackActionsContent } from './TrackActions';

interface TrackActionsDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  track: Track;
  context?: 'queue' | 'playlist' | 'history';
  onRemove?: (trackId: string | number) => void;
}

export const TrackActionsDrawer: React.FC<TrackActionsDrawerProps> = ({
  isOpen,
  onOpenChange,
  track,
  context,
  onRemove,
}) => {
  return (
    <Drawer.Root open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[10000] backdrop-blur-sm" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[10001] bg-[#1a1a1a] rounded-t-[30px] border-t border-white/10 focus:outline-none overflow-hidden">
          <Drawer.Title className="sr-only">Track Actions</Drawer.Title>
          <div 
            className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
            style={{ background: 'url("/noise.png")', backgroundSize: '100px', backgroundRepeat: 'repeat' }} 
          />
          <div 
            className="absolute inset-0 z-[-1]" 
            style={{ 
              backgroundColor: 'color-mix(in srgb, var(--dominant-color, #0f0f23) 95%, transparent 10%)', 
              backdropFilter: 'blur(60px) contrast(6)' 
            }} 
          />
          
          <div className="relative z-10 p-6 pt-2">
            <div className="mx-auto w-12 h-1 flex-shrink-0 rounded-full bg-white/20 mb-6 mt-1" />
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-2xl">
                <img src={track.cover || "/placeholder.png"} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-xl truncate leading-tight">{track.title}</h3>
                <p className="text-white/60 truncate text-base">{track.artist}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-[24px] p-2">
              <TrackActionsContent 
                track={track} 
                context={context} 
                onRemove={onRemove} 
                closeMenu={() => onOpenChange(false)} 
              />
            </div>
            <div className="mt-4 pb-2">
              <button
                onClick={() => onOpenChange(false)}
                className="w-full py-4 bg-white/5 rounded-[20px] font-semibold text-lg transition-colors active:bg-white/10"
              >
                Отмена
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
