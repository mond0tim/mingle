"use client"
import React from 'react';
import cn from 'classnames';
import styles from './PlaybackButtons.module.css';

import { PlayButton } from './PlayButton';
import { StepButton } from './StepButton';

// Re-exporting for convenience and backward compatibility
export { PlayButton } from './PlayButton';
export { StepButton } from './StepButton';

export interface PlaybackButtonsProps {
    isPlaying: boolean;
    onPlayPause: (e: React.MouseEvent) => void;
    onPrev: (e: React.MouseEvent) => void;
    onNext: (e: React.MouseEvent) => void;
    className?: string;
    variant?: 'default' | 'mini';
}

export const PlaybackButtons: React.FC<PlaybackButtonsProps> = ({
    isPlaying,
    onPlayPause,
    onPrev,
    onNext,
    className,
    variant = 'default'
}) => {
    return (
        <div className={cn(styles.playbackButtons, variant === 'mini' && styles.mini, className)}>
            {variant !== 'mini' && <StepButton type="prev" onClick={onPrev} />}
            <PlayButton isPlaying={isPlaying} onClick={onPlayPause} variant={variant} />
            {variant !== 'mini' && <StepButton type="next" onClick={onNext} />}
        </div>
    );
};

export default PlaybackButtons;
