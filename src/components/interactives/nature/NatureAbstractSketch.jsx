import Sketch from "react-p5";

// Importar las imágenes de flores

import flower5 from "../../../assets/caracol.png";
import pes1 from "../../../assets/pes-1.png";
import pes2 from "../../../assets/pes-2.png";
import pes3 from "../../../assets/ballena.png";
import { useRef } from "react";

export default function NatureAbstractSketch() {
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
      this.size = p5.random(60, 240); // Tamaño aleatorio
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
      this.vx = p5.random(-2, 2);
      this.vy = p5.random(-2, 2);
      this.alpha = p5.random(60, 200);
      this.size = p5.random(2, 10);
      this.color = p5.color(p5.random(40, 150), p5.random(100, 230), p5.random(40, 120), this.alpha);
    }

    update(p5) {
      let centerX = p5.width / 2;
      let centerY = p5.height / 2;
      let dx = centerX - this.x;
      let dy = centerY - this.y;
      let distance = p5.dist(this.x, this.y, centerX, centerY);
      let force = p5.map(distance, 0, p5.width / 2, 0.05, 0.2);

      this.vx += force * (dx / distance);
      this.vy += force * (dy / distance);
      this.vx *= 0.96;
      this.vy *= 0.96;

      this.x += this.vx;
      this.y += this.vy;

      if (distance < 10) {
        this.reset(p5);
      }
    }

    show(p5) {
      p5.noStroke();
      p5.fill(this.color);
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
    p5.background(30, 60, 40, 120);

    // Crear flores cuando el mouse está presionado
    if (p5.mouseIsPressed) {
      flowers.push(new Flower(p5, p5.mouseX, p5.mouseY, flowerImages[Math.floor(p5.random(flowerImages.length))]));
    }

    // Crear partículas que se mueven hacia el centro
    if (p5.frameCount % 3 === 0) { // Añadimos partículas de forma constante
      particles.push(new Particle(p5));
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
