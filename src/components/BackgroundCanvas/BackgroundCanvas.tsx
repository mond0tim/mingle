"use client"

import { useEffect, useRef } from "react"
import style from "./BackgroundCanvas.module.css"

interface BackgroundCanvasProps {
  colorPalette?: [number, number, number][];
  audioData?: Float32Array | null;
  dominantColor?: [number, number, number];
}

export default function BackgroundCanvas({ colorPalette, audioData, dominantColor }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const $ = canvas.getContext("2d")
    if (!$) return

    const wh = 128
    const w2h = wh * wh
    canvas.width = canvas.height = wh

    // Create image data
    const img = $.createImageData(wh, wh)
    const id = img.data

    // Initialize variables
    let t = 0
    const inc = 1 / wh
    const arr: number[] = []

    // Initialize random array
    for (let k = 0; k < w2h; ++k) {
      arr[k] = Math.random() * 1.5 - 0.5
    }

    // Helper functions
    function hue(value: number): number {
      return 255 * Math.min(Math.max(value, 0), 1)
    }

    function ease(x: number): number {
      return x > 0.2 ? 0 : i(1, 0, x * 6)
    }

    function i(start: number, end: number, t: number): number {
      t = t * t * t * (6 * t * t - 15 * t + 10)
      return start + (end - start) * t
    }

    function n(x: number, y: number): number {
      const i = Math.abs(Math.floor(x * wh + y)) % w2h
      return arr[i]
    }

    function oct(x: number, y: number): number {
      const o1 = p(x * 3.0, y * 4.0)
      const o2 = p(x * 4.0, y * 5.0)
      return o1 + o2 * 0.5
    }

    function p(x: number, y: number): number {
      const nx = Math.floor(x)
      const ny = Math.floor(y)
      return i(i(n(nx, ny), n(nx + 1, ny), x - nx), i(n(nx, ny + 1), n(nx + 1, ny + 1), x - nx), y - ny)
    }

    // Main drawing function
    function draw() {
      t += inc
      for (let x = 1; x >= 0; x -= inc) {
        for (let y = 1; y >= 0; y -= inc) {
          const idx = Math.floor((y * wh + x) * wh * 4)
          const dx = x
          const dy = y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const ax = oct(x, y)
          const ay = oct(x + 2, y + t / 3)
          const bx = oct(x + dist * 0.3 + ax / 22 + 0.7, y + ay / 5 + 2)
          const by = oct(x + ax / 3 + 4 * t, y + ay / 3 + 5)
          const n = oct(x + bx / 5, y + by / 2) * 0.7 + 0.15
          const d = (ax * by) / 2
          const e = (ay * bx) / 2

          // Modified color assignment for a more purple palette, minimizing red
          id[idx + 0] = hue(n * 0.2) // Significantly reduce red component
          id[idx + 1] = hue((n / 8 + e / 10 + d) * 0.4) // Some green for blending
          id[idx + 2] = hue(d + e + 0.7) // Enhance blue component
          id[idx + 3] = hue(1 - ease(dist) * (e + d) * 5) // Alpha unchanged
        }
      }
      if ($) {
        $.putImageData(img, 0, 0)
      }
      animationFrameId = window.requestAnimationFrame(draw)
    }

    // Start the animation
    let animationFrameId = window.requestAnimationFrame(draw)

    // Clean up on unmount
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className={style.container}>
      <div className={style.noise_canvas}></div>
      <canvas ref={canvasRef} className={style.background_canvas} />
    </div>
  )
}