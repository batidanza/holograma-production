import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import audio from "../../../../../assets/rec2.wav";

let sound;

const HomeFluidComponent = () => {
  const [particles ] = useState([]);
  const [drawnLines, setDrawnLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);
  const [drawingEnabled, setDrawingEnabled] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const numParticles = 200;
  const particlesAtMouse = new Set();

  useEffect(() => {
    sound = new Audio(audio);
    sound.loop = true;
    sound.load();
  }, []);

  const playAudio = () => {
    if (!audioPlaying) {
      sound.play();
      setAudioPlaying(true);
    }
  };

  const stopAudio = () => {
    sound.pause();
    sound.currentTime = 0;
    setAudioPlaying(false);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.frameRate(60);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        size: p5.random(0.1, 2),
        opacity: p5.random(150, 255),
        speed: p5.random(1, 3),
      });
    }
  };

  const draw = (p5) => {
    p5.background(0);

    let isMouseInsideCanvas = p5.mouseX >= 0 && p5.mouseX <= p5.width && p5.mouseY >= 0 && p5.mouseY <= p5.height;

    for (const particle of particles) {
      if (!particlesAtMouse.has(particle)) {
        const angle = p5.atan2(p5.mouseY - particle.y, p5.mouseX - particle.x);
        particle.x += particle.speed * p5.cos(angle);
        particle.y += particle.speed * p5.sin(angle);

        if (p5.dist(particle.x, particle.y, p5.mouseX, p5.mouseY) < 5) {
          particlesAtMouse.add(particle);
        }
      }

      p5.stroke(255, 0, 0, particle.opacity);
      p5.noFill();
      p5.ellipse(particle.x, particle.y, particle.size, particle.size);
    }

    if (particlesAtMouse.size === numParticles && isMouseInsideCanvas) {
      playAudio();
    }

    for (const drawnLine of drawnLines) {
      p5.beginShape();
      for (const { x, y } of drawnLine) {
        p5.vertex(x, y);
      }
      p5.endShape();
    }

    if (drawingEnabled) {
      p5.stroke(255, 50);
      p5.noFill();
      p5.beginShape();
      for (const { x, y } of currentLine) {
        p5.vertex(x, y);
      }
      p5.endShape();
    }
  };

  const mouseMoved = (p5) => {
    if (drawingEnabled) {
      setCurrentLine((prevLine) => [...prevLine, { x: p5.mouseX, y: p5.mouseY }]);
    }
  };

  const mouseReleased = () => {
    setDrawnLines((prevDrawnLines) => [...prevDrawnLines, currentLine]);
    setCurrentLine([]);
  };

  const mouseLeave = () => {
    setDrawingEnabled(false);
    stopAudio();
  };

  const mouseClicked = (p5) => {
    if (audioPlaying) {
      stopAudio();
      resetParticlePositions(p5);
    }
  };
  
  const resetParticlePositions = (p5) => {
    particlesAtMouse.clear();
  
    for (let i = 0; i < numParticles; i++) {
      particles[i] = {
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        size: p5.random(0.1, 2),
        opacity: p5.random(150, 255),
        speed: p5.random(1, 3),
      };
    }
  };
  return (
    <Sketch
      setup={setup}
      draw={draw}
      mouseMoved={mouseMoved}
      mouseReleased={mouseReleased}
      mouseLeave={mouseLeave}
      mouseClicked={mouseClicked}
    />
  );
};

export default HomeFluidComponent;