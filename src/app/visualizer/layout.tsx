import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Визуализация · mingle',
  description: 'Реактивная аудио-визуализация с BPM и спектральными полосами',
};

export default function VisualizerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
