import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import Azul from "../../../assets/feel.png";
import Imagen2 from "../../../assets/feel.png";
import Imagen3 from "../../../assets/feel.png";
import Imagen4 from "../../../assets/feel.png";
import Imagen5 from "../../../assets/feel.png";
import Imagen6 from "../../../assets/feel.png";
import Imagen7 from "../../../assets/feel.png";
import Imagen8 from "../../../assets/feel.png";
import Imagen9 from "../../../assets/feel.png";
import Imagen10 from "../../../assets/feel.png";

export default () => {
  const [xOffset, setXOffset] = useState(0); // Variable para el desplazamiento horizontal
  const [images, setImages] = useState([]);
  const imageSpeed = 1; // Velocidad del movimiento de las imágenes

  useEffect(() => {
    const preload = (p5) => {
      const img1 = p5.loadImage(Azul);
      const img2 = p5.loadImage(Imagen2);
      const img3 = p5.loadImage(Imagen3);
      const img4 = p5.loadImage(Imagen4);
      const img5 = p5.loadImage(Imagen5);
      const img6 = p5.loadImage(Imagen6);
      const img7 = p5.loadImage(Imagen7);
      const img8 = p5.loadImage(Imagen8);
      const img9 = p5.loadImage(Imagen9);
      const img10 = p5.loadImage(Imagen10);
      setImages([img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]);
    };

    preload(new p5());
  }, []);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    p5.rectMode(p5.CENTER);
  };

  const draw = (p5) => {
    p5.background(250, 255, 250);
    p5.translate(p5.width / 2, p5.height / 2);

    // Dibujar el tubo
    p5.push();
    p5.strokeWeight(2);
    p5.noFill();

    const time = p5.frameCount * 0.05;
    const tubeRadius = 1400;
    const tubeLength = 7500;
    const segments = 1900;
    const waveFrequency = 14;

    p5.stroke(0, 0, 0);

    for (let i = 0; i < segments; i++) {
      const angle = p5.map(i, 0, segments, 0, 360);
      const wave = p5.sin(time + i * waveFrequency) * 50;
      const radius = tubeRadius + wave;

      const x1 = radius * p5.cos(angle);
      const y1 = radius * p5.sin(angle);
      const x2 = radius * p5.cos(angle + 5);
      const y2 = radius * p5.sin(angle + 5);

      p5.line(x1, y1, x2, y2);
      p5.line(x1, y1, x1, y1 + tubeLength);
    }

    p5.pop();

    // Dibujar las imágenes
    const imgWidth = 300;
    const imgHeight = images[0]?.height * (imgWidth / images[0]?.width) || 0;

    const totalWidth = imgWidth * images.length;
    const startX = -totalWidth / 2;
    
    // Actualizar el desplazamiento horizontal de las imágenes
    setXOffset((prevX) => (prevX - imageSpeed) % totalWidth);

    if (images.length > 0) {
      images.forEach((img, index) => {
        const imgX = startX + index * imgWidth + xOffset;
        p5.imageMode(p5.CENTER);
        p5.image(img, imgX, 0, imgWidth, imgHeight);
      });
    }
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
    />
  );
};


