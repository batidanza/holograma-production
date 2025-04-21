import React, { useState, useEffect, useRef } from "react";
import Sketch from "react-p5";
import audio from "../../../../../assets/audioVisualizer/crema.mp3";
import fullScreanIcon from "../../../../../assets/icons/full_screan.svg";
import { playAudio, stopAudio, requestAudioPermission } from "../helpers/AudioControls";
import Star from "../helpers/Star"; 
import { FaPlay } from "react-icons/fa";


let sound;

const FluidComponent = () => {
  const [audioPermission, setAudioPermission] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [stars, setStars] = useState([]);
  const p5Ref = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    sound = new Audio(audio);
    sound.loop = true;
    sound.load();
  }, []);

  const handleRequestAudioPermission = () => {
    requestAudioPermission(sound, setAudioPermission, () =>
      stopAudio(sound, setAudioPlaying, setCursorVisible)
    );
  };

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
    p5.frameRate(60);

    p5.noCursor();
  };

  const draw = (p5) => {
    p5.background(15, 5, 55);

    for (let star of stars) {
      star.update();
      star.show(p5);
    }

    if (!audioPlaying) {
      p5.stroke(255);
      p5.strokeWeight(1);
      p5.line(p5.width / 2, p5.height / 2, p5.mouseX, p5.mouseY);

      if (p5.frameCount % 5 === 0) {
        let newStar = new Star(p5.mouseX, p5.mouseY);
        setStars([...stars, newStar]);
      }
    }

    if (audioPlaying || !cursorVisible) {
      const centerX = p5.width / 2;
      const centerY = p5.height / 2;
      const numLines = 1500;
      const angleIncrement = p5.TWO_PI / numLines;
      const maxLength = p5.dist(0, 0, centerX, centerY);
      let lineLength = (sound.currentTime / sound.duration) * maxLength;

      for (let i = 0; i < numLines; i++) {
        const angle = i * angleIncrement;
        const x = centerX + lineLength * p5.cos(angle);
        const y = centerY + lineLength * p5.sin(angle);
        p5.stroke(125, 4, 130, 5); // Color blanco para las líneas
        p5.strokeWeight(p5.random(1, 3));
        p5.line(centerX, centerY, x, y);
      }
    }

    if (
      !audioPlaying &&
      p5.dist(p5.width / 2, p5.height / 2, p5.mouseX, p5.mouseY) < 50
    ) {
      playAudio(sound, setAudioPlaying, setCursorVisible);
    } else if (
      audioPlaying &&
      p5.dist(p5.width / 2, p5.height / 2, p5.mouseX, p5.mouseY) >= 50
    ) {
      stopAudio(sound, setAudioPlaying, setCursorVisible);
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

            <Sketch
              setup={setup}
              draw={draw}
              windowResized={windowResized}
              className="fluid-sketch"
            />
          </>
        ) : (
          <button
            className="button-permission"
            onClick={handleRequestAudioPermission}
          >
<FaPlay/>               </button>
        )}
      </div>
    </div>
  );
};

export default FluidComponent;
