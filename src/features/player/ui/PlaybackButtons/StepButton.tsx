"use client"
import React from 'react';
import cn from 'classnames';
import styles from './PlaybackButtons.module.css';

export interface StepButtonProps {
    type: 'prev' | 'next';
    onClick: (e: React.MouseEvent) => void;
    className?: string;
}

export const StepButton: React.FC<StepButtonProps> = ({ type, onClick, className }) => {
    return (
        <button 
            className={cn(styles.stepButton, className)} 
            onClick={onClick}
            aria-label={type === 'prev' ? "Previous Track" : "Next Track"}
        >
            {type === 'prev' ? (
                <svg viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
            ) : (
                <svg viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6zm9-12v12h2V6z" />
                </svg>
            )}
        </button>
    );
};
