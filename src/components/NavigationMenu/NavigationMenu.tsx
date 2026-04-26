"use client";
import { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  LibraryIcon,
  HeartIcon,
  UserIcon,
  Music1Icon,
  Music2Icon,
} from '@/shared/ui/icons';
import LogoRotator from './LogoRotator';
import { useLogoRotation } from './useLogoRotation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/animate-ui/components/animate/tooltip';
import { useSession } from '@/lib/auth-client';
import { AuthDialog } from '@/components/Auth/AuthDialog';

interface NavItemData {
  id: string;
  path: string;
  icon: React.FC<{ className?: string }>;
  label: string;
  exact: boolean;
  mobileClassName?: string;
}

const MOBILE_ITEMS: NavItemData[] = [
  // { id: 'playlists', path: '/playlists', icon: LogoIcon, label: 'Плейлисты', exact: false },
  // { id: 'about', path: '/about', icon: AboutIcon, label: 'О проекте', exact: true },
  { id: 'vibe', path: '/', icon: Music1Icon, label: 'Вайб', exact: true, mobileClassName: styles.mobileCustomVibe },
  { id: 'search', path: '/search', icon: SearchIcon, label: 'Поиск', exact: true, mobileClassName: styles.mobileCustomVibe },
  { id: 'favorites', path: '/library', icon: HeartIcon, label: 'Любимое', exact: true, mobileClassName: styles.mobileCustomVibe },
  { id: 'profile', path: '/profile', icon: UserIcon, label: 'Профиль', exact: true, mobileClassName: styles.mobileCustomVibe },
];

const DESKTOP_MAIN_ITEMS: NavItemData[] = [


  { id: 'vibe', path: '/', icon: Music1Icon, label: 'Вайб', exact: true },
  { id: 'search', path: '/search', icon: SearchIcon, label: 'Поиск', exact: true },
  { id: 'favorites', path: '/library', icon: HeartIcon, label: 'Любимое', exact: true },
  // { id: 'about', path: '/about', icon: AboutIcon, label: 'О проекте', exact: true },
  // { id: 'playlists', path: '/playlists', icon: Music1Icon, label: 'Плейлисты', exact: false },
  // { id: 'library', path: '/library', icon: LibraryIcon, label: 'Медиатека', exact: true },

];

const DESKTOP_BOTTOM_ITEMS: NavItemData[] = [

  { id: 'profile', path: '/profile', icon: UserIcon, label: 'Профиль', exact: true },
];

const ALL_ITEMS = [...MOBILE_ITEMS, ...DESKTOP_MAIN_ITEMS, ...DESKTOP_BOTTOM_ITEMS];

const springConfig: Transition = { type: "spring", stiffness: 400, damping: 30 };
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function NavigationMenuComponent() {
  const [hasMounted, setHasMounted] = useState(false);
  const { data: session } = useSession();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const isMobile = useMediaQuery({ query: '(max-width: 639px)' });

  const containerRef = useRef<HTMLDivElement>(null);
  const mainGroupRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Убрали все упоминания border-radius отсюда! Только чистые координаты.
  const [activeRect, setActiveRect] = useState({ top: 0, left: 0, width: 0, height: 0, opacity: 0 });
  const [hoverRect, setHoverRect] = useState({ top: 0, left: 0, width: 0, height: 0, opacity: 0 });

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  useEffect(() => setHasMounted(true), []);
  useEffect(() => setPendingPath(null), [pathname]);

  const logoRotation = useLogoRotation();

  const updateMeasurements = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    setContainerSize({ width: container.offsetWidth, height: container.offsetHeight });

    // 1. Координаты активной плашки
    const activeItem = ALL_ITEMS.find(i => i.exact ? pathname === i.path : pathname.startsWith(i.path));
    if (activeItem && itemRefs.current[activeItem.id]) {
      const el = itemRefs.current[activeItem.id]!;
      if (el.offsetWidth > 0) {
        setActiveRect({ top: el.offsetTop, left: el.offsetLeft, width: el.offsetWidth, height: el.offsetHeight, opacity: 1 });
      }
    } else {
      setActiveRect(prev => ({ ...prev, opacity: 0 }));
    }

    // 2. Координаты ховер-пузырька
    if (isMobile) {
      setHoverRect(prev => ({ ...prev, opacity: 0 }));
      return;
    }

    const isMainItemHovered = hoveredId && DESKTOP_MAIN_ITEMS.some(i => i.id === hoveredId);
    if (isMainItemHovered && itemRefs.current[hoveredId]) {
      const el = itemRefs.current[hoveredId]!;
      setHoverRect({ top: el.offsetTop, left: el.offsetLeft, width: el.offsetWidth, height: el.offsetHeight, opacity: 1 });
    } else if (mainGroupRef.current) {
      const group = mainGroupRef.current;
      setHoverRect({ top: group.offsetTop, left: group.offsetLeft, width: group.offsetWidth, height: group.offsetHeight, opacity: 1 });
    }
  }, [pathname, hoveredId, isMobile]);

  useIsomorphicLayoutEffect(() => {
    updateMeasurements();
    const t = setTimeout(updateMeasurements, 100);
    const observer = new ResizeObserver(() => updateMeasurements());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [updateMeasurements]);

  if (!hasMounted) return null;

  // Clip-path с жестко зашитым round 9999px. Никакой динамики скруглений!
  const rightInset = Math.max(0, containerSize.width - (activeRect.left + activeRect.width));
  const bottomInset = Math.max(0, containerSize.height - (activeRect.top + activeRect.height));

  const clipPathValue = activeRect.opacity === 0
    ? `inset(50% round 9999px)`
    : `inset(${activeRect.top}px ${rightInset}px ${bottomInset}px ${activeRect.left}px round 9999px)`;

  const renderItem = (item: NavItemData, isOverlay: boolean, isMobileView: boolean = false) => {
    const isBottomItem = !isMobileView && DESKTOP_BOTTOM_ITEMS.some(i => i.id === item.id);
    const isLoading = pendingPath === item.path;

    const innerContent = (
      <div className={cn(styles.navButton, { [styles.bottomItemHover]: !isOverlay && isBottomItem })}>
        <item.icon className={cn(
          isOverlay ? styles.svgDark : styles.svg,
          { [styles.iconLoading]: isLoading }
        )} />
      </div>
    );

    const aTag = (
      <Link
        href={isOverlay ? '#' : item.path}
        className={styles.linkWrap}
        style={{ pointerEvents: isOverlay ? 'none' : 'auto' }}
        tabIndex={isOverlay ? -1 : 0}
        aria-hidden={isOverlay}
        onClick={(e) => {
          if (item.id === 'profile' && !session) {
            e.preventDefault();
            setIsAuthDialogOpen(true);
            return;
          }
          if (!isOverlay && pathname !== item.path) setPendingPath(item.path);
        }}
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
        {isOverlay || isMobile ? aTag : (
          <Tooltip side="right" sideOffset={20} >
            <TooltipTrigger asChild>{aTag}</TooltipTrigger>
            <TooltipContent showArrow={false} className="bg-white text-black font-[600]">{item.label}</TooltipContent>
          </Tooltip>
        )}
      </div>
    );
  };

  const renderLayout = (isOverlay: boolean) => (
    <div className={styles.layerContent} aria-hidden={isOverlay}>
      <div className={styles.noiseOverlay} />
      {!isMobile && (
        <div className={styles.logoWrapper} style={{ opacity: isOverlay ? 0 : 1 }}>
          {!isOverlay ? (
            <Tooltip side="right" sideOffset={20}>
              <TooltipTrigger asChild>
                <div
                  className={styles.linkWrap}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredId('logo')}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => { 
                    if (pathname !== '/') {
                      setPendingPath('/');
                      router.push('/');
                    }
                  }}
                >
                  <div className={styles.navButton}>
                    <LogoRotator 
                      className={styles.logoSvg} 
                      logoClassName={cn(styles.logoSvg, { [styles.iconLoading]: pendingPath === '/' })}
                      rotation={logoRotation.rotation}
                      isDragging={logoRotation.isDragging}
                      onStartDrag={logoRotation.handleStart}
                    />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent showArrow={false} className="bg-white text-black">
                <LogoText style={{ height: '16px', width: 'auto' }} />
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className={styles.linkWrap}>
              <div className={styles.navButton}>
                <LogoRotator 
                  className={styles.logoSvg} 
                  rotation={logoRotation.rotation}
                  isDragging={logoRotation.isDragging}
                  onStartDrag={logoRotation.handleStart}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {isMobile ? (
        <div className={styles.mobileNavLinks}>
          {MOBILE_ITEMS.map((item) => renderItem(item, isOverlay, true))}
        </div>
      ) : (
        <>
          <div className={styles.mainGroup} ref={!isOverlay ? mainGroupRef : undefined} onMouseLeave={!isOverlay ? () => setHoveredId(null) : undefined}>
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
          <LogoRotator 
            className={styles.logoSvg}
            rotation={logoRotation.rotation}
            isDragging={logoRotation.isDragging}
            onStartDrag={logoRotation.handleStart}
          />
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
      <AuthDialog isOpen={isAuthDialogOpen} onClose={() => setIsAuthDialogOpen(false)} />
    </TooltipProvider>
  );
}