// @ts-nocheck
/* eslint-disable */
'use client';
import React, { useEffect, useRef } from 'react';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { Track } from '@/types';
import ReactHowler from 'react-howler';
import { Howler } from 'howler';

interface AudioMotionVisualizerProps {
  currentTrack: Track | null;
  howlerRef: React.RefObject<ReactHowler>;
}

// СИНГЛТОН: Анализатор живет вне компонентов, чтобы не ломать аудио-граф при ререндерах
let sharedAnalyzer: AudioMotionAnalyzer | null = null;

const AudioMotionVisualizer: React.FC<AudioMotionVisualizerProps> = ({
  currentTrack,
  howlerRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Инициализируем анализатор один раз за всю жизнь приложения
    if (!sharedAnalyzer) {
      sharedAnalyzer = new AudioMotionAnalyzer(containerRef.current, {
        alphaBars: false,
        ansiBands: false,
        barSpace: 0.1,
        bgAlpha: 0,
        channelLayout: 'dual-combined',
        colorMode: 'gradient',
        fadePeaks: false,
        fftSize: 8192,
        fillAlpha: 1,
        frequencyScale: 'mel',
        gradient: 'orangered',
        gravity: 20,
        ledBars: false,
        linearAmplitude: false,
        linearBoost: 1,
        lineWidth: 4,
        loRes: false,
        lumiBars: false,
        maxDecibels: -25,
        maxFPS: 0,
        maxFreq: 8000,
        minDecibels: -85,
        minFreq: 10,
        mirror: 0,
        mode: 10,
        noteLabels: false,
        outlineBars: false,
        overlay: true,
        peakFadeTime: 750,
        peakHoldTime: 100,
        peakLine: true,
        radial: true,
        radialInvert: false,
        radius: 0.02,
        reflexAlpha: 0.3,
        reflexBright: 1.3,
        reflexFit: true,
        reflexRatio: 0,
        roundBars: false,
        showBgColor: true,
        showFPS: false,
        showPeaks: true,
        showScaleX: false,
        showScaleY: false,
        smoothing: 0.7,
        spinSpeed: 2,
        splitGradient: false,
        trueLeds: false,
        weightingFilter: '',
        height: 400,
        // Используем глобальный контекст Howler
        audioCtx: Howler.ctx
      });
    } else {
      // Если компонент перерисовался, просто переносим холст в новый контейнер
      containerRef.current.appendChild(sharedAnalyzer.canvas);
    }
  }, []);

  useEffect(() => {
    if (!sharedAnalyzer || !currentTrack) return;

    // Функция для безопасного подключения
    const connectToHowler = () => {
      const sound = howlerRef.current?.howler._sounds[0];
      if (!sound || !sound._node) return;

      const audioEl = sound._node; // В режиме html5=true это <audio>

      if (audioEl instanceof HTMLMediaElement) {
        // КРИТИЧНО ДЛЯ ВИЗУАЛИЗАЦИИ: CORS
        if (audioEl.crossOrigin !== 'anonymous') {
          audioEl.crossOrigin = 'anonymous';
        }

        try {
          // Проверяем, не подключен ли этот элемент уже (чтобы не было ошибки)
          if (audioEl.__connectedToMotion) return;

          sharedAnalyzer.connectInput(audioEl);
          audioEl.__connectedToMotion = true;
          console.log('✅ Визуализатор подключен к HTML5 потоку');
        } catch (err) {
          console.warn('Ошибка подключения AudioMotion:', err);
        }
      }
    };

    // Howler может создавать ноду с задержкой, даем ему время
    const timer = setTimeout(connectToHowler, 500);
    return () => clearTimeout(timer);
  }, [currentTrack, howlerRef]);

  return (
    <div
      className="pointer-events-none w-full pt-5 md:scale-150 blur-xl"
      ref={containerRef}
      style={{ filter: 'hue-rotate(241deg) blur(24px) brightness(130%)' }}
    />
  );
};

export default AudioMotionVisualizer;