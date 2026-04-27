'use client';
import React, { useEffect, useRef } from 'react';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { usePlayerStore } from '@/features/player/store/playerStore';
import { Howler } from 'howler';

// Синглтоны (защита от ререндеров и Strict Mode)
let sharedAnalyzer: AudioMotionAnalyzer | null = null;
let connectedAudioElement: HTMLMediaElement | null = null;

const AudioMotionVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentTrack = usePlayerStore(state => state.currentTrack);
  const howlerInstance = usePlayerStore(state => state.howlerInstance);

  useEffect(() => {
    if (!containerRef.current) return;

    // Инициализация Canvas (один раз на все приложение)
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
        audioCtx: Howler.ctx
      });
    } else {
      containerRef.current.appendChild(sharedAnalyzer.canvas);
    }

    // Игнорируем playerKey, так как мы больше не делаем жестких перезагрузок аудио
  }, []);

  useEffect(() => {
    // Подключение к тегу аудио
    const connectToHowler = () => {
      if (!sharedAnalyzer) return;

      const howler = howlerInstance;
      const node = (howler as any)?._sounds?.[0]?._node;

      if (node && node instanceof HTMLMediaElement) {
        // ЕСЛИ ЭТО ТОТ ЖЕ САМЫЙ ТЕГ, К КОТОРОМУ МЫ УЖЕ ПОДКЛЮЧЕНЫ - ВЫХОДИМ!
        // Это полностью устраняет фатальную ошибку InvalidStateError.
        if (connectedAudioElement === node) {
          return;
        }

        // Выставляем CORS перед подключением
        if (node.crossOrigin !== 'anonymous') {
          node.crossOrigin = 'anonymous';
        }

        try {
          // Отключаем старый элемент, подключаем новый
          sharedAnalyzer.disconnectInput();
          sharedAnalyzer.connectInput(node);

          // Сохраняем ссылку на элемент в синглтон
          connectedAudioElement = node;
          console.log('✅ Визуализатор успешно и безопасно подключен!');
        } catch (err) {
          // Игнорируем ошибку InvalidStateError. Она возникает в React Strict Mode при HMR
          // или если тег уже подключен, но ссылка на него потерялась.
          connectedAudioElement = node;
        }
      }
    };

    // Проверяем каждую полсекунды, появился ли новый HTML-тег после переключения трека
    const interval = setInterval(connectToHowler, 500);
    return () => clearInterval(interval);
  }, [currentTrack, howlerInstance]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none w-full pt-5 md:scale-150 blur-xl"
      id="container"
      style={{ filter: 'hue-rotate(241deg) blur(24px) brightness(130%)' }}
    />
  );
};

export default AudioMotionVisualizer;