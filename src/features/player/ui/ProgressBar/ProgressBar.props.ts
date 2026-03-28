import React from 'react';

export interface ProgressBarProps {
  duration: number;
  seek: number;
  isDragging: boolean;
  onSeek: (seek: number) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
}
