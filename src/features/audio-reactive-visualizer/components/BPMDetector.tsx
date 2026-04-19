'use client';

import React, { useEffect, useRef } from 'react';

interface BPMDetectorProps {
  audioCtx?: AudioContext;
  sourceNode?: AudioNode;
  onBpmChange: (bpm: number | null) => void;
  onBeat?: () => void;
  onStatusChange: (status: string) => void;
}

export const BPMDetector: React.FC<BPMDetectorProps> = ({
  audioCtx,
  sourceNode,
  onBpmChange,
  onBeat,
  onStatusChange,
}) => {
  const audioBufferRef = useRef<Float32Array | null>(null);
  const lastEnergyRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const workletUrlRef = useRef<string | null>(null);

  const onBeatRef = useRef(onBeat);
  const onBpmChangeRef = useRef(onBpmChange);
  const onStatusChangeRef = useRef(onStatusChange);

  useEffect(() => {
    onBeatRef.current = onBeat;
    onBpmChangeRef.current = onBpmChange;
    onStatusChangeRef.current = onStatusChange;
  }, [onBeat, onBpmChange, onStatusChange]);

  useEffect(() => {
    if (!audioCtx || !sourceNode) return;

    const ANALYZE_WINDOW_SEC = 10;
    const SAMPLE_RATE = audioCtx.sampleRate;
    const BUFFER_SIZE = SAMPLE_RATE * ANALYZE_WINDOW_SEC;
    audioBufferRef.current = new Float32Array(BUFFER_SIZE);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 150;

    const analyzer = audioCtx.createAnalyser();
    analyzer.fftSize = 1024;
    const dataArray = new Uint8Array(analyzer.frequencyBinCount);

    sourceNode.connect(filter);
    filter.connect(analyzer);

    const detectEnergyBeat = () => {
      analyzer.getByteFrequencyData(dataArray);
      let currentEnergy = 0;
      for (let i = 0; i < 10; i++) currentEnergy += dataArray[i];
      currentEnergy /= 10;

      const threshold = 1.3;
      if (currentEnergy > lastEnergyRef.current * threshold && currentEnergy > 50) {
        onBeatRef.current?.();
      }
      lastEnergyRef.current = currentEnergy;
      animationFrameRef.current = requestAnimationFrame(detectEnergyBeat);
    };

    let bpmInterval: ReturnType<typeof setInterval> | undefined;

    const setupWorkletAndAnalysis = async () => {
      try {
        const workletCode = `
          class BufferProcessor extends AudioWorkletProcessor {
            process(inputs) {
              const input = inputs[0];
              if (input && input[0]) {
                this.port.postMessage(input[0]);
              }
              return true;
            }
          }
          registerProcessor('buffer-processor', BufferProcessor);
        `;
        const blob = new Blob([workletCode], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        workletUrlRef.current = url;
        await audioCtx.audioWorklet.addModule(url);

        const workletNode = new AudioWorkletNode(audioCtx, 'buffer-processor');
        workletNodeRef.current = workletNode;

        workletNode.port.onmessage = (e: MessageEvent<Float32Array>) => {
          const buf = audioBufferRef.current;
          if (!buf) return;
          const input = e.data;
          buf.set(buf.subarray(input.length));
          buf.set(input, BUFFER_SIZE - input.length);
        };

        sourceNode.connect(workletNode);

        const { analyze } = await import('web-audio-beat-detector');
        bpmInterval = setInterval(async () => {
          if (!audioBufferRef.current || audioCtx.state === 'suspended') return;
          const tempBuffer = audioCtx.createBuffer(1, BUFFER_SIZE, SAMPLE_RATE);
          tempBuffer.getChannelData(0).set(audioBufferRef.current);
          try {
            onStatusChangeRef.current?.('Анализ...');
            const bpm = await analyze(tempBuffer);
            onBpmChangeRef.current?.(Math.round(bpm));
            onStatusChangeRef.current?.('Онлайн');
          } catch {
            onBpmChangeRef.current?.(null);
            onStatusChangeRef.current?.('Ритм не найден');
          }
        }, 5000);
      } catch (err) {
        console.error('Worklet error:', err);
      }
    };

    detectEnergyBeat();
    void setupWorkletAndAnalysis();

    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      if (bpmInterval) clearInterval(bpmInterval);
      if (workletNodeRef.current) {
        workletNodeRef.current.disconnect();
        workletNodeRef.current = null;
      }
      if (workletUrlRef.current) {
        URL.revokeObjectURL(workletUrlRef.current);
        workletUrlRef.current = null;
      }
      filter.disconnect();
      analyzer.disconnect();
    };
  }, [audioCtx, sourceNode]);

  return null;
};
