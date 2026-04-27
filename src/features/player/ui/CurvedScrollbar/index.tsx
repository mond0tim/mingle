"use client";

import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import styles from './CurvedScrollbar.module.css';

interface CurvedScrollbarProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  borderRadius?: number;
  isCurved?: boolean;
  className?: string;
  watch?: any;
}

const OFFSET = 7;
const EXTRA_INSET = 2;
const MIN_START_RATIO = 0.8;
const MIN_THUMB = 20;
const SEGMENTS = 50;

export const CurvedScrollbar: React.FC<CurvedScrollbarProps> = ({
  containerRef,
  contentRef,
  borderRadius = 0,
  isCurved = true,
  className,
  watch
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const trackPathRef = useRef<SVGPathElement>(null);
  const thumbPathRef = useRef<SVGPathElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const pointerIdRef = useRef<number | null>(null);
  const stateRef = useRef({
    pathLength: 0,
    thumbLength: 50
  });

  const updateThumb = useCallback(() => {
    const content = contentRef.current;
    const trackPath = trackPathRef.current;
    const thumbPath = thumbPathRef.current;
    if (!content || !trackPath || !thumbPath) return;

    const { pathLength } = stateRef.current;
    
    const scrollHeight = content.scrollHeight || 1;
    const clientHeight = content.clientHeight || 1;
    const ratio = clientHeight / scrollHeight;
    const thumbLength = Math.max(MIN_THUMB, pathLength * (isNaN(ratio) ? 0.2 : ratio));
    
    const scrollableHeight = (scrollHeight - clientHeight) || 1;
    const scrollRatio = content.scrollTop / scrollableHeight;
    
    // We use stroke-dasharray and stroke-dashoffset to draw only a part of the track path
    // This is MUCH faster than getPointAtLength
    const offset = -pathLength * (1 - scrollRatio) * (1 - ratio); 
    // Actually, simple way: dasharray = [thumbLength, pathLength]
    // dashoffset = - (pathLength - thumbLength) * scrollRatio
    
    thumbPath.setAttribute('d', trackPath.getAttribute('d') || '');
    thumbPath.style.strokeDasharray = `${thumbLength} ${pathLength}`;
    thumbPath.style.strokeDashoffset = `${-(pathLength - thumbLength) * scrollRatio}`;
  }, [contentRef]);

  const updatePath = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const trackPath = trackPathRef.current;
    if (!container || !content || !trackPath) return;

    const w = container.clientWidth;
    const h = container.clientHeight;
    
    // Explicitly use prop-based radius or fallback
    const r = isCurved ? (borderRadius || parseFloat(getComputedStyle(container).borderRadius) || 0) : 0;

    const effectiveRadius = Math.max(r - OFFSET, 0);
    const trackX = w - OFFSET;
    const topY = OFFSET;
    const bottomY = h - OFFSET;
    const cornerX = trackX - effectiveRadius;

    // calculate x start point
    const minStartX = w * MIN_START_RATIO;
    let startX = trackX - effectiveRadius * EXTRA_INSET;
    if (startX < minStartX) startX = minStartX;
    if (startX > cornerX) startX = cornerX;

    // create the path - curves are only added if isCurved is true and r > OFFSET
    let d = "";
    if (!isCurved || effectiveRadius <= 0) {
      d = `M ${trackX} ${topY} L ${trackX} ${bottomY}`;
    } else {
      d = `
        M ${startX} ${topY}
        L ${cornerX} ${topY}                     
        A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${trackX} ${topY + effectiveRadius} 
        L ${trackX} ${bottomY - effectiveRadius} 
        A ${effectiveRadius} ${effectiveRadius} 0 0 1 ${cornerX} ${bottomY} 
        L ${startX} ${bottomY}
      `;
    }
        
    trackPath.setAttribute('d', d);

    // Give the browser a moment to refine the path if needed, but calculate immediately too
    stateRef.current.pathLength = trackPath.getTotalLength();
    if (stateRef.current.pathLength === 0) {
       stateRef.current.pathLength = h - (OFFSET * 2); 
    }
    
    updateThumb();
  }, [containerRef, contentRef, updateThumb, isCurved, borderRadius]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    updatePath();

    const handleScroll = () => {
      requestAnimationFrame(updateThumb);
    };

    const handleResize = () => {
      requestAnimationFrame(updatePath);
    };

    content.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(content);

    // Watch for internal content changes that might not trigger resize observer
    const timeout = setTimeout(updatePath, 500); 

    return () => {
      content.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      clearTimeout(timeout);
    };
  }, [contentRef, updatePath, updateThumb, watch]);

  const onPointerDown = (e: React.PointerEvent) => {
    const thumbPath = thumbPathRef.current;
    if (!thumbPath) return;
    
    e.preventDefault();
    setIsDragging(true);
    pointerIdRef.current = e.pointerId;
    thumbPath.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || e.pointerId !== pointerIdRef.current) return;
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const rect = container.getBoundingClientRect();
    let ratio = (e.clientY - rect.top) / rect.height;
    ratio = Math.max(0, Math.min(1, ratio));
    content.scrollTop = ratio * (content.scrollHeight - content.clientHeight);
    updateThumb();
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging || e.pointerId !== pointerIdRef.current) return;
    setIsDragging(false);
    try {
      thumbPathRef.current?.releasePointerCapture(e.pointerId);
    } catch (err) {}
    pointerIdRef.current = null;
  };

  return (
    <svg 
      ref={svgRef}
      className={`${styles.scrollbarSvg} ${className || ''}`}
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      data-vaul-no-drag="true"
    >
      <path ref={trackPathRef} className={styles.scrollbarTrack} />
      <path 
        ref={thumbPathRef} 
        className={styles.scrollbarThumb} 
        onPointerDown={onPointerDown}
      />
    </svg>
  );
};
