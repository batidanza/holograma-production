import React from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import audio from "../../../../assets/pad/1.mp3";
import suziImage from "../../../../assets/pad/suzi.jpg";
import videoFile from "../../../../assets/pad/suns-soleil.mp4";
import "./SketchAudioStyles.css";

let sound;
let suzi;
let video;

let isSoundOn = false;
let isVideoPlaying = false;

let suziSize = 100;
let suziAngle = 0;

const Pad2 = (props) => {
  const preload = (p5) => {
    sound = p5.loadSound(audio);
    suzi = p5.loadImage(suziImage);
    video = p5.createVideo([videoFile]);
    video.hide();
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1200, 500, p5.WEBGL).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(255, 0, 0);

    // Tecla L - Reproducir sonido mientras está presionado
    if (p5.keyIsDown(76) && !isSoundOn) {
      sound.loop();
      isSoundOn = true;
    } else if (!p5.keyIsDown(76) && isSoundOn) {
      sound.stop();
      isSoundOn = false;
    }

    // Si el sonido está activado, muestra la imagen de Suzi
    if (isSoundOn && sound.isPlaying()) {
      p5.push();
      const scaleValue = p5.sin(suziAngle);
      suziSize = p5.map(scaleValue, -1, 1, 50, 900);
      suziAngle += 0.5;
      p5.translate(p5.width / -50, p5.height / 24, -700);
      p5.image(suzi, -suziSize / 2, -suziSize / 2, suziSize, suziSize);
      p5.pop();
    }

    // Tecla V - Alternar video
   // Tecla V - Alternar video
   if (p5.keyIsDown(86) && !isVideoPlaying) {
    video.loop();
    isVideoPlaying = true;
  } else if (!p5.keyIsDown(86) && isVideoPlaying) {
    video.pause();
    isVideoPlaying = false;
  }

  if (isVideoPlaying) {
    const videoWidth = p5.width * 0.8;  // Adjust this percentage to make the video larger or smaller
    const videoHeight = (videoWidth / video.width) * video.height;

    p5.tint(255, 150);
    // Center the video on the canvas
    p5.push();
    p5.translate(-videoWidth / 2, -videoHeight / 2, 0); // Center the video
    p5.image(video, 0, 0, videoWidth, videoHeight);
    p5.pop();
  }
  };

  return (
    <Sketch
      className={"sketch"}
      setup={setup}
      draw={draw}
      preload={preload}
    />
  );
};

export default Pad2;
