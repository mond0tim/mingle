'use client';
import React, { useRef } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { LogoIcon } from '@/shared/ui/icons';
import cn from 'classnames';
import { useLogoRotation } from './useLogoRotation';

interface LogoRotatorProps {
  className?: string;
  logoClassName?: string;
  rotation?: MotionValue<number>;
  isDragging?: boolean;
  onStartDrag?: (clientX: number, clientY: number, element: HTMLElement) => void;
}

export default function LogoRotator({ 
  className, 
  logoClassName, 
  rotation: externalRotation,
  isDragging: externalIsDragging,
  onStartDrag
}: LogoRotatorProps) {
  const internal = useLogoRotation();
  const containerRef = useRef<HTMLDivElement>(null);

  const rotation = externalRotation || internal.rotation;
  const isDragging = externalIsDragging !== undefined ? externalIsDragging : internal.isDragging;
  const handleStart = onStartDrag || internal.handleStart;

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative select-none touch-none flex items-center justify-center", 
        className, 
        isDragging ? "cursor-grabbing" : "cursor-grab"
      )}
      onMouseDown={(e) => {
        e.preventDefault();
        handleStart(e.clientX, e.clientY, containerRef.current!);
      }}
      onTouchStart={(e) => {
        // e.preventDefault() is handled in useLogoRotation for touch to avoid scrolling
        handleStart(e.touches[0].clientX, e.touches[0].clientY, containerRef.current!);
      }}
    >
      <motion.div 
        style={{ rotate: rotation, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <LogoIcon className={logoClassName} />
      </motion.div>
    </div>
  );
}
