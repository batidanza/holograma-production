import { useRef } from 'react';
import Sketch from 'react-p5';

export default function Component() {
  const canvasRef = useRef(null);
  const duration = 10000; // Duration of a cycle in milliseconds

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    // Calculate elapsed time and normalize it in a continuous cycle
    const elapsedTime = p5.millis() % duration; // Use modulo to restart the cycle
    const progress = p5.constrain(elapsedTime / duration, 0, 1); // Normalize progress between 0 and 1

    // Background with semi-transparent gradient for the trail
    for (let y = 0; y < p5.height; y++) {
      const inter = p5.map(y, 0, p5.height, 0, 1);
      const c = p5.lerpColor(p5.color(203, 108, 230), p5.color(230, 230, 250), inter); // From purple to lavender
      p5.stroke(c);
      p5.line(0, y, p5.width, y);
    }
    p5.fill(0, 0, 0, 30); // Semi-transparent black background to create the trail
    p5.rect(0, 0, p5.width, p5.height);

    // Draw curved lines with smooth, slow, and separated movement
    p5.noFill();
    p5.stroke(255, 255, 255, 100); // White lines with low opacity
    p5.strokeWeight(0.5);

    const numAlgae = 10; // Number of "algae"
    
    for (let i = 0; i < numAlgae; i++) {
      p5.beginShape();

      // Create the curve connecting both sides
      const midPoint = p5.width / 2;
      const step = 10; // Increment of X

      // Calculate the limit of X based on progress for both sides
      for (let x = 0; x <= p5.width; x += step) {
        // Create the y-coordinate for the left side
        let leftY = p5.height / 2 + p5.sin((x + progress * 1000) * 0.02 + i * 0.5) * (p5.height / 5) - (i * 15);
        // Create the y-coordinate for the right side
        let rightY = p5.height / 2 + p5.sin((p5.width - x + progress * 1000) * 0.02 + i * 0.5) * (p5.height / 5) - (i * 15);
        
        // Increase variability in the amplitude for more dynamic entanglement
        leftY += p5.sin(progress * 5 + i) * 20;
        rightY += p5.sin(progress * 5 + i) * 20;

        // Draw both vertices
        p5.curveVertex(x, leftY);
        p5.curveVertex(p5.width - x, rightY);
      }

      p5.endShape();
    }
  };

  return <div ref={canvasRef}><Sketch setup={setup} draw={draw} /></div>;
} 