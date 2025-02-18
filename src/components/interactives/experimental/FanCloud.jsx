import React, { useState } from "react";
import Sketch from "react-p5";
import horseImg from "../../../assets/print-images/stars.png"; // Asegúrate de que la ruta sea correcta

export default () => {
  const [x, setX] = useState(0.4);
  const [y, setY] = useState(0.4);
  const [dragging, setDragging] = useState(false);
  let img;

  const preload = (p5) => {
    img = p5.loadImage(horseImg);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    p5.imageMode(p5.CENTER);
  };

  const draw = (p5) => {
    p5.background(5, 6, 21, 6);
    p5.noFill();

    p5.translate(p5.width / 2, p5.height / 2);

    for (let i = 0; i < 50; i++) {
      p5.push();
      let scaleFactor = 14 + i * 0.01; // Reduce el tamaño progresivamente
      let posX = p5.sin(p5.frameCount + i) / (20 / i * 15);
      let posY = p5.cos(p5.frameCount + i) / (10 / i * 15);

      p5.rotate(p5.sin(p5.frameCount + i) * 11330);
      p5.image(img, posX, posY, img.width * scaleFactor, img.height * scaleFactor);
      p5.pop();
    }
  };

  const mousePressed = (p5) => {
    const distance = p5.dist(p5.width / 2, p5.height / 10, p5.mouseX, p5.mouseY);
    if (distance < 50) {
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