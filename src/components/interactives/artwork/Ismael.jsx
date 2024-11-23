import { useRef } from 'react';
import Sketch from 'react-p5';

export default function Component() {
  const canvasRef = useRef(null);
  const duration = 7000; // Duration of a cycle in milliseconds (7 seconds)
  let alpha = 0;
  let explosionTriggered = false;
  let explosionProgress = 0;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textFont("poppins");
    p5.textSize(35);
  };

  const draw = (p5) => {
    const elapsedTime = p5.millis();
    const progress = p5.constrain(elapsedTime / duration, 0, 1); // Progress from 0 to 1

    // Background with semi-transparent gradient
    for (let y = 0; y < p5.height; y++) {
      const inter = p5.map(y, 0, p5.height, 0, 1);
      const c = p5.lerpColor(p5.color(203, 108, 230), p5.color(230, 230, 250), inter);
      p5.stroke(c);
      p5.line(0, y, p5.width, y);
    }
    p5.fill(0, 0, 0, 30);
    p5.rect(0, 0, p5.width, p5.height);

    p5.noFill();
    p5.stroke(255, 255, 255, 100);
    p5.strokeWeight(0.5);

    // Center point
    const centerX = p5.width / 2;
    const centerY = p5.height / 2;

    // Function to draw lines toward the center
    const drawLineToCenter = (startX, startY, i) => {
      p5.beginShape();
      for (let pos = 0; pos <= 1; pos += 0.05) {
        const interX = p5.lerp(startX, centerX, pos * progress);
        const interY = p5.lerp(startY, centerY, pos * progress);

        // Add wave effect
        const offset = p5.sin(pos * 10 + p5.millis() / 1000 + i) * 50 * (1 - progress);
        p5.curveVertex(interX + offset, interY + offset);
      }
      p5.endShape();
    };

    const numLines = 5; // Number of lines per edge
    const edges = [
      { x: p5.width / 2, y: p5.height }, // Bottom
      { x: p5.width / 2, y: 0 },         // Top
      { x: 0, y: p5.height / 2 },        // Left
      { x: p5.width, y: p5.height / 2 }, // Right
      { x: 0, y: 0 },                     // Top-left corner
      { x: p5.width, y: 0 },              // Top-right corner
      { x: 0, y: p5.height },              // Bottom-left corner
      { x: p5.width, y: p5.height }       // Bottom-right corner
    ];

    // Draw lines from all edges and corners toward the center
    for (let edge of edges) {
      for (let i = 0; i < numLines; i++) {
        drawLineToCenter(edge.x, edge.y, i);
      }
    }

    // Trigger explosion after lines touch at the center
    if (progress >= 1 && !explosionTriggered) {
      explosionTriggered = true;
    }

    // Explosion effect
    if (explosionTriggered) {
      explosionProgress += 0.02; // Control explosion speed
      if (explosionProgress > 1) explosionProgress = 1;

      const explosionRadius = 200; // Maximum radius of explosion
      const angleStep = p5.TWO_PI / 30; // Number of lines in explosion

      for (let angle = 0; angle < p5.TWO_PI; angle += angleStep) {
        const endX = centerX + p5.cos(angle) * explosionRadius * explosionProgress;
        const endY = centerY + p5.sin(angle) * explosionRadius * explosionProgress;

        p5.stroke(255, 255, 255, 150);
        p5.line(centerX, centerY, endX, endY);
      }
    }

    // Calculate text transparency based on time
    if (elapsedTime > 1000 && elapsedTime < 4000) {
      if (elapsedTime < 2000) {
        alpha = p5.map(elapsedTime, 1000, 2000, 0, 255);
      } else if (elapsedTime < 3000) {
        alpha = 255;
      } else {
        alpha = p5.map(elapsedTime, 3000, 4000, 255, 0);
      }

      p5.fill(255, 255, 255, alpha);
      p5.text("Increase Your Connections", centerX, centerY);
    }
  };

  return <div ref={canvasRef}><Sketch setup={setup} draw={draw} /></div>;
}
