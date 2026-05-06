'use client'

import p5 from 'p5'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface SketchProps {
  className?: string
}

export const Sketch = ({ className }: SketchProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let intervalId: ReturnType<typeof setInterval>

    const sketch = (p: p5) => {
      interface Square {
        x: number
        y: number
        width: number
        height: number
        color?: string
      }

      let squares: Square[] = []
      let canvasW: number
      let canvasH: number

      // Base color from the provided palette
      const baseOffWhite = '#F5F5F5'

      // Core palette plus close variations
      const colors = [
        '#DFF1F1', '#CDEBEB', '#E8F6F6', // Light cyans
        '#BBD5DA', '#A5C4C9', '#D1E6EA', // Pale grayish-blues
        '#FF0000', '#CC0000', '#FF3333'  // Reds
      ]

      p.setup = () => {
        const parent = containerRef.current!
        canvasW = parent.clientWidth
        canvasH = parent.clientHeight
        p.createCanvas(canvasW, canvasH)
        generateMondrian()

        // Automatically change the geometry every 1 second
        intervalId = setInterval(() => {
          squares = []
          generateMondrian()
          p.redraw()
        }, 1000)
      }

      p.draw = () => {
        drawMondrian()
        p.noLoop()
      }

      const generateMondrian = () => {
        const stepX = canvasW / 7
        const stepY = canvasH / 7

        // Start with one big rectangle
        squares = [{
          x: 0,
          y: 0,
          width: canvasW,
          height: canvasH
        }]

        // Split squares on grid lines
        for (let i = stepY; i < canvasH; i += stepY) {
          splitSquaresWith({ y: i })
        }
        for (let i = stepX; i < canvasW; i += stepX) {
          splitSquaresWith({ x: i })
        }

        // Add some random color to squares
        const numColored = p.floor(p.random(3, 8))
        for (let i = 0; i < numColored; i++) {
          const randomSquare = squares[p.floor(p.random(squares.length))]
          randomSquare.color = colors[p.floor(p.random(colors.length))]
        }
      }

      const splitSquaresWith = (coordinates: { x?: number; y?: number }) => {
        const { x, y } = coordinates

        for (let i = squares.length - 1; i >= 0; i--) {
          const square = squares[i]

          if (x && x > square.x && x < square.x + square.width) {
            if (p.random() > 0.5) {
              squares.splice(i, 1)
              splitOnX(square, x)
            }
          }

          if (y && y > square.y && y < square.y + square.height) {
            if (p.random() > 0.5) {
              squares.splice(i, 1)
              splitOnY(square, y)
            }
          }
        }
      }

      const splitOnX = (square: Square, splitAt: number) => {
        const squareA: Square = {
          x: square.x,
          y: square.y,
          width: square.width - (square.width - splitAt + square.x),
          height: square.height
        }

        const squareB: Square = {
          x: splitAt,
          y: square.y,
          width: square.width - splitAt + square.x,
          height: square.height
        }

        squares.push(squareA)
        squares.push(squareB)
      }

      const splitOnY = (square: Square, splitAt: number) => {
        const squareA: Square = {
          x: square.x,
          y: square.y,
          width: square.width,
          height: square.height - (square.height - splitAt + square.y)
        }

        const squareB: Square = {
          x: square.x,
          y: splitAt,
          width: square.width,
          height: square.height - splitAt + square.y
        }

        squares.push(squareA)
        squares.push(squareB)
      }

      const drawMondrian = () => {
        p.background(baseOffWhite)
        p.strokeWeight(6)
        p.stroke(0)

        for (let i = 0; i < squares.length; i++) {
          const square = squares[i]

          if (square.color) {
            p.fill(square.color)
          } else {
            p.fill(baseOffWhite)
          }

          p.rect(square.x, square.y, square.width, square.height)
        }
      }

      p.windowResized = () => {
        const parent = containerRef.current
        if (!parent) return
        canvasW = parent.clientWidth
        canvasH = parent.clientHeight
        p.resizeCanvas(canvasW, canvasH)
        squares = []
        generateMondrian()
        p.redraw()
      }
    }

    const p5Instance = new p5(sketch, containerRef.current)

    return () => {
      if (intervalId) clearInterval(intervalId)
      p5Instance.remove()
    }
  }, [])

  return <div ref={containerRef} className={cn("flex items-center justify-center w-full h-full", className)}></div>
}
