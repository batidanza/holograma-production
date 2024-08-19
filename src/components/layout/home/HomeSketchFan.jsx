import React, { useState } from "react";
import Sketch from "react-p5";
import myImage from "../../../assets/horse.png"; 

export default () => {
  const [x, setX] = useState(0.4);
  const [y, setY] = useState(0.4);
  const [dragging, setDragging] = useState(false);
  let img;

  const preload = (p5) => {
    img = p5.loadImage(myImage);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);
  };

  const draw = (p5) => {
    p5.background(250, 250, 250);
    p5.noFill();

    p5.translate(p5.width / 2, p5.height / 2);

    for (let i = 0; i < 2167; i++) {
      p5.push();
      p5.rotate(p5.sin(p5.frameCount + i) * 11115551);

      const britishGreen = {
        r: 0,
        g: 0,
        b: 0,
      };

      p5.stroke(britishGreen.r, britishGreen.g, britishGreen.b);
      p5.triangle(x, y, 1500 - i * 3, 1500 - i / 3, 1500 - i);
      p5.pop();
    }

    // Dibuja la imagen en el centro
    p5.image(img, -img.width / 2, -img.height / 2); // La imagen se dibuja centrada
  };

  const mousePressed = (p5) => {
    const distance = p5.dist(p5.width / 2, p5.height / 2, p5.mouseX, p5.mouseY);
    if (distance < 750) {
      setDragging(true);
    }
  };

  const mouseReleased = () => {
    setDragging(false);
  };

  const mouseDragged = (p5) => {
    if (dragging) {
      setX(p5.mouseX - p5.width / 2);
      setY(p5.mouseY - p5.height / 2);
    }
  };

  return (
    <Sketch
      preload={preload}
      setup={setup}
      draw={draw}
      mousePressed={mousePressed}
      mouseReleased={mouseReleased}
      mouseDragged={mouseDragged}
    />
  );
};
