'use client';

import { useAudioReactiveSnapshot } from '../store/audioReactiveStore';

/**
 * Подписывается на глобальное состояние анализа (BPM / бас / середина / верх).
 * Рендерится только при активной сессии визуализатора (`sessionDepth > 0`).
 * Можно вставить в layout или на любую страницу без прокидывания пропсов.
 */
export function AudioReactiveLiveCaption({ className }: { className?: string }) {
  const { sessionDepth, bpm, bpmStatus, bass, mid, treble } = useAudioReactiveSnapshot();

  if (sessionDepth === 0) return null;

  return (
    <p className={className} suppressHydrationWarning>
      BPM: {bpm ?? '—'} · {bpmStatus} · низ: {bass.toFixed(2)} · сер: {mid.toFixed(2)} · верх:{' '}
      {treble.toFixed(2)}
    </p>
  );
}
