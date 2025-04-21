import Sketch from "react-p5";

// Importar las imágenes de flores

import flower5 from "../../../assets/caracol.png";
import pes1 from "../../../assets/caracol.png";
import pes2 from "../../../assets/caracol.png";
import pes3 from "../../../assets/caracol.png";
import { useRef } from "react";

export default function ChaoticParticles() {
  let flowers = [];
  let particles = [];
  let flowerImages = [];

  // Clase de flor
  class Flower {
    constructor(p5, x, y, image) {
      this.x = x;
      this.y = y;
      this.vx = p5.random(-2, 2); // Velocidad horizontal
      this.vy = p5.random(-2, 2); // Velocidad vertical
      this.alpha = 255; // Transparencia inicial
      this.image = image;
      this.size = p5.random(2, 8); // Tamaño aleatorio
    }

    update() {
      // Desplazamiento de la flor
      this.x += this.vx;
      this.y += this.vy;

      // Reducir la opacidad con el tiempo
      this.alpha -= 2;
    }

    show(p5) {
      p5.push();
      p5.translate(this.x, this.y);
      p5.tint(255, this.alpha); // Aplica la transparencia
      p5.image(this.image, 0, 0, this.size, this.size); // Dibuja la flor
      p5.pop();
    }
  }

  // Clase de partícula
  class Particle {
    constructor(p5) {
      this.reset(p5);
    }

    reset(p5) {
      this.x = p5.random(p5.width);
      this.y = p5.random(p5.height);
      this.vx = p5.random(-12, 12);
      this.vy = p5.random(-12, 12);
      this.alpha = p5.random(50, 150);
      this.size = p5.random(0.5, 2);
      this.color = p5.color(
        p5.random(150, 255),
        p5.random(200, 255),
        p5.random(230, 255),
        this.alpha * 0.6
      );
      this.fadeSpeed = p5.random(0.3, 1);
      this.noiseOffset = p5.random(1000);
    }

    update(p5) {
      let time = p5.frameCount * 0.01;
      let centerX = p5.width / 2;
      let centerY = p5.height / 2;
      
      // Multiple attraction points for better coverage
      let points = [
        { x: centerX + p5.width * 0.4 * Math.cos(time), y: centerY + p5.height * 0.4 * Math.sin(time) },
        { x: centerX + p5.width * 0.4 * Math.cos(time + 2), y: centerY + p5.height * 0.4 * Math.sin(time * 1.5) },
        { x: centerX + p5.width * 0.3 * Math.sin(time * 1.2), y: centerY + p5.height * 0.3 * Math.cos(time * 0.8) }
      ];
      
      // Find closest attraction point
      let closestPoint = points.reduce((closest, point) => {
        let d = p5.dist(this.x, this.y, point.x, point.y);
        return d < closest.dist ? { point, dist: d } : closest;
      }, { point: points[0], dist: Infinity }).point;
      
      let dx = closestPoint.x - this.x;
      let dy = closestPoint.y - this.y;
      let distance = p5.dist(this.x, this.y, closestPoint.x, closestPoint.y);
      
      let force = p5.map(distance, 0, p5.width / 2, 0.15, 0.35);
      
      // Enhanced boundary control
      if (this.x < p5.width * 0.02) this.vx += 0.8;
      if (this.x > p5.width * 0.98) this.vx -= 0.8;
      if (this.y < p5.height * 0.02) this.vy += 0.8;
      if (this.y > p5.height * 0.98) this.vy -= 0.8;
      
      // Add some noise for organic movement
      let noiseForce = p5.noise(this.x * 0.005, this.y * 0.005, time) * 0.5;
      
      this.vx += (force * dx / distance) + (Math.cos(time * 2) * noiseForce);
      this.vy += (force * dy / distance) + (Math.sin(time * 2) * noiseForce);
      
      this.x += this.vx;
      this.y += this.vy;
      
      this.vx *= 0.96;
      this.vy *= 0.96;
      
      this.alpha -= this.fadeSpeed * 0.4;
    }

    show(p5) {
      p5.noStroke();
      let glowSize = this.size * 1;
      
      p5.fill(this.color[0], this.color[1], this.color[2], this.alpha * 0.1);
      p5.ellipse(this.x, this.y, glowSize * p5.noise(this.x * 0.01));
      
      p5.fill(this.color[0], this.color[1], this.color[2], this.alpha * 0.1);
      p5.ellipse(this.x, this.y, this.size * p5.noise(this.x * 0.01));
    }
  }

  const preload = (p5) => {
    // Preload las imágenes antes de comenzar el sketch
    flowerImages = [

      p5.loadImage(flower5),
      p5.loadImage(pes1),
      p5.loadImage(pes2),
      p5.loadImage(pes3),
    ];
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(10, 20, 40, 2);

    // Create more particles per frame for better coverage
    for(let i = 0; i < 35; i++) {
      particles.push(new Particle(p5));
    }

    // Increased maximum particles
    if (particles.length > 25200) {
      particles.splice(0, 35);
    }

    // Actualizar y mostrar las flores
    for (let i = flowers.length - 1; i >= 0; i--) {
      flowers[i].update();
      flowers[i].show(p5);

      // Eliminar flores cuando desaparecen (transparencia llega a 0)
      if (flowers[i].alpha <= 0) {
        flowers.splice(i, 1);
      }
    }

    // Actualizar y mostrar las partículas
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(p5);
      particles[i].show(p5);

      // Eliminar partículas cuando desaparecen (transparencia llega a 0)
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
      }
    }
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  return <Sketch preload={preload} setup={setup} draw={draw} windowResized={windowResized} />;
}
