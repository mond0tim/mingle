"use client"
import React from 'react';
import cn from 'classnames';
import styles from './PlaybackButtons.module.css';

export interface PlayButtonProps {
    isPlaying: boolean;
    onClick: (e: React.MouseEvent) => void;
    className?: string;
    variant?: 'default' | 'mini' | 'solo' | 'solo-mini';
    style?: React.CSSProperties;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ isPlaying, onClick, className, variant = 'default', style }) => {
    // 1. ПАУЗА (||)
    const pauseD1 = "M7.5 6 L7.5 18 L7.5 18 Z";
    const pauseD2 = "M16.5 6 L16.5 18 L16.5 18 Z";

    // 2. PLAY (треугольник) - в моке рисуется вверх, потом поворачивается на 90 градусов
    const playD1 = "M12 6 L12 18 L5.5 18 Z";
    const playD2 = "M12 6 L18.5 18 L12 18 Z";

    return (

        <button
            className={cn(
                styles.btn, styles.btnPlay,
                !isPlaying && styles.paused, // Adding .paused when NOT playing matches mock logic
                variant === 'mini' && styles.mini,
                variant === 'solo' && styles.solo,
                variant === 'solo-mini' && styles.soloMini,
                className
            )}
            style={style}
            tabIndex={0}
            onClick={onClick}
            aria-label={isPlaying ? "Pause" : "Play"}
        >
            <span className={styles.btnIcon}>
                <svg viewBox="0 0 24 24">
                    <path
                        className={styles.iconPath}
                        d={isPlaying ? pauseD1 : playD1}
                    />
                    <path
                        className={styles.iconPath}
                        d={isPlaying ? pauseD2 : playD2}
                    />
                </svg>
            </span>
        </button>
    );
};

{/* 
<button 
            className={cn(
                styles.mediaButton, 
                !isPlaying && styles.paused, // Adding .paused when NOT playing matches mock logic
                variant === 'mini' && styles.mini, 
                className
            )} 
            onClick={onClick}
            aria-label={isPlaying ? "Pause" : "Play"}
        >
            <svg viewBox="0 0 24 24">
                <path 
                    className={styles.iconPath} 
                    d={isPlaying ? pauseD1 : playD1} 
                />
                <path 
                    className={styles.iconPath} 
                    d={isPlaying ? pauseD2 : playD2} 
                />
            </svg>
        </button> */}