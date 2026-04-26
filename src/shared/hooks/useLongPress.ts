import { useCallback, useRef } from 'react';

export const useLongPress = (
  onLongPress: (e: any) => void,
  onClick?: (e: any) => void,
  { delay = 400, shouldPreventDefault = true } = {}
) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const target = useRef<any>(null);
  const startPos = useRef<{ x: number, y: number } | null>(null);

  const start = useCallback(
    (event: any) => {
      // Store starting position for movement detection
      const x = event.pageX || event.touches?.[0]?.pageX;
      const y = event.pageY || event.touches?.[0]?.pageY;
      startPos.current = { x, y };

      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
        timeout.current = null;
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event: any, shouldTriggerClick = true) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        if (shouldTriggerClick && onClick) {
          // Additional check: was there significant movement?
          onClick(event);
        }
      }
      timeout.current = null;
      startPos.current = null;
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault);
      }
    },
    [onClick, shouldPreventDefault]
  );

  const handleMove = useCallback((event: any) => {
    if (!startPos.current || !timeout.current) return;
    
    const x = event.pageX || event.touches?.[0]?.pageX;
    const y = event.pageY || event.touches?.[0]?.pageY;
    
    const dx = Math.abs(x - startPos.current.x);
    const dy = Math.abs(y - startPos.current.y);
    
    // If moved more than 10px, cancel the long press
    if (dx > 10 || dy > 10) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  }, []);

  const preventDefault = useCallback((e: any) => {
    if (!e.cancelable) return;
    e.preventDefault();
  }, []);

  return {
    onPointerDown: (e: any) => start(e),
    onPointerUp: (e: any) => clear(e),
    onPointerMove: (e: any) => handleMove(e),
    onPointerLeave: (e: any) => clear(e, false),
    onTouchEnd: (e: any) => clear(e),
  };
};
