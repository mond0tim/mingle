'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from '../shaders';
import type { GradientColors } from '../types';

interface ShaderBackgroundProps {
  analyzer: { getEnergy: (band: string) => number } | null;
  gradientColors: GradientColors;
  bpm: number | null;
  bpmSpeedMultiplier?: number;
  baseSpeed?: number;
  lerpFactor?: number;
  smoothColorTransitions?: boolean;
  colorBrightness?: number;
}

export const ShaderBackground: React.FC<ShaderBackgroundProps> = ({
  analyzer,
  gradientColors,
  bpm,
  bpmSpeedMultiplier = 1.0,
  baseSpeed = 1.0,
  lerpFactor = 0.15,
  smoothColorTransitions = true,
  colorBrightness = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const targetColorsRef = useRef<GradientColors>(gradientColors);
  const paramsRef = useRef({
    bpm,
    baseSpeed,
    bpmSpeedMultiplier,
    lerpFactor,
    analyzer,
    smoothColorTransitions,
    colorBrightness
  });

  useEffect(() => {
    paramsRef.current = {
      bpm,
      baseSpeed,
      bpmSpeedMultiplier,
      lerpFactor,
      analyzer,
      smoothColorTransitions,
      colorBrightness
    };
  }, [bpm, baseSpeed, bpmSpeedMultiplier, lerpFactor, analyzer, smoothColorTransitions, colorBrightness]);

  useEffect(() => {
    targetColorsRef.current = gradientColors;
    if (!smoothColorTransitions && materialRef.current) {
      materialRef.current.uniforms.u_color1.value.set(gradientColors.start);
      materialRef.current.uniforms.u_color2.value.set(gradientColors.mid);
      materialRef.current.uniforms.u_color3.value.set(gradientColors.end);
    }
  }, [gradientColors, smoothColorTransitions]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uViewportRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        u_bass: { value: 0 },
        u_mid: { value: 0 },
        u_treble: { value: 0 },
        u_brightness: { value: colorBrightness },
        u_color1: { value: new THREE.Color(gradientColors.start) },
        u_color2: { value: new THREE.Color(gradientColors.mid) },
        u_color3: { value: new THREE.Color(gradientColors.end) },
      },
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uViewportRes.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    let requestRef: number;
    let time = 0;
    let lastFrameTime = performance.now();

    const tempColor = new THREE.Color();

    const render = (now: number) => {
      const deltaTime = (now - lastFrameTime) / 1000;
      lastFrameTime = now;

      const {
        bpm: currentBpmVal,
        baseSpeed: bs,
        bpmSpeedMultiplier: mult,
        lerpFactor: lf,
        analyzer: az,
        smoothColorTransitions: smooth,
        colorBrightness: brightness
      } = paramsRef.current;

      const currentBpm = currentBpmVal || 120;
      const dynamicSpeed = bs * (currentBpm / 120) * mult;

      time += deltaTime * dynamicSpeed;
      material.uniforms.uTime.value = time;
      material.uniforms.u_brightness.value = brightness;

      if (smooth) {
        const colorLerpSpeed = 0.05; // Slightly slower than audio signals for stability
        material.uniforms.u_color1.value.lerp(tempColor.set(targetColorsRef.current.start), colorLerpSpeed);
        material.uniforms.u_color2.value.lerp(tempColor.set(targetColorsRef.current.mid), colorLerpSpeed);
        material.uniforms.u_color3.value.lerp(tempColor.set(targetColorsRef.current.end), colorLerpSpeed);
      }

      if (az) {
        const bass = az.getEnergy('bass');
        const mid = az.getEnergy('mid');
        const treble = az.getEnergy('treble');

        const currentBass = material.uniforms.u_bass.value;
        const currentMid = material.uniforms.u_mid.value;
        const currentTreble = material.uniforms.u_treble.value;

        material.uniforms.u_bass.value = currentBass + (bass - currentBass) * lf;
        material.uniforms.u_mid.value = currentMid + (mid - currentMid) * lf;
        material.uniforms.u_treble.value = currentTreble + (treble - currentTreble) * lf;
      }

      renderer.render(scene, camera);
      requestRef = requestAnimationFrame(render);
    };

    requestRef = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};
