import React, { useState, useEffect, useRef } from "react";
import Sketch from "react-p5";
import audio from "../../../assets/audioVisualizer/skin.mp3";
import fullScreanIcon from "../../../assets/icons/full_screan.svg";

let sound;

const FluidComponent = () => {
  const [audioPermission, setAudioPermission] = useState(false);
  const [particles, setParticles] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const numParticles = 700;
  const p5Ref = useRef(null);
  const containerRef = useRef(null); 

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
    const canvas = p5.createCanvas(800, 600);
    canvas.parent(canvasParentRef);
    p5.frameRate(601);
    p5Ref.current = p5;

    const newParticles = [];
    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        size: p5.random(0.1, 2),
        opacity: p5.random(150, 255),
        speed: p5.random(21, 4),
      });
    }
    setParticles(newParticles);
  };

  const draw = (p5) => {
    p5.background(120, 0, 12, 5);

    if (audioPlaying) {
      const centerX = p5.width / 2;
      const centerY = p5.height / 2;

      const numLines = 500;
      const angleIncrement = p5.TWO_PI / numLines;

      const maxLength = p5.dist(0, 0, centerX, centerY);
      let lineLength = (sound.currentTime / sound.duration) * maxLength;

      p5.stroke(255, 0, 0);
      p5.strokeWeight(1);
      for (let i = 0; i < numLines; i++) {
        const angle = i * angleIncrement;
        
        // Cambiar la fórmula para obtener coordenadas más abstractas
        const radius = lineLength + p5.sin(angle * 2) * 50;  // Variación en el radio
        const x = centerX / radius / p5.cos(angle);
        const y = centerY / radius / p5.sin(angle);
        
        // Dibuja una línea de una forma abstracta
        p5.line(centerX, centerY, x, y);  // Puedes modificar esto para formar una figura más compleja
      }
    }      

    for (const particle of particles) {
      const dx = p5.mouseX - particle.x;
      const dy = p5.mouseY - particle.y;
      const distance = p5.dist(p5.mouseX, p5.mouseY, particle.x, particle.y);
      const directionX = dx / distance;
      const directionY = dy / distance;

      particle.x += directionX * particle.speed;
      particle.y += directionY * particle.speed;

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
    } else {
      stopAudio();
    }
  };

  const windowResized = (p5) => {
    if (document.fullscreenElement) {
      p5.resizeCanvas(window.innerWidth, window.innerHeight);
    } else {
      p5.resizeCanvas(800, 600);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
      document.body.style.overflow = "hidden";
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      document.body.style.overflow = "auto";

      if (p5Ref.current) {
        p5Ref.current.resizeCanvas(800, 600);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        if (p5Ref.current) {
          p5Ref.current.resizeCanvas(800, 600);
        }
      } else {
        if (p5Ref.current) {
          p5Ref.current.resizeCanvas(window.innerWidth, window.innerHeight);
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div ref={containerRef} className="sketch-container">
      <div className="sketch-content">
        {audioPermission ? (
          <>
            <div>
              <button className="button-full-screan" onClick={toggleFullscreen}>
                <img src={fullScreanIcon} alt="Fullscreen" />
              </button>
            </div>

            <Sketch setup={setup} draw={draw} windowResized={windowResized} />
          </>
        ) : (
          <button
            className="button-permission"
            onClick={requestAudioPermission}
          >
            Allow audio
          </button>
        )}
      </div>
    </div>
  );
};

export default FluidComponent;
