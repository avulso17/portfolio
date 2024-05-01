'use client'

import { useEffect } from 'react'

export default function FallingSand() {
  let grid: number[][]
  let w = 10
  let cols, rows

  function make2DArray(cols: number, rows: number) {
    const arr = new Array(cols)

    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows)
    }

    return arr
  }

  function setup() {
    cols = Math.floor(400 / w)
    rows = Math.floor(400 / w)
    grid = make2DArray(cols, rows)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0
      }
    }
  }

  function draw() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  useEffect(() => {
    draw()
  }, [])

  return (
    <canvas id='canvas' className='bg-red' height={400} width={400}></canvas>
  )
}
