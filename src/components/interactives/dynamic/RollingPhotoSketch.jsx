import React, { useState, useEffect, useRef } from "react";
import Sketch from "react-p5";
import horseImg from "../../../assets/print-images/flan.png";
import "./RollingPhotoSketch.css";

export default () => {
  const [imageSrc, setImageSrc] = useState(horseImg);
  const [topIsHover, setTopIsHover] = useState(true);
  const imgRef = useRef(null);
  let p5Instance = useRef(null);

  const preload = (p5) => {
    imgRef.current = p5.loadImage(imageSrc);
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    p5.angleMode(p5.DEGREES);
    p5.imageMode(p5.CENTER);
    p5Instance.current = p5;
  };

  const draw = (p5) => {
    p5.background(225, 225, 250, 6);
    p5.noFill();
    p5.translate(p5.width / 2, p5.height / 2);

    for (let i = 0; i < 150; i++) {
      p5.push();
      let scaleFactor = 1 - i * 0.03;
      let posX = p5.sin(p5.frameCount + i) * (5200 - i * 15);
      let posY = p5.cos(p5.frameCount + i) * (500 - i / 15);

      p5.rotate(p5.sin(p5.frameCount + i) * 1120);

      if (imgRef.current) {
        p5.image(
          imgRef.current,
          posX,
          posY,
          imgRef.current.width * scaleFactor,
          imgRef.current.height * scaleFactor
        );
      }

      p5.pop();
    }
  };

  useEffect(() => {
    if (p5Instance.current) {
      p5Instance.current.loadImage(imageSrc, (loadedImg) => {
        imgRef.current = loadedImg;
      });
    }
  }, [imageSrc]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImageSrc(newImageUrl);
    }
  };

  const handleMouseMove = (event) => {
    if (event.clientY < window.innerHeight * 0.2) {
      setTopIsHover(true); // Mostrar si el mouse está en el primer 20%
    } else if (topIsHover) {
      setTopIsHover(false); // Ocultar si ya estaba visible y el usuario sale
    }
  };

  return (
    <div
      style={{ position: "relative", width: "100vw", height: "100vh" }}
      onMouseMove={handleMouseMove}
    >
      {/* Botón de carga */}
      {topIsHover && (
        <div className="input-choose-image-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="image-upload"
          />
          <span>Choose an image to display</span>
        </div>
      )}

      {/* Sketch */}
      <Sketch preload={preload} setup={setup} draw={draw} />
    </div>
  );
};
