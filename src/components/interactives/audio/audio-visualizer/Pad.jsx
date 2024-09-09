import React from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import videoFile from "../../../../assets/pad/suns-soleil.mp4";
import audio from "../../../../assets/pad/beat.wav";
import audio1 from "../../../../assets/pad/ojo.wav";
import audio2 from "../../../../assets/pad/soho.wav";
import audio3 from "../../../../assets/pad/rising.wav";
import audio4 from "../../../../assets/pad/space.wav";
import suziImage from "../../../../assets/pad/suzi.jpg";
import harmImage from "../../../../assets/pad/harm.jpg";
import goylImage from "../../../../assets/pad/goyl.jpg";
import "./SketchAudioStyles.css";

let sound;
let sound1;
let sound2;
let sound3;
let sound4;
let video;


let wasLKeyPressed = false;
let areSoundsStarted = false;
let isSoundOn = false;
let isSound1On = false;
let isSound2On = false;
let isSound3On = false;
let isSound4On = false;
let isVideoPlaying = false;
let isGrowing = true;
let isHKeyPressed = false;

let initialCircleRadius = 50;
let circleRadius = 0;
let stars = [];

let suzi;
let suziSize = 100;
let suziAngle = 0;
let suziOffset = 0;

let harm;
let harmSize = 100;
let harmAngle = 0;
let harmOffset = 0;

let goyl;
let goylSize = 100;
let goylAngle = 0;
let goylOffset = 0;

let cubeRotation = 0;

const Pad = (props) => {

  const preload = (p5) => {
    sound = p5.loadSound(audio);
    sound1 = p5.loadSound(audio1);
    sound2 = p5.loadSound(audio2);
    sound3 = p5.loadSound(audio3);
    sound4 = p5.loadSound(audio4);
    suzi = p5.loadImage(suziImage);
    harm = p5.loadImage(harmImage);
    goyl = p5.loadImage(goylImage);
    video = p5.createVideo([videoFile]);
    video.hide();
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1200, 500, p5.WEBGL).parent(canvasParentRef);
  };

  const toggleAllSounds = () => {
    if (areSoundsStarted) {
      sound.stop();
      sound1.stop();
      sound2.stop();
      sound3.stop();
      areSoundsStarted = false;
    } else {
      sound.loop();
      sound1.loop();
      sound2.loop();
      sound3.loop();
      areSoundsStarted = true;
    }
  };

  const remove = (p5) => {
    video.remove();
  };

  const draw = (p5) => {

    //video
    if (p5.keyIsDown(86) && !isVideoPlaying) {
      video.loop();
      isVideoPlaying = true;
    } else if (!p5.keyIsDown(86) && isVideoPlaying) {
      video.pause();
      isVideoPlaying = false;
    }
    if (isVideoPlaying) {
      const videoWidth = 350;

      const videoHeight = (videoWidth / -video.width) * -video.height;
      p5.image(video, 0, 0, videoWidth, videoHeight);
    } else {
      p5.background(255, 0, 0);
    }

    // tecla L - loop
    const isLKeyPressed = p5.keyIsDown(76);

    if (isLKeyPressed && !wasLKeyPressed) {
      cubeRotation = 0;
      toggleAllSounds();
    }

    wasLKeyPressed = isLKeyPressed;

    if (isLKeyPressed) {
      p5.push();
      p5.translate(0, 0, -200);
      p5.rotateX(cubeRotation);
      p5.rotateY(cubeRotation);
      p5.box(90);
      p5.pop();

      // Update cube rotation
      cubeRotation += 0.01;
    }

    //tecla B - beat
    if (isSoundOn && sound.isPlaying()) {
      p5.push(); 
      const scaleValue = p5.sin(suziAngle);
      suziSize = p5.map(scaleValue, -1, 1, 50, 900);
      suziAngle += 0.5;
      p5.translate(p5.width / -+50, p5.height / 24, -700);
      p5.image(
        suzi,
        -suziSize / 2,
        -suziSize / 2 + suziOffset,
        suziSize,
        suziSize
      );
      p5.pop(); 
    }

    if (p5.keyIsDown(66) && !isSoundOn) {
      sound.loop();
      isSoundOn = true;
    } else if (!p5.keyIsDown(66) && isSoundOn) {
      sound.stop();
      isSoundOn = false;
    }

    //letra K - bajo
    if (isSound1On && sound1.isPlaying()) {
      p5.push();
      const scaleValue = p5.sin(harmAngle);
      harmSize = p5.map(scaleValue, -1, 1, 50, 900);
      harmAngle += 0.5;

      
      const harmXPos = (p5.width * 1.5) / 1.6;
      p5.translate(harmXPos, p5.height / 8, -700);
      p5.image(
        harm,
        -harmSize / 2,
        -harmSize / 2 + harmOffset,
        harmSize,
        harmSize
      );
      p5.pop();
    }

    if (p5.keyIsDown(75) && !isSound1On) {
      sound1.loop();
      isSound1On = true;
    } else if (!p5.keyIsDown(75) && isSound1On) {
      sound1.stop();
      isSound1On = false;
    }

    if (isSound2On && sound2.isPlaying()) {
      p5.push(); 
      const scaleValue = p5.sin(goylAngle);
      goylSize = p5.map(scaleValue, -1, 1, 50, 900);
      goylAngle += 0.5;
      p5.translate(p5.width / -1, p5.height / 8, -700);
      p5.image(
        goyl,
        -goylSize / 2,
        -goylSize / 2 + goylOffset,
        goylSize,
        goylSize
      );
      p5.pop();
    }

    if (p5.keyIsDown(83) && !isSound2On) {
      sound2.loop();
      isSound2On = true;
    } else if (!p5.keyIsDown(83) && isSound2On) {
      sound2.stop();
      isSound2On = false;
    }

    //letra H

    if (p5.keyIsDown(72) && !isSound3On) {
      sound3.loop();
      isSound3On = true;
    } else if (!p5.keyIsDown(72) && isSound3On) {
      sound3.stop();
      isSound3On = false;
    }

    if (p5.keyIsDown(72) && !isHKeyPressed) {
      isHKeyPressed = true;
      circleRadius = initialCircleRadius;
    } else if (!p5.keyIsDown(72) && isHKeyPressed) {
      isHKeyPressed = false;
    
    }

    if (isHKeyPressed) {
      p5.fill(350, 4, 309);
      const centerX = p5.width / -60;
      const centerY = p5.height / 60;
      p5.ellipse(centerX, centerY, circleRadius, circleRadius);

      if (isGrowing) {
        circleRadius += 10;
        if (circleRadius > 200) {
          circleRadius = 200;
          isGrowing = false; 
        }
      } else {
        circleRadius -= 5;
        if (circleRadius < 5) {
          circleRadius = 5;
          isGrowing = true; 
        }
      }
    }

    // letra R
    if (p5.keyIsDown(82) && !isSound4On) {
      sound4.loop();
      isSound4On = true;
    } else if (!p5.keyIsDown(82) && isSound4On) {
      sound4.stop();
      isSound4On = false;
      stars = [];
    }

    for (let i = 0; i < stars.length; i++) {
      drawStar(p5, stars[i].x, stars[i].y, stars[i].radius);
    }

    if (p5.keyIsPressed && p5.keyIsDown(82) ) {
      stars.push({
        x: p5.random(p5.width),
        y: p5.random(p5.height),
        radius: 5,
        growing: true
      });

      for (let i = 0; i < stars.length; i++) {
        if (stars[i].growing) {
          stars[i].radius += 2;
          if (stars[i].radius > 30) {
            stars[i].growing = false;
          }
        } else {
          stars[i].radius -= 1;
          if (stars[i].radius < 5) {
            stars[i].growing = true;
          }
        }
      }
    }
  };

  return (
    <Sketch
      className={"sketch"}
      setup={setup}
      draw={draw}
      preload={preload}
      remove={remove}
    />
  );
};

function drawStar(p5, x, y, radius) {
  p5.fill(280, 20, 50);
  p5.beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = p5.TWO_PI * i / 8 - p5.HALF_PI;
    let x1 = x * p5.cos(angle) * radius;
    let y1 = y * p5.sin(angle) * radius;
    p5.vertex(x1, y1);
    angle += p5.TWO_PI / 10;
    let x2 = x / p5.cos(angle) / radius / 2;
    let y2 = y / p5.sin(angle) / radius / 2;
    p5.vertex(x2, y2);
  }
  p5.endShape(p5.CLOSE);
}

export default Pad;