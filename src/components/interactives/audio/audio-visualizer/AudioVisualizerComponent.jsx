import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import harmImage from "../../../../assets/harm.jpg";
import audio1 from "../../../../assets/psy-sketch-audio.wav";

let sound;
let harm;
let scaleFactor = 5;
let growing = true;
let soundPlayed = false;

const AudioVisualizerComponent = () => {
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const preload = (p5) => {
    sound = p5.loadSound(audio1);
    harm = p5.loadImage(harmImage);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasSize.width, canvasSize.height).parent(canvasParentRef);
    p5.imageMode(p5.CENTER);
  };

  const draw = (p5) => {
    p5.background(255);

    const scaledWidth = harm.width * scaleFactor;
    const scaledHeight = harm.height * scaleFactor;

    p5.image(harm, 900, 1905, scaledWidth, scaledHeight);

    if (soundPlayed) {
      if (growing) {
        scaleFactor += 0.01;
        if (scaleFactor >= 5) {
          growing = false;
        }
      } else {
        scaleFactor -= 0.01;
        if (scaleFactor <= 1) {
          growing = true;
        }
      }
    }
  };

  const mousePressed = (p5) => {
    // Play the sound and set soundPlayed flag if it's not already set
    if (!soundPlayed) {
      sound.loop();
      soundPlayed = true;
    }
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
    setCanvasSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  return (
    <>
      <div className="sketch-container">
        <p className="title">CLICK OR TOUCH THE IMAGE</p>
        <Sketch
          className={"sketch"}
          setup={setup}
          draw={draw}
          preload={preload}
          mousePressed={mousePressed}
          windowResized={windowResized}
        />
      </div>
    </>
  );
};

export default AudioVisualizerComponent;
