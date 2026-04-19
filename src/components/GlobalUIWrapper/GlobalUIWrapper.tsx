'use client';

import { usePathname } from 'next/navigation';
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu';
import PlayerWrapper from '@/features/player/PlayerRoot';
import React from 'react';

import Preloader from '@/components/Preloader/Preloader';

export default function GlobalUIWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExcluded =
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/sign-in') ||
    pathname?.startsWith('/sign-up');

  if (isExcluded) {
    return <>{children}</>;
  }

  return (
    <>
      <NavigationMenu />
      <Preloader />
      <PlayerWrapper>{children}</PlayerWrapper>
    </>
  );
}
