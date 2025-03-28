import { useState, useEffect } from "react"
import Sketch from "react-p5"

export default function VioletBlueBackgroundSketch() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const gridSpacing = 40  

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef)
    p5.frameRate(30)
  }

  const getBackgroundColor = () => {
    return [7, 37, 74] 
  }

  const getGridColor = () => {
    return [102, 50, 17] 
  }

  const draw = (p5) => {
    const bgColor = getBackgroundColor(p5)
    p5.background(bgColor)
    drawGridEffect(p5)
  }

  const drawGridEffect = (p5) => {
    const mouseInfluenceRadius = 150

    // Color para las líneas de la cuadrícula
    const gridColor = getGridColor()

    p5.stroke(gridColor[0], gridColor[1], gridColor[2], 100) 
    p5.drawingContext.setLineDash([]) 

    for (let x = 0; x <= p5.width; x += gridSpacing) {
      for (let y = 0; y <= p5.height; y += gridSpacing) {
        p5.line(x - 2, 0, x - 2, p5.height) 
        p5.line(x + 2, 0, x + 2, p5.height) 

        p5.line(0, y - 2, p5.width, y - 2) 
        p5.line(0, y + 2, p5.width, y + 2)

        const dx = p5.mouseX - x
        const dy = p5.mouseY - y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseInfluenceRadius) {
          const influence = 1 - distance / mouseInfluenceRadius
          const offsetX = dx * influence * 0
          const offsetY = dy * influence * 0

          p5.line(x - 2 + offsetX, 0 + offsetY, x - 2 + offsetX, p5.height + offsetY) 
          p5.line(x + 2 + offsetX, 0 + offsetY, x + 2 + offsetX, p5.height + offsetY) 

          p5.line(0 + offsetX, y - 2 + offsetY, p5.width + offsetX, y - 2 + offsetY)
          p5.line(0 + offsetX, y + 2 + offsetY, p5.width + offsetX, y + 2 + offsetY) 
        }
      }
    }
  }

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
  }

  return (
    <div className="home-container">
      {isLoaded && <Sketch setup={setup} draw={draw} windowResized={windowResized} />}
    </div>
  )
}
