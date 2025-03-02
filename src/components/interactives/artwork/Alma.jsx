import { useRef } from 'react';
import Sketch from 'react-p5';

export default function Component() {
  const canvasRef = useRef(null);
  const duration = 15000; // Duración del ciclo en milisegundos

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    p5.colorMode(p5.HSB, 360, 100, 100, 100); // Usar HSB para colores vibrantes
  };

  const draw = (p5) => {
    const elapsedTime = p5.millis() % duration;
    const progress = p5.constrain(elapsedTime / duration, 0, 1);

    // Fondo degradado dinámico con colores neón cambiantes
    for (let y = 0; y < p5.height; y++) {
      const inter = p5.map(y, 0, p5.height, 0, 1);
      let hue = (p5.map(inter + progress, 0, 1, 0, 360)) % 360;
      let c = p5.color(hue, 80, 80);
      p5.stroke(c);
      p5.line(0, y, p5.width, y);
    }

    // Capa semi-transparente para efecto de estela
    p5.fill(0, 0, 0, 20);
    p5.noStroke();
    p5.rect(0, 0, p5.width, p5.height);

    // Dibujar curvas psicodélicas que se deforman y ondulan
    p5.noFill();
    p5.strokeWeight(2);
    const numCurvas = 15;
    for (let i = 0; i < numCurvas; i++) {
      p5.beginShape();
      let offset = i * 0.9;
      let amplitude = p5.height * 17 + p5.sin(progress * p5.TWO_PI + offset) * 50;
      // Color de trazo que varía con el tiempo
      let hue = (progress * 1360 + i * 24) % 360;
      p5.stroke(hue, 90, 100, 80);
      for (let x = 0; x <= p5.width; x += 10) {
        // Aplicar ruido para distorsión extra
        let n = p5.noise(x * 0.005, progress * 5, i);
        let y = p5.height / 2 + p5.sin((x + progress * 100) * 0.02 + offset) * amplitude + p5.map(n, 0, 1, -50, 50);
        p5.curveVertex(x, y);
      }
      p5.endShape();
    }

    // Añadir círculos giratorios y espeluznantes para intensificar el efecto
    
  };

  return <div ref={canvasRef}><Sketch setup={setup} draw={draw} /></div>;
}
