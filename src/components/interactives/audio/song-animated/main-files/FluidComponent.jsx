import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import audio from "../../../../../assets/psy-sketch-audio.wav";
import { playAudio, stopAudio, requestAudioPermission } from '../helpers/AudioControls'; // Import the audio functions
import { openFullscreen } from "../../../design/image-print/helpers/HandleImageUpload";
import './SongAnimated.css'

let sound;

const FluidComponent = () => {
  const [audioPermission, setAudioPermission] = useState(false);
  const [particles, setParticles] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const numParticles = 700;

  useEffect(() => {
    sound = new Audio(audio);
    sound.loop = true;
    sound.load();
  }, []);

  const setup = (p5, canvasParentRef) => {

  let canvasWidth = Math.min(window.innerWidth * 0.8, 1024);
  let canvasHeight = canvasWidth * (1.9 / 3);

  if (window.innerWidth < 780) {
    canvasWidth = window.innerWidth * 0.65; 
    canvasHeight = window.innerHeight * 0.9; 
  }

  const canvas = p5.createCanvas(canvasWidth, canvasHeight);
  canvas.parent(canvasParentRef);

  canvas.style("display", "block");
  canvas.style("margin", "auto");
  canvas.style("user-select", "none");
  canvas.style("touch-action", "none");
  canvas.style("border", "2px solid black"); 
  canvas.style("border-radius", "10px"); 
    p5.frameRate(60);
    p5.frameRate(60);


    const newParticles = [];
    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        size: p5.random(0.1, 2),
        opacity: p5.random(150, 255),
        speed: p5.random(2, 4),
      });
    }
    setParticles(newParticles);
  };

  const draw = (p5) => {
    p5.background(0);
    if (audioPlaying) {
        const tubeLength = p5.map(sound.currentTime, 0, sound.duration, 0, p5.height);
      
        p5.stroke(255, 0, 255);
        p5.strokeWeight(2);
        for (let i = 0; i < p5.width + p5.height; i += 20) {
          p5.line(i, 0, 0, i);
        }
      
        p5.noStroke();
        p5.fill(0, 255, 255);
        p5.beginShape();
        for (let angle = 0; angle < p5.TWO_PI; angle += 0.05) {
          const radius = p5.map(p5.sin(p5.frameCount * 0.01 + angle), -1, 1, 100, 200);
          const x = p5.width / 2 + radius * p5.cos(angle);
          const y = p5.height / 2 + radius * p5.sin(angle);
          p5.vertex(x, y);
        }
        p5.endShape(p5.CLOSE);
      
        p5.stroke(0, 255, 255);
        p5.strokeWeight(1);
        for (let x = 0; x < p5.width; x += 20) {
          for (let y = 0; y < p5.height; y += 20) {
            p5.point(x, y);
          }
        }
      
        p5.noFill();
        p5.stroke(255, 0, 0);
        p5.strokeWeight(1);
        p5.beginShape();
        for (let i = 0; i < 150; i++) {
          const x1 = p5.map(p5.sin(p5.frameCount * 0.01 + i) / p5.width / 2, -p5.width / 2, p5.width / 2, 0, p5.width);
          const y1 = p5.map(p5.cos(p5.frameCount * 0.01 + i) / p5.height / 2, -p5.height / 2, p5.height / 2, 0, p5.height);
          const x2 = p5.map(p5.sin(p5.frameCount * 0.01 + i + 1) * p5.width / 2, -p5.width / 2, p5.width / 2, 0, p5.width);
          const y2 = p5.map(p5.cos(p5.frameCount * 0.01 + i + 1) * p5.height / 2, -p5.height / 2, p5.height / 2, 0, p5.height);
          const x3 = p5.map(p5.sin(p5.frameCount * 0.01 + i + 2) * p5.width / 2, -p5.width / 2, p5.width / 2, 0, p5.width);
          const y3 = p5.map(p5.cos(p5.frameCount * 0.01 + i + 2) * p5.height / 2, -p5.height / 2, p5.height / 2, 0, p5.height);
          const x4 = p5.map(p5.sin(p5.frameCount * 0.01 + i + 3) * p5.width / 2, -p5.width / 2, p5.width / 2, 0, p5.width);
          const y4 = p5.map(p5.cos(p5.frameCount * 0.01 + i + 3) * p5.height / 2, -p5.height / 2, p5.height / 2, 0, p5.height);
          p5.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
        }
        p5.endShape();
      }
      
      for (const particle of particles) {
        const dx = p5.mouseX - particle.x;
        const dy = p5.mouseY - particle.y;
        const distance = p5.dist(p5.mouseX, p5.mouseY, particle.x, particle.y);
        const directionX = dx / distance;
        const directionY = dy / distance;
      
        particle.x += directionX * particle.speed;
        particle.y += directionY * particle.speed;
      
        const randomColor = p5.color(p5.random(255), p5.random(255), p5.random(255));
      
        p5.stroke(randomColor);
        p5.fill(randomColor);
        p5.ellipse(particle.x, particle.y, particle.size, particle.size);
      }
      
    const allParticlesClose = particles.every((particle) => {
      const distance = p5.dist(p5.mouseX, p5.mouseY, particle.x, particle.y);
      return distance < 50; 
    });

    if (allParticlesClose) {
      playAudio(sound, setAudioPlaying);
    } else {
      stopAudio(sound, setAudioPlaying);
    }
  };


  return (
    <div className="song-animated">
      <div className="sketch-content">
        {audioPermission ? (
          <>
            <div>
              <button className="button-sketch" onClick={openFullscreen}>FULLSCREEN</button>
            </div>
            <Sketch
              setup={setup}
              draw={draw}
              className="fluid-sketch"
            />
          </>
        ) : (
          <button className="button-permisson" onClick={() => requestAudioPermission(sound, setAudioPermission, setAudioPlaying)}>ALLOW AUDIO</button>
        )}
      </div>
    </div>
  );
};

export default FluidComponent;
