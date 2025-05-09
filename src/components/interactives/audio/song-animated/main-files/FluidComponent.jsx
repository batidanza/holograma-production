import React, { useState, useEffect, useRef } from "react";
import Sketch from "react-p5";
import audio from "../../../../../assets/audioVisualizer/llanto.wav";
import fullScreanIcon from "../../../../../assets/icons/full_screan.svg";
import { FaPlay } from "react-icons/fa";


let sound;

const FluidComponent = () => {
  const [audioPermission, setAudioPermission] = useState(false);
  const [particles, setParticles] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [mouseInside, setMouseInside] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);
  const [paused, setPaused] = useState(false); // Estado para saber si está en pausa
  const numParticles = 1700;
  const p5Ref = useRef(null);
  const containerRef = useRef(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let timeout;

    const handleMouseMove = (event) => {
      if (event.clientY > window.innerHeight - 100) { 
        setShowButton(true);
        clearTimeout(timeout);
        timeout = setTimeout(() => setShowButton(false), 2000); // Ocultar después de 2 segundos
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    sound = new Audio(audio);
    sound.loop = false;
    sound.load();
    sound.addEventListener("ended", () => setAnimationEnded(true)); // Detectar el fin del audio

    // Event listener para la tecla space
    const handleSpaceKey = (e) => {
      if (e.code === "Space") {
        setPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleSpaceKey);

    return () => {
      window.removeEventListener("keydown", handleSpaceKey);
    };
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
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent(canvasParentRef);
    p5.frameRate(60);
    p5Ref.current = p5;

    canvas.mouseOver(() => setMouseInside(true));
    canvas.mouseOut(() => setMouseInside(false));

    const newParticles = [];
    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        size: p5.random(0.1, 2),
        opacity: p5.random(150, 255),
        speed: p5.random(2, 4),
        reachedMouse: false, // Nueva propiedad para saber si la partícula ya llegó al mouse
      });
    }
    setParticles(newParticles);
  };

  const draw = (p5) => {
    if (paused) {
      return; // Si está pausado, no dibujamos nada
    }

    p5.background(0);

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
        const x = centerX + lineLength * p5.cos(angle);
        const y = centerY + lineLength * p5.sin(angle);
        p5.line(centerX, centerY, x, y);
      }
    }

    for (const particle of particles) {
      if (!particle.reachedMouse && mouseInside) {
        const dx = p5.mouseX - particle.x;
        const dy = p5.mouseY - particle.y;
        const distance = p5.dist(p5.mouseX, p5.mouseY, particle.x, particle.y);

        if (distance < 10) {
          particle.reachedMouse = true;
          particle.speed = p5.random(1, 3); // Asignar una nueva velocidad
          particle.angle = p5.random(p5.TWO_PI); // Darle una nueva dirección
        } else {
          const directionX = dx / distance;
          const directionY = dy / distance;
          particle.x += directionX * particle.speed;
          particle.y += directionY * particle.speed;
        }
      }

      // Si la partícula ya alcanzó el mouse, que siga en movimiento
      if (particle.reachedMouse) {
        particle.x += particle.speed * p5.cos(particle.angle);
        particle.y += particle.speed * p5.sin(particle.angle);
      }

      p5.stroke(255, 0, 0, particle.opacity);
      p5.fill(255, 0, 0, particle.opacity);
      p5.ellipse(particle.x, particle.y, particle.size, particle.size);
    }

    const allParticlesReached = particles.every(
      (particle) => particle.reachedMouse
    );
    if (allParticlesReached && mouseInside) {
      playAudio();
    }

    // Mostrar el texto final si la animación ha terminado
    if (animationEnded) {
      p5.fill(255);
      p5.textSize(22);
      p5.textAlign(p5.CENTER, p5.CENTER);

      p5.textFont("IBM Plex Sans");
      const lines = [
        "CRY",
        "interactive from batidanza - musician based in Buenos Aires.",
        "this experience represents a void and how crying eventually fills the void",
        "turning it into completeness",
      ];

      lines.forEach((line, index) => {
        p5.text(line, p5.width / 2, p5.height / 2 + index * 30);
      });
    }
  };
  const togglePausePlay = () => {
    if (paused) {
      sound.play();
      setAudioPlaying(true);
    } else {
      sound.pause();
      setAudioPlaying(false);
    }
    setPaused((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
        setAudioPlaying(false);
      }
    };
  }, []);

  const windowResized = (p5) => {
    if (document.fullscreenElement) {
      // Si está en pantalla completa, hacer que el canvas ocupe toda la ventana
      p5.resizeCanvas(window.innerWidth, window.innerHeight);
    } else {
      // Si no está en pantalla completa, usar el tamaño predeterminado
      p5.resizeCanvas(800, 600);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        console.log("Requesting fullscreen");
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        console.log("Requesting fullscreen in webkit");
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        console.log("Requesting fullscreen in ms");
        containerRef.current.msRequestFullscreen();
      }
      document.body.style.overflow = "hidden";
      if (p5Ref.current) {
        p5Ref.current.resizeCanvas(window.innerWidth, window.innerHeight);
      }
    } else {
      console.log("Exiting fullscreen");
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
    const handleSpacebar = (event) => {
      if (event.key === " ") {
        if (audioPlaying) {
          // Pausar audio y animación
          sound.pause();
          setAudioPlaying(false);
        } else {
          // Reanudar audio y animación
          sound.play();
          setAudioPlaying(true);
        }
      }
    };

    // Escuchar el evento de la tecla space
    window.addEventListener("keydown", handleSpacebar);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("keydown", handleSpacebar);
    };
  }, [audioPlaying]);

  return (
    <div
      style={{ backgroundColor: "#111116", marginTop: "0px" }}
      ref={containerRef}
      className="sketch-container"
    >
      <div className="sketch-content">
        {audioPermission ? (
          <>
            <Sketch setup={setup} draw={draw} windowResized={windowResized} />
          </>
        ) : (
          <button
            className="button-permission"
            onClick={requestAudioPermission}
          >
<FaPlay/>          </button>
        )}
      </div>
      {showButton && (
        <button
          onClick={togglePausePlay}
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            padding: "10px 15px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {paused ? "Play" : "Pause"}
        </button>
      )}
    </div>
  );
};

export default FluidComponent;
