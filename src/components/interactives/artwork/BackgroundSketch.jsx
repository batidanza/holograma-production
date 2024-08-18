import React, { useState } from "react";
import Sketch from "react-p5";
import particleImage from "../../../assets/horse.png";

const BackgroundSketch = () => {
  const [particles, setParticles] = useState([]);
  const [particleImg, setParticleImg] = useState(null);
  let prevMouseX = 0;
  let prevMouseY = 0;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);

    setParticleImg(p5.loadImage(particleImage));

    for (let i = 0; i < 50; i++) {
      const particle = new Particle(
        p5,
        p5.random(p5.width),
        p5.random(p5.height)
      );
      particles.push(particle);
    }
  };

  const draw = (p5) => {
    p5.background(250);
    p5.noFill();

    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      particle.update(p5);
      particle.display(p5);

      if (particle.isDead()) {
        particles.splice(i, 1);
      }
    }

    if (prevMouseX !== p5.mouseX || prevMouseY !== p5.mouseY) {
      if (particles.length < 50) {
        const particle = new Particle(p5, p5.mouseX, p5.mouseY);
        particles.push(particle);
      }
      prevMouseX = p5.mouseX;
      prevMouseY = p5.mouseY;
    }
  };

  class Particle {
    constructor(p5, x, y) {
      this.position = p5.createVector(x, y);
      this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
      this.acceleration = p5.createVector();
      this.maxSpeed = 3;
      this.maxForce = 0.05;
      this.particleImg = particleImg;
      this.radius = p5.random(4, 10);
      this.alpha = 255;

      this.particleImg = p5.loadImage(particleImage);

      this.lifespan = 30;
    }

    update(p5) {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);

      this.alpha -= 105 / this.lifespan;
    }

    display(p5) {
      const aspectRatio = this.particleImg.width / this.particleImg.height;
      const width = this.radius * 10;
      const height = width / aspectRatio;

      p5.tint(255, this.alpha);
      p5.imageMode(p5.CENTER);
      p5.image(
        this.particleImg,
        this.position.x,
        this.position.y,
        width,
        height
      );
      p5.noTint();
    }

    isDead() {
      return this.alpha <= 0;
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
    >
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default BackgroundSketch;
