'use client';

import { usePathname } from 'next/navigation';
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu';
import PlayerWrapper from '@/features/player/PlayerRoot';
import React from 'react';
import { PlayerLinkedVisualizer } from '@/features/audio-reactive-visualizer';

import Preloader from '@/components/Preloader/Preloader';

import styles from './GlobalUIWrapper.module.css';

export default function GlobalUIWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExcluded =
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/sign-in') ||
    pathname?.startsWith('/sign-up');

  if (isExcluded) {
    return <>{children}</>;
  }

  const isVisualizerPage = pathname === '/visualizer';

  return (
    <div className={styles.layout}>
      <PlayerLinkedVisualizer showUI={isVisualizerPage} />
      <NavigationMenu />
      <div className={styles.content}>
        <Preloader />
        <PlayerWrapper>{children}</PlayerWrapper>
      </div>
    </div>
  );
}
