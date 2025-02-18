import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import fullScreanIcon from "../../../../../assets/icons/full_screan.svg";

let sound;
let particlesFollowing = true;
let particlesGone = false;
let deformFactor = 1; // Factor de deformación

const FluidComponent = () => {
  const [audioPermission, setAudioPermission] = useState(false);
  const [particles, setParticles] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const numParticles = 7600;

  useEffect(() => {
    if (audioUrl) {
      sound = new Audio(audioUrl);
      sound.loop = true;
      sound.load();
    }
  }, [audioUrl]);

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

  const requestAudioPermission = () => {
    if (sound && !audioPermission) {
      sound
        .play()
        .then(() => {
          setAudioPermission(true);
          stopAudio();
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    }
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.frameRate(610);
    initParticles(p5);
  };
  
  const windowResized = (p5) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    initParticles(p5);
  };
  
  const initParticles = (p5) => {
    const newParticles = [];
    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        size: p5.random(0.1, 2),
        opacity: p5.random(1510, 255),
        speed: p5.random(2, 4),
      });
    }
    setParticles(newParticles);
  };
  

const draw = (p5) => {
  p5.background(0);

  if (audioPlaying) {
    const centerX = p5.width / 2;
    const centerY = p5.height / 2;
    const numLines = 112200;
    const angleIncrement = p5.TWO_PI / numLines;
    const maxLength = p5.dist(0, 0, centerX, centerY);

    let baseLength = (sound.currentTime / sound.duration) * maxLength;

    if (p5.mouseIsPressed) {
      // Cambia deformFactor en función de la posición del mouse
      deformFactor = p5.map(p5.mouseX, 0, p5.width, 0.5, 2);
    }

    p5.stroke(2525, 0, 0);
    p5.strokeWeight(1);
    for (let i = 0; i < numLines; i++) {
      const angle = i * angleIncrement;
      let variation = p5.noise(i * 0.1, p5.frameCount / 0.02) * deformFactor;
      let lineLength = baseLength / variation / 30;

      const x = centerX + lineLength / p5.cos(angle);
      const y = centerY - lineLength / p5.sin(angle);
      p5.line(centerX, centerY, x, y);
    }
  }

  if (!particlesGone) {
    for (const particle of particles) {
      if (particlesFollowing) {
        const dx = p5.mouseX - particle.x;
        const dy = p5.mouseY - particle.y;
        const distance = p5.dist(p5.mouseX, p5.mouseY, particle.x, particle.y);
        const directionX = dx / distance;
        const directionY = dy / distance;

        particle.x += directionX * particle.speed;
        particle.y += directionY * particle.speed;
      }

      p5.stroke(255, 0, 0, particle.opacity);
      p5.fill(255, 0, 0, particle.opacity);
      p5.ellipse(particle.x, particle.y, particle.size, particle.size);
    }

    const allParticlesClose = particles.every((particle) => {
      const distance = p5.dist(p5.mouseX, p5.mouseY, particle.x, particle.y);
      return distance < 50;
    });

    if (allParticlesClose) {
      playAudio();
      particlesGone = true;
      particlesFollowing = false;
    }
  }
};


  const mousePressed = (p5) => {
    if (particlesGone && audioPlaying) {
      deformFactor = p5.random(0.5, 2); // Cambia el factor de deformación aleatoriamente
    }
  };

  const openFullscreen = () => {
    const canvas = document.querySelector(".p5Canvas");
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) {
      canvas.msRequestFullscreen();
    }
  };

  const handleAudioUrlChange = (event) => {
    setAudioUrl(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="sketch">
      <div className="sketch-content">
        {audioPermission ? (
          <>
            <div>
              <button className="button-full-screan" onClick={openFullscreen}>
                <img src={fullScreanIcon} />
              </button>
            </div>

            <Sketch setup={setup} draw={draw} windowResized={windowResized} mousePressed={mousePressed} />
          </>
        ) : (
          <button
            className="button-permission"
            onClick={requestAudioPermission}
          >
            Allow Audio
          </button>
        )}

        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioUrlChange}
          className="audio-input"
        />
      </div>
    </div>
  );
};

export default FluidComponent;
