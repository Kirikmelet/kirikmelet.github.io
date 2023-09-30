"use client"

import { ReactElement, useEffect, useRef, useState } from 'react'

export default function UseCanvas(): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let canvasHeight =
    useEffect(() => {
      const canvas = canvasRef.current
      const parentDiv = canvas?.parentElement
      if (!canvas) {
        console.error("CANVAS FAILED TO INITIALIZE (canvas.tsx)")
        return;
      }
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        console.error("CANVAS CONTEXT FAILED TO GET (canvas.tsx)")
        return;
      }
      resizeCanvas()
      window.addEventListener("resize", resizeCanvas, false)
      function resizeCanvas(_event: UIEvent | void): void {
        if (ctx && canvas) {
          canvas.width = parentDiv?.clientWidth!;
          canvas.height = parentDiv?.clientHeight!;
          _drawCanvas(canvas, ctx);
        }
      }
    }, [])
  return <canvas ref={canvasRef} className='border-2 block'></canvas>
}

function _drawCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "green"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function printHelloWorld(ctx: CanvasRenderingContext2D) {
  ctx.font = "12px monospace"
  ctx.fillText("Hello World!", 10, 10)
}