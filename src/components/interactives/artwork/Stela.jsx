import { useRef } from 'react';
import Sketch from 'react-p5';

export default function Component() {
  const canvasRef = useRef(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
  };

  let time = 0; // Variable de tiempo para el movimiento

  const draw = (p5) => {
    p5.background(0, 20); // Fondo negro con un pequeño nivel de opacidad para la estela

    // Dibujar las líneas curvas con movimiento suave
    p5.noFill();
    p5.stroke(255, 255, 255, 50); // Líneas blancas con baja opacidad
    p5.strokeWeight(2);

    for (let i = 0; i < 20; i++) {
      p5.beginShape();
      for (let x = 0; x < p5.width; x += 10) {
        // Movimiento suave usando una función de seno y la variable de tiempo
        let y = p5.height / 2 + p5.sin(x * 0.01 + time + i * 0.5) * (p5.height / 4) - (i * 10);
        p5.curveVertex(x, y);
      }
      p5.endShape();
    }

    time += 0.01; // Incrementar el tiempo para movimiento progresivo
  };

  return <div ref={canvasRef}><Sketch setup={setup} draw={draw} /></div>;
}
