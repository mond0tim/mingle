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
    size?: 'lg' | 'md' | 'sm';
}

export const PlaybackButtons: React.FC<PlaybackButtonsProps> = ({
    isPlaying,
    onPlayPause,
    onPrev,
    onNext,
    className,
    variant = 'default',
    size = 'md'
}) => {
    return (
        <>
            <div className={cn(styles.wrapper, variant === 'mini' && styles.mini, className)}>

                <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, }}>
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"></feGaussianBlur>
                            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15" result="goo"></feColorMatrix>
                            <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
                        </filter>
                    </defs>
                </svg>

                <div className={cn(styles.buttonContent, styles[size])}>
                    <div className={styles.buttonContentInner}>

                        <div className={styles.container}>


                            {variant !== 'mini' && <StepButton type="prev" onClick={onPrev} />}
                            <PlayButton isPlaying={isPlaying} onClick={onPlayPause} variant={variant} />
                            {variant !== 'mini' && <StepButton type="next" onClick={onNext} />}

                        </div>

                    </div>
                </div>


            </div>

        </>
    );
};

export default PlaybackButtons;
