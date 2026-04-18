'use client';

import React, { useState } from 'react';
import { usePlayerStore } from '@/features/player/store/playerStore';
import { useTrackColor } from '@/features/player/hooks/useTrackColor';
import { useSession } from '@/lib/auth-client';
import styles from './ColorPaletteDisplay.module.css';
import { RefreshCw } from 'lucide-react';

const ColorPaletteDisplay: React.FC = () => {
  const { currentTrack, updateTrackColors } = usePlayerStore();
  const { fullPalette } = useTrackColor(currentTrack);
  const { data: session } = useSession();
  const [isExtracting, setIsExtracting] = useState(false);

  const isAdmin = session?.user?.role === 'admin';

  const handleReextract = async () => {
    if (!currentTrack || isExtracting) return;
    
    setIsExtracting(true);
    try {
      const res = await fetch('/api/colors/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: currentTrack.cover, 
          id: currentTrack.id, 
          type: 'track',
          force: true 
        })
      });
      
      const data = await res.json();
      if (data.colors) {
        updateTrackColors(String(currentTrack.id), data.colors);
      }
    } catch (e) {
      console.error('Failed to re-extract colors:', e);
    } finally {
      setIsExtracting(false);
    }
  };

  if (!currentTrack) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>Запустите трек, чтобы увидеть его палитру</div>
      </div>
    );
  }

  const facEntries = [
    { name: 'FAC: Dominant', hex: fullPalette?.facetDominant, desc: 'Most frequent (accurate)' },
    { name: 'FAC: Sqrt', hex: fullPalette?.facetSqrt, desc: 'Perceived average' },
    { name: 'FAC: Simple', hex: fullPalette?.facetSimple, desc: 'Linear average' },
  ].filter(c => c.hex);

  const legacyEntries = [
    { name: 'Vibrant: Dominant', hex: fullPalette?.vibrantDominant, desc: 'Old primary mode' },
    { name: 'Vibrant: Accent', hex: fullPalette?.vibrantAccent, desc: 'Old accent mode' },
  ].filter(c => c.hex);

  const vibrantEntries = [
    { name: 'Vibrant', hex: fullPalette?.vibrant },
    { name: 'Muted', hex: fullPalette?.muted },
    { name: 'Dark Vibrant', hex: fullPalette?.darkVibrant },
    { name: 'Dark Muted', hex: fullPalette?.darkMuted },
    { name: 'Light Vibrant', hex: fullPalette?.lightVibrant },
    { name: 'Light Muted', hex: fullPalette?.lightMuted },
  ].filter(c => c.hex);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="flex flex-col gap-1">
          <h2 className={styles.title}>Экстракция цветов</h2>
          <div className={styles.trackInfo}>
            <span className={styles.trackTitle}>{currentTrack.title}</span>
          </div>
        </div>

        {isAdmin && (
          <button 
            onClick={handleReextract}
            disabled={isExtracting}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 border border-white/5 transition-all group disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 text-zinc-400 group-hover:text-white transition-all ${isExtracting ? 'animate-spin' : ''}`} />
            <span className="text-[10px] font-bold text-zinc-400 group-hover:text-white uppercase tracking-wider">
              {isExtracting ? 'Пересчет...' : 'Переизвлечь'}
            </span>
          </button>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 opacity-50">Fast Average Color (Primary)</h3>
        <div className={styles.grid}>
          {facEntries.map((color, idx) => (
            <div key={`${color.name}-${idx}`} className={styles.colorItem}>
              <div 
                className={styles.swatch} 
                style={{ backgroundColor: color.hex }} 
              />
              <span className={styles.colorName}>{color.name}</span>
              <span className={styles.hexCode}>{color.hex}</span>
              {color.desc && <span className="text-[9px] opacity-40">{color.desc}</span>}
            </div>
          ))}
        </div>
      </div>

      {legacyEntries.length > 0 && (
        <div className="mb-8">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 opacity-50">Vibrant Mode (Legacy)</h3>
          <div className={styles.grid}>
            {legacyEntries.map((color, idx) => (
              <div key={`${color.name}-${idx}`} className={styles.colorItem}>
                <div 
                  className={styles.swatch} 
                  style={{ backgroundColor: color.hex }} 
                />
                <span className={styles.colorName}>{color.name}</span>
                <span className={styles.hexCode}>{color.hex}</span>
                {color.desc && <span className="text-[9px] opacity-40">{color.desc}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4 opacity-50">Node-Vibrant (Full Palette)</h3>
        <div className={styles.grid}>
          {vibrantEntries.map((color, idx) => (
            <div key={`${color.name}-${idx}`} className={styles.colorItem}>
              <div 
                className={styles.swatch} 
                style={{ backgroundColor: color.hex }} 
              />
              <span className={styles.colorName}>{color.name}</span>
              <span className={styles.hexCode}>{color.hex}</span>
            </div>
          ))}
        </div>
      </div>

      {fullPalette?.palette && fullPalette.palette.length > 0 && (
        <div className={styles.paletteContainer}>
          <span className={styles.colorName}>Palette populations</span>
          <div className={styles.paletteGrid}>
            {fullPalette.palette.map((hex, idx) => (
              <div 
                key={idx} 
                className={styles.paletteItem} 
                style={{ backgroundColor: hex }} 
                data-hex={hex}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPaletteDisplay;
