"use client"

import { useState, useEffect } from "react"
import Sketch from "react-p5"
import "./HomeSketch.css"

export default function HomeSketch() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Text content for dynamic rendering
  const title = "HOLOGRAMA"
  const navItems = ["MAGAZINE", "INTERACTIVES", "CREATIVES"]

  const paragraphs = [
    "Holograma is a pioneering digital magazine that brings together a rich variety of artistic expressions. From sound compositions and experimental photography to poetry, digital artworks, and interactive visuals, we celebrate the limitless possibilities of creativity in the digital age.",
    "Our platform stands out for offering experimental and interactive design tools, enabling users to push the boundaries of their artistic visions. We focus on immersive storytelling and innovative formats that captivate audiences and redefine how art is experienced.",
    "Holograma also provides a space for creatives to thrive. Users can create personalized profiles to showcase their portfolios, uploading their work directly to the app. Beyond this, the platform encourages collaboration by allowing users to submit proposals—complete with images, descriptions, and contact details—to be considered for upcoming publications.",
    "At Holograma, we're a vibrant community where artists and visionaries connect, experiment, and bring their ideas to life. Welcome to Holograma, where art, technology, and imagination converge.",
  ]

  // Grid lines for background effect
  let gridPoints = []

  // Water ripples for interactive artwork
  const waterRipples = []
  let buildings = []

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef)
    p5.frameRate(30)

    // Initialize text particles
    initTextParticles(p5)

    // Initialize grid points
    initGridPoints(p5)

    // Initialize buildings for city skyline
  }

  // Text particles for dynamic text effects
  let textParticles = []
  let currentParagraph = 0
  let charIndex = 0
  let displayedText = []
  let lastCharTime = 0
  let navHovered = -1
  let allTextDisplayed = false

  const initTextParticles = (p5) => {
    textParticles = []

    // Create particles for title with Array font
    p5.textFont("IBM Plex Sans")
    const titleSize = 40
    p5.textSize(titleSize)
    const titleWidth = p5.textWidth(title)

    for (let i = 0; i < title.length; i++) {
      const char = title.charAt(i)
      const x = p5.width / 2 - titleWidth / 2 + p5.textWidth(title.substring(0, i))
      textParticles.push({
        char,
        targetX: x,
        targetY: 80,
        x: x + p5.random(-200, 200),
        y: p5.random(-100, 0),
        size: titleSize,
        vx: 0,
        vy: 0,
        type: "title",
        opacity: 0,
        delay: i * 100,
        font: "IBM Plex Sans",
      })
    }

    // Create particles for nav items with Array font
    const navSize = 20
    p5.textSize(navSize)

    let navX = p5.width / 2
    const navSpacing = 180

    navItems.forEach((item, itemIndex) => {
      const itemWidth = p5.textWidth(item)
      navX = p5.width / 2 + (itemIndex - 1) * navSpacing

      for (let i = 0; i < item.length; i++) {
        const char = item.charAt(i)
        const x = navX - itemWidth / 2 + p5.textWidth(item.substring(0, i))
        textParticles.push({
          char,
          targetX: x,
          targetY: 130,
          x: x,
          y: 130 - 50,
          size: navSize,
          vx: 0,
          vy: 0,
          type: "nav",
          navIndex: itemIndex,
          opacity: 0,
          delay: 500 + itemIndex * 200 + i * 50,
          font: "IBM Plex Sans",
        })
      }
    })

    // Initialize displayed text array
    displayedText = paragraphs.map(() => "")
  }

  const drawNavItems = (p5) => {
    const navSize = 20;
    p5.textSize(navSize);
    p5.textFont("IBM Plex Sans");
  
    let navX = p5.width / 2;
    const navSpacing = 180;
    
    // Ajustamos la posición vertical para que los elementos estén alineados sobre la línea de navegación
    const navY = 130; // Posición y de la línea de navegación
  
    // Dibujamos los elementos de la navegación
    navItems.forEach((item, itemIndex) => {
      const itemWidth = p5.textWidth(item);
      navX = p5.width / 2 + (itemIndex - 1) * navSpacing; // Ajustamos la separación entre los elementos
  
      const x = navX - itemWidth / 2; // Centrado horizontal
      const y = navY; // Posición vertical fija para que esté sobre la línea
  
      // Dibuja el texto de cada navItem
      p5.fill(245, 245, 245);
      p5.noStroke();
      p5.text(item, x, y);
    });
  };

  

  const initGridPoints = (p5) => {
    gridPoints = []
    const spacing = 80

    for (let x = 0; x < p5.width; x += spacing) {
      for (let y = 0; y < p5.height; y += spacing) {
        gridPoints.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          size: p5.random(1, 3),
          speed: p5.random(0.01, 0.03),
        })
      }
    }
  }
  // Get background color based on time
  const getBackgroundColor = (p5) => {
    // Base color: rgb(94, 79, 63)
    const time = p5.frameCount * 0.005

    // Subtle variations around the base color
    const r = 94 + Math.sin(time) * 10
    const g = 79 + Math.sin(time * 0.7) * 8
    const b = 63 + Math.sin(time * 1.3) * 6

    return [r, g, b]
  }

  // Add a water ripple at the given position
  const addRipple = (p5, x, y) => {
    waterRipples.push({
      x,
      y,
      radius: 5,
      maxRadius: 50 + p5.random(30),
      opacity: 255,
      speed: 1 + p5.random(1),
    })
  }

  const draw = (p5) => {
    // Get dynamic background color
    const bgColor = getBackgroundColor(p5)
    p5.background(bgColor)

    // Draw grid effect
    drawGridEffect(p5)

    // Draw header line
    p5.stroke(245, 245, 245)
    p5.strokeWeight(1.5)
    p5.drawingContext.setLineDash([5, 10])
    p5.line(50, 160, p5.width - 50, 160)


    // Draw text content box on the left side with margin
    const boxWidth = 900
    const boxHeight = 500
    const boxX = (p5.width - boxWidth) / 2
    const boxY = (p5.height - boxHeight) / 2

    drawNavItems(p5);


    p5.stroke(245, 245, 245)
    p5.strokeWeight(1.5)
    p5.drawingContext.setLineDash([5, 10])
    p5.noFill()
    p5.rect(boxX, boxY, boxWidth, boxHeight) // No border radius


    drawDynamicText(p5, boxX + 30, boxY + 30, boxWidth - 60, boxHeight - 60)

    checkNavHover(p5)


  }


  const drawGridEffect = (p5) => {
    // Draw connecting lines
    p5.stroke(245, 245, 245, 30)
    p5.strokeWeight(0.5)
    p5.drawingContext.setLineDash([])

    // Update grid points
    const mouseInfluenceRadius = 150

    gridPoints.forEach((point, i) => {
      // Calculate distance to mouse
      const dx = p5.mouseX - point.baseX
      const dy = p5.mouseY - point.baseY
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Apply mouse influence
      if (distance < mouseInfluenceRadius) {
        const influence = 1 - distance / mouseInfluenceRadius
        point.x = point.baseX + dx * influence * 0.2
        point.y = point.baseY + dy * influence * 0.2
      } else {
        // Return to base position
        point.x = point.baseX + Math.sin(p5.frameCount * point.speed) * 5
        point.y = point.baseY + Math.cos(p5.frameCount * point.speed) * 5
      }

      // Draw point
      p5.noStroke()
      p5.fill(245, 245, 245, 100)
      p5.ellipse(point.x, point.y, point.size)

      // Connect to nearby points
      for (let j = i + 1; j < gridPoints.length; j++) {
        const other = gridPoints[j]
        const d = p5.dist(point.x, point.y, other.x, other.y)

        if (d < 100) {
          p5.stroke(245, 245, 245, 30 * (1 - d / 100))
          p5.line(point.x, point.y, other.x, other.y)
        }
      }
    })

    // Draw dashed grid lines
    p5.stroke(245, 245, 245, 20)
    p5.drawingContext.setLineDash([2, 8])

    const gridSpacing = 40
    for (let x = 0; x < p5.width; x += gridSpacing) {
      p5.line(x, 0, x, p5.height)
    }

    for (let y = 0; y < p5.height; y += gridSpacing) {
      p5.line(0, y, p5.width, y)
    }
  }

  const drawDynamicText = (p5, x, y, maxWidth, maxHeight) => {
    const currentTime = p5.millis()

    // Add characters at a certain rate if not all text is displayed
    if (!allTextDisplayed && currentTime - lastCharTime > 30) {
      if (charIndex < paragraphs[currentParagraph].length) {
        displayedText[currentParagraph] += paragraphs[currentParagraph].charAt(charIndex)
        charIndex++
        lastCharTime = currentTime
      } else if (currentParagraph < paragraphs.length - 1) {
        // Move to next paragraph
        currentParagraph++
        charIndex = 0
        lastCharTime = currentTime
      } else {
        // All text has been displayed
        allTextDisplayed = true
      }
    }

    // Set IBM Plex Sans font for paragraph text
    p5.textFont("IBM Plex Sans, sans-serif")
    p5.fill(245, 245, 245)
    p5.noStroke()
    p5.textSize(16)
    p5.textLeading(24)

    let yPos = y

    // Draw each paragraph that has content
    for (let i = 0; i <= currentParagraph; i++) {
      if (displayedText[i].length === 0) continue

      // Word wrap for this paragraph
      const words = displayedText[i].split(" ")
      let line = ""

      for (let j = 0; j < words.length; j++) {
        const testLine = line + words[j] + " "
        const testWidth = p5.textWidth(testLine)

        if (testWidth > maxWidth) {
          // Check if we're about to exceed the box height
          if (yPos + 24 > y + maxHeight) {
            break // Stop rendering if we're going to overflow
          }

          // Draw glow
          p5.fill(245, 245, 245, 50)
          p5.text(line, x + 1, yPos + 1)

          // Draw text
          p5.fill(245, 245, 245)
          p5.text(line, x, yPos)

          line = words[j] + " "
          yPos += 24
        } else {
          line = testLine
        }
      }

      // Draw the last line of this paragraph
      if (line.length > 0) {
        p5.fill(245, 245, 245, 50)
        p5.text(line, x + 1, yPos + 1)
        p5.fill(245, 245, 245)
        p5.text(line, x, yPos)
        yPos += 36 // Extra space between paragraphs
      }
    }

    // Add a blinking cursor at the end if not all text is displayed
    if (!allTextDisplayed && p5.frameCount % 30 < 15) {
      const lastParagraph = displayedText[currentParagraph]
      const words = lastParagraph.split(" ")
      let line = ""
      let cursorX = x
      let cursorY = y

      // Calculate cursor position
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " "
        const testWidth = p5.textWidth(testLine)

        if (testWidth > maxWidth) {
          line = words[i] + " "
          cursorY += 24
          cursorX = x + p5.textWidth(line)
        } else {
          line = testLine
          cursorX = x + p5.textWidth(line)
        }
      }

      p5.text("_", cursorX, cursorY)
    }
  }

  const checkNavHover = (p5) => {
    // Set Array font for navigation
    p5.textFont("IBM Plex Sans")  
    const navSize = 20
    p5.textSize(navSize)

    let navX = p5.width / 2
    const navSpacing = 180

    navHovered = -1

    navItems.forEach((item, itemIndex) => {
      const itemWidth = p5.textWidth(item)
      navX = p5.width / 2 + (itemIndex - 1) * navSpacing

      // Check if mouse is over this nav item
      if (
        p5.mouseX > navX - itemWidth / 2 - 10 &&
        p5.mouseX < navX + itemWidth / 2 + 10 &&
        p5.mouseY > 130 - 15 &&
        p5.mouseY < 130 + 15
      ) {
        navHovered = itemIndex
        p5.cursor(p5.HAND)

        // Simplified hover effect - just a simple underline
        p5.stroke(245, 245, 245)
        p5.strokeWeight(1)
        p5.drawingContext.setLineDash([])
        p5.line(navX - itemWidth / 2, 140, navX + itemWidth / 2, 140)
      }
    })

    if (navHovered === -1) {
      p5.cursor(p5.ARROW)
    }
  }

  const mouseClicked = (p5) => {
    if (navHovered !== -1) {
      const destinations = ["/magazine", "/interactives-list", "/creatives"]
      window.location.href = destinations[navHovered]
    }
  }

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight)
    initTextParticles(p5)
    initGridPoints(p5)
  }

  return (
    <div className="home-container">
      {isLoaded && <Sketch setup={setup} draw={draw} windowResized={windowResized} mouseClicked={mouseClicked} />}
    </div>
  )
}

