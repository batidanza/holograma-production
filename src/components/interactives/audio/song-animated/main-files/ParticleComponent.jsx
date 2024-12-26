import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import audio from "../../../../../assets/rec2.wav"; // Cambiar por el archivo de audio deseado
import {
  playAudio,
  stopAudio,
  requestAudioPermission,
} from "../helpers/AudioControls";
import './SongAnimated.css'

let sound;

const MagicHorseSketch = () => {
  const [audioPermission, setAudioPermission] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

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
    canvas.style("border", "2px solid black");
    canvas.style("border-radius", "10px");
    p5.frameRate(30);

    p5.noCursor();
  };

  const draw = (p5) => {
    p5.background(0);

    const centerX = p5.width / 2;
    const centerY = p5.height / 2;

    // Dibujar líneas estilo "ojo mágico"
    for (let y = 0; y < p5.height; y += 3) {
      for (let x = 0; x < p5.width; x += 5) {
        const offset = p5.noise(x * 0.01, y * 0.01, p5.frameCount * 0.01) * 20;
        p5.stroke(255, 200, 50);
        p5.strokeWeight(1);
        p5.line(x, y, x + offset, y);
      }
    }

    // Dibujar el caballo basado en audio
    if (audioPlaying && sound) {
      const amplitude = (sound.currentTime / sound.duration) * 200;
      p5.push();
      p5.stroke(255, 0, 0);
      p5.strokeWeight(2);
      p5.noFill();
      p5.translate(centerX, centerY);

      p5.beginShape();
      for (let angle = 0; angle < p5.TWO_PI; angle += 0.1) {
        const x = p5.cos(angle) * amplitude;
        const y = p5.sin(angle) * amplitude;
        p5.vertex(x, y);
      }
      p5.endShape(p5.CLOSE);

      // Dibujar figura de caballo estilizada
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textSize(32);
      p5.fill(255);
      p5.text("🐴", 0, 0);
      p5.pop();
    }
  };

  return (
    <div className="magic-horse-sketch">
      <div className="sketch-content">
        {audioPermission ? (
          <Sketch setup={setup} draw={draw} className="fluid-sketch" />
        ) : (
          <button
            className="button-permisson"
            onClick={handleRequestAudioPermission}
          >
            Allow Audio
          </button>
        )}
      </div>
    </div>
  );
};

export default MagicHorseSketch;
