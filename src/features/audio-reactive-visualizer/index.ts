export { Visualizer } from './components/Visualizer';
export { PlayerLinkedVisualizer } from './components/PlayerLinkedVisualizer';
export { VisualizerControls } from './components/VisualizerControls';
export { AudioReactiveLiveCaption } from './components/AudioReactiveLiveCaption';
export type { GradientColors, AudioReactiveVisualizerPrefs } from './types';
export {
  useAudioReactiveStore,
  useAudioReactiveSnapshot,
} from './store/audioReactiveStore';
export type { AudioReactiveSnapshot } from './store/audioReactiveStore';
export {
  loadVisualizerPrefs,
  saveVisualizerPrefs,
  defaultVisualizerPrefs,
} from './lib/visualizerPrefsStorage';
export { trackToGradientColors } from './lib/trackGradient';
