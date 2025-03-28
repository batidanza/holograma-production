"use client"

import { useState, useEffect } from "react"
import Sketch from "react-p5"

export default function BrownBackgroundSketch() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  let gridPoints = []

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef)
    p5.frameRate(30)
    initGridPoints(p5)
  }

const initGridPoints = (p5) => {
  gridPoints = []
  const spacing = 40 // antes era 80, ahora es la mitad (doble de puntos)

  // Aquí ajustamos para que el último punto cubra todo el ancho y alto
  for (let x = 0; x <= p5.width; x += spacing) {
    for (let y = 0; y <= p5.height; y += spacing) {
      gridPoints.push({
        x: x,
        y: y,
        baseX: x,
        baseY: y,
        size: p5.random(1, 3),
      })
    }
  }
}


  const getBackgroundColor = () => {
    return [45, 30, 20]
  }

  const draw = (p5) => {
    const bgColor = getBackgroundColor(p5)
    p5.background(bgColor)
    drawGridEffect(p5)
  }

  const drawGridEffect = (p5) => {
    const mouseInfluenceRadius = 150

    gridPoints.forEach((point, i) => {
      const dx = p5.mouseX - point.baseX
      const dy = p5.mouseY - point.baseY
      const distance = Math.sqrt(dx * dx + dy * dy)


      p5.noStroke()
      p5.fill(245, 245, 245, 100)
      p5.ellipse(point.x, point.y, point.size)

      // Más conexiones porque hay más puntos cerca
      for (let j = i + 1; j < gridPoints.length; j++) {
        const other = gridPoints[j]
        const d = p5.dist(point.x, point.y, other.x, other.y)

        if (d < 100) {
          p5.stroke(245, 245, 245, 30 * (1 - d / 100))
          p5.line(point.x, point.y, other.x, other.y)
        }
      }
    })

    // Ajustar la cuadrícula de líneas
    p5.stroke(245, 245, 245, 20)
    p5.drawingContext.setLineDash([2, 8])

    const gridSpacing = 20 // antes era 40, lo reducimos a la mitad para que quede acorde
    for (let x = 0; x < p5.width; x += gridSpacing) {
      p5.line(x, 0, x, p5.height)
    }
    for (let y = 0; y < p5.height; y += gridSpacing) {
      p5.line(0, y, p5.width, y)
    }
  }

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
    initGridPoints(p5)
  }

  return (
    <div className="home-container">
      {isLoaded && <Sketch setup={setup} draw={draw} windowResized={windowResized} />}
    </div>
  )
}
