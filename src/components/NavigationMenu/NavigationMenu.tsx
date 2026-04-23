"use client";
import { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, Transition } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import cn from 'classnames';

import styles from './NavigationMenu.module.css';
import {
  LogoIcon,
  LogoText,
  PlaylistIcon,
  AboutIcon,
  VibeIcon,
  SearchIcon,
  QueueIcon
} from '@/shared/ui/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/animate-ui/components/animate/tooltip';

const HeartIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
  </svg>
);

const ProfileIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
  </svg>
);

interface NavItemData {
  id: string;
  path: string;
  icon: React.FC<{ className?: string }>;
  label: string;
  exact: boolean;
  mobileClassName?: string;
}

const MOBILE_ITEMS: NavItemData[] = [
  { id: 'playlists', path: '/playlists', icon: PlaylistIcon, label: 'Плейлисты', exact: false },
  { id: 'about', path: '/about', icon: AboutIcon, label: 'О проекте', exact: true },
  { id: 'vibe', path: '/', icon: VibeIcon, label: 'Вайб', exact: true, mobileClassName: styles.mobileCustomVibe },
  { id: 'search', path: '/search', icon: SearchIcon, label: 'Поиск', exact: true, mobileClassName: styles.mobileCustomSearch },
];

const DESKTOP_MAIN_ITEMS: NavItemData[] = [
  { id: 'search', path: '/search', icon: SearchIcon, label: 'Поиск', exact: true },
  { id: 'vibe', path: '/', icon: VibeIcon, label: 'Вайб', exact: true },
  { id: 'playlists', path: '/playlists', icon: PlaylistIcon, label: 'Плейлисты', exact: false },
  { id: 'library', path: '/library', icon: QueueIcon, label: 'Медиатека', exact: true },
  { id: 'about', path: '/about', icon: AboutIcon, label: 'О проекте', exact: true },
];

const DESKTOP_BOTTOM_ITEMS: NavItemData[] = [
  { id: 'favorites', path: '/favorites', icon: HeartIcon, label: 'Любимое', exact: true },
  { id: 'profile', path: '/profile', icon: ProfileIcon, label: 'Профиль', exact: true },
];

const ALL_ITEMS = [...MOBILE_ITEMS, ...DESKTOP_MAIN_ITEMS, ...DESKTOP_BOTTOM_ITEMS];

const springConfig: Transition = { type: "spring", stiffness: 400, damping: 30 };
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function NavigationMenuComponent() {
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isMobile = useMediaQuery({ query: '(max-width: 639px)' });

  const containerRef = useRef<HTMLDivElement>(null);
  const mainGroupRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [activeRect, setActiveRect] = useState({ top: 0, left: 0, width: 0, height: 0, opacity: 0, borderRadius: "9999px" });
  const [hoverRect, setHoverRect] = useState({ top: 0, left: 0, width: 0, height: 0, opacity: 0, borderRadius: "36px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => setHasMounted(true), []);

  const updateMeasurements = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    setContainerSize({ width: container.offsetWidth, height: container.offsetHeight });

    // 1. Позиция Активной плашки (Градиент)
    const activeItem = ALL_ITEMS.find(i => i.exact ? pathname === i.path : pathname.startsWith(i.path));
    if (activeItem && itemRefs.current[activeItem.id]) {
      const el = itemRefs.current[activeItem.id]!;
      const style = window.getComputedStyle(el);

      if (el.offsetWidth > 0) {
        setActiveRect({
          top: el.offsetTop, left: el.offsetLeft, width: el.offsetWidth, height: el.offsetHeight,
          borderRadius: style.borderRadius || "9999px",
          opacity: 1
        });
      }
    } else {
      setActiveRect(prev => ({ ...prev, opacity: 0 }));
    }

    // 2. Hover Пузырек (Только Desktop)
    if (isMobile) {
      setHoverRect(prev => ({ ...prev, opacity: 0 }));
      return;
    }

    const isMainItemHovered = hoveredId && DESKTOP_MAIN_ITEMS.some(i => i.id === hoveredId);
    if (isMainItemHovered && itemRefs.current[hoveredId]) {
      const el = itemRefs.current[hoveredId]!;
      const style = window.getComputedStyle(el);
      setHoverRect({
        top: el.offsetTop, left: el.offsetLeft, width: el.offsetWidth, height: el.offsetHeight,
        borderRadius: style.borderRadius || "9999px", opacity: 1
      });
    } else if (mainGroupRef.current) {
      // Если убрали курсор, пузырек обволакивает только ГРУППУ
      const group = mainGroupRef.current;
      const style = window.getComputedStyle(group);
      setHoverRect({
        top: group.offsetTop, left: group.offsetLeft, width: group.offsetWidth, height: group.offsetHeight,
        borderRadius: style.borderRadius || "36px", opacity: 1
      });
    }
  }, [pathname, hoveredId, isMobile]);

  useIsomorphicLayoutEffect(() => {
    updateMeasurements();
    const t = setTimeout(updateMeasurements, 150);
    const observer = new ResizeObserver(() => updateMeasurements());
    if (containerRef.current) observer.observe(containerRef.current);

    return () => { clearTimeout(t); observer.disconnect(); };
  }, [updateMeasurements]);

  if (!hasMounted) return null;

  const rightInset = Math.max(0, containerSize.width - (activeRect.left + activeRect.width));
  const bottomInset = Math.max(0, containerSize.height - (activeRect.top + activeRect.height));

  const clipPathValue = activeRect.opacity === 0
    ? `inset(50% round 9999px)`
    : `inset(${activeRect.top}px ${rightInset}px ${bottomInset}px ${activeRect.left}px round ${activeRect.borderRadius})`;

  const renderItem = (item: NavItemData, isOverlay: boolean, isMobileView: boolean = false) => {
    const isBottomItem = !isMobileView && DESKTOP_BOTTOM_ITEMS.some(i => i.id === item.id);

    const innerContent = (
      <div className={cn(styles.navButton, { [styles.bottomItemHover]: !isOverlay && isBottomItem })}>
        <item.icon className={isOverlay ? styles.svgDark : styles.svg} />
      </div>
    );

    const aTag = (
      <Link
        href={isOverlay ? '#' : item.path}
        className={styles.linkWrap}
        style={{ pointerEvents: isOverlay ? 'none' : 'auto' }}
        tabIndex={isOverlay ? -1 : 0}
        aria-hidden={isOverlay}
      >
        {innerContent}
      </Link>
    );

    return (
      <div
        key={item.id}
        className={cn(styles.iconWrapper, isMobileView && item.mobileClassName)}
        ref={!isOverlay ? (el) => { itemRefs.current[item.id] = el; } : undefined}
        onMouseEnter={!isOverlay && !isMobile ? () => setHoveredId(item.id) : undefined}
      >
        {/* Если мы в оверлее (черный слой) ИЛИ на мобилке -> рендерим ссылку напрямую без тултипа */}
        {isOverlay || isMobile ? (
          aTag
        ) : (
          <Tooltip side="right" sideOffset={20}>
            <TooltipTrigger asChild>{aTag}</TooltipTrigger>
            <TooltipContent showArrow={false}>{item.label}</TooltipContent>
          </Tooltip>
        )}
      </div>
    );
  };

  const renderLayout = (isOverlay: boolean) => (
    <div className={styles.layerContent} aria-hidden={isOverlay}>
      {!isMobile && (
        <div className={styles.logoWrapper} style={{ opacity: isOverlay ? 0 : 1 }}>
          {!isOverlay ? (
            <Tooltip side="right" sideOffset={20}>
              <TooltipTrigger asChild>
                <Link href="/" className={styles.linkWrap} onMouseEnter={() => setHoveredId('logo')}>
                  <div className={styles.navButton}><LogoIcon className={styles.logoSvg} /></div>
                </Link>
              </TooltipTrigger>
              <TooltipContent showArrow={false}>
                <LogoText style={{ height: '16px', width: 'auto' }} />
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className={styles.linkWrap}><div className={styles.navButton}><LogoIcon className={styles.logoSvg} /></div></div>
          )}
        </div>
      )}

      {isMobile ? (
        <div className={styles.mobileNavLinks}>
          {MOBILE_ITEMS.map((item) => renderItem(item, isOverlay, true))}
        </div>
      ) : (
        <>
          <div
            className={styles.mainGroup}
            ref={!isOverlay ? mainGroupRef : undefined}
            onMouseLeave={!isOverlay ? () => setHoveredId(null) : undefined}
          >
            {DESKTOP_MAIN_ITEMS.map((item) => renderItem(item, isOverlay))}
          </div>
          <div className={styles.bottomItems}>
            {DESKTOP_BOTTOM_ITEMS.map((item) => renderItem(item, isOverlay))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <TooltipProvider openDelay={400} closeDelay={200}>
      {isMobile && isHomePage && (
        <div className={styles.mobileLogo}>
          <LogoIcon className={styles.logoSvg} />
          <LogoText style={{ height: '24px', width: 'auto' }} />
        </div>
      )}

      <div className={cn(styles.mingle_controls_container, { [styles.homePageMenu]: isHomePage })}>
        <div className={styles.mingle_controls} ref={containerRef}>

          {!isMobile && (
            <motion.div
              className={styles.hoverBackground}
              initial={false}
              animate={hoverRect}
              transition={springConfig}
            />
          )}

          <motion.div
            className={styles.activeBackground}
            initial={false}
            animate={activeRect}
            transition={springConfig}
          />

          {renderLayout(false)}

          <motion.div
            className={styles.clipPathContainer}
            initial={false}
            animate={{ clipPath: clipPathValue }}
            transition={springConfig}
          >
            {renderLayout(true)}
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
}