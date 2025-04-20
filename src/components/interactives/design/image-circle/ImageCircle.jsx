import React, { useState, useRef, useEffect } from "react";
import Sketch from "react-p5";
import chooseImageIcon from "../../../../assets/icons/choose_image.svg";
import "./ImageCircle.css";
import { TbArrowDownRightCircle } from "react-icons/tb";
import { TbTopologyStarRing } from "react-icons/tb";
import { LiaVectorSquareSolid } from "react-icons/lia";
import squareIcon from "../../../../assets/icons/square.svg";
import sideSquareIcon from "../../../../assets/icons/side_square.svg";
import circleIcon from "../../../../assets/icons/circle.svg";
import blur from "../../../../assets/icons/blur.svg";
import chart from "../../../../assets/icons/chart.svg";
import wallpaper from "../../../../assets/icons/wallpaper.svg";

const ImageCircle = () => {
  const [aureolaColor, setAureolaColor] = useState("#91A0DC");
  const [userImage, setUserImage] = useState(null);
  const [drawUserImage, setDrawUserImage] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedShape, setSelectedShape] = useState("ellipse");
  const [imageSize, setImageSize] = useState(120); // Tamaño inicial de la imagen
  const [isControlPressed, setIsControlPressed] = useState(false);

  const imgRef = useRef(null);
  const p5Instance = useRef(null);

  const aureolas = [];

  const handleColorChange = (event) => {
    setAureolaColor(event.target.value);
  };

  const handleImageUpload = (event) => {
    setShowInstructions(false);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setUserImage(e.target.result); // Actualizar la imagen
      setDrawUserImage(true);
      imgRef.current = null; // Limpiar la referencia de la imagen anterior
    };
    reader.readAsDataURL(file);
  };

  const mousePressed = (p5) => {
    if (isControlPressed) return; // Evita dibujar si un botón está presionado

    if (drawUserImage && userImage && imgRef.current?.user) {
      const img = imgRef.current.user;
      let imgWidth = img.width;
      let imgHeight = img.height;

      // Aumenta imageSize para permitir mayor escala
      const maxImageSize = imageSize * 2; // Ajusta el factor de escalado
      const scaleFactor = Math.min(
        maxImageSize / imgWidth,
        maxImageSize / imgHeight
      );

      const scaledWidth = imgWidth * scaleFactor;
      const scaledHeight = imgHeight * scaleFactor;

      const mouseX = p5.mouseX;
      const mouseY = p5.mouseY;

      p5.image(
        img,
        mouseX - scaledWidth / 2,
        mouseY - scaledHeight / 2,
        scaledWidth,
        scaledHeight
      );

      aureolas.push({ x: mouseX, y: mouseY, radius: 0, growing: true });
    }
  };

  const mouseReleased = () => {
    aureolas.forEach((aureola) => {
      aureola.growing = false;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (p5Instance.current) {
        windowResized(p5Instance.current);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setup = (p5, canvasParentRef) => {
    p5Instance.current = p5; // Guardamos la instancia para usarla fuera

    const updateCanvasSize = () => {
      let canvasWidth = Math.min(window.innerWidth * 0.8, 1024); // 80% del ancho, máximo 1024px
      let canvasHeight = canvasWidth * (1.9 / 3); // Mantiene la relación de aspecto 1.9:3

      if (window.innerHeight < 1060) {
        let canvasWidth = Math.min(window.innerWidth * 0.8, 1024); // 80% del ancho, máximo 1024px
        canvasHeight = window.innerHeight * 0.75; // 7.5% of the window height
      }
      // En pantallas pequeñas
      if (window.innerWidth < 980) {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight * 0.7;
      }

      p5.resizeCanvas(canvasWidth, canvasHeight);
    };

    const canvas = p5.createCanvas(1, 1);
    canvas.parent(canvasParentRef);

    canvas.id("drawingCanvas");

    updateCanvasSize();

    canvas.style("display", "block");
    canvas.style("margin", "auto");
    canvas.style("user-select", "none");
    canvas.style("touch-action", "none");
    p5.textFont("IBM Plex Sans");
    canvas.style("border", "1.5px dashed whitesmoke");
    canvas.style("border-spacing", "10px");
    canvas.style("padding", "10px");
    canvas.style("border-radius", "6px");
    canvas.style("padding", "10px");

    p5.frameRate(60);
  };

  const windowResized = (p5) => {
    let canvasWidth = Math.min(window.innerWidth * 0.8, 1024);
    let canvasHeight = canvasWidth * (1.9 / 3);

    if (window.innerWidth < 780) {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight * 0.9;
    }

    p5.resizeCanvas(canvasWidth, canvasHeight);
  };

  useEffect(() => {
    const handleResize = () => {
      if (p5) {
        windowResized(p5); // Llamamos a la función para redimensionar el canvas
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const draw = (p5) => {
    if (!userImage) {
      p5.background(245, 245, 245);
    }

    if (userImage && !imgRef.current) {
      imgRef.current = {
        user: p5.loadImage(userImage, () => {
          setShowInstructions(false);
        }),
      };
    }

    for (let i = aureolas.length - 1; i >= 0; i--) {
      p5.noFill();
      p5.stroke(aureolaColor);

      if (selectedShape === "ellipse") {
        p5.ellipse(
          aureolas[i].x,
          aureolas[i].y,
          aureolas[i].radius,
          aureolas[i].radius
        );
      } else if (selectedShape === "rect") {
        p5.rect(
          aureolas[i].x,
          aureolas[i].y,
          aureolas[i].radius,
          aureolas[i].radius
        );
      } else if (selectedShape === "tube") {
        p5.ellipse(
          aureolas[i].x - aureolas[i].radius / 2,
          aureolas[i].y - aureolas[i].radius / 2,
          aureolas[i].radius,
          aureolas[i].radius
        );
      } else if (selectedShape === "centerRect") {
        p5.rect(
          aureolas[i].x - aureolas[i].radius / 2,
          aureolas[i].y - aureolas[i].radius / 2,
          aureolas[i].radius,
          aureolas[i].radius
        );
      } else if (selectedShape === "circleLoop") {
        p5.push();
        p5.translate(aureolas[i].x, aureolas[i].y);
        p5.rotate(p5.frameCount * 0.01);
        p5.rect(
          -aureolas[i].radius / 2,
          -aureolas[i].radius / 2,
          aureolas[i].radius,
          aureolas[i].radius
        );
        p5.pop();
      } else if (selectedShape === "squareLoop") {
        p5.push();
        p5.translate(aureolas[i].x, aureolas[i].y);
        p5.scale(
          1 + 0.5 * Math.sin(p5.frameCount * 0.05),
          1 + 0.5 * Math.cos(p5.frameCount * 0.05)
        );
        p5.rect(
          -aureolas[i].radius / 2,
          -aureolas[i].radius / 2,
          aureolas[i].radius,
          aureolas[i].radius
        );
        p5.pop();
      } else if (selectedShape === "blurie") {
        p5.push();
        p5.translate(aureolas[i].x, aureolas[i].y);
        p5.rectMode(p5.CENTER);
        p5.filter(p5.BLUR, 2);
        p5.rect(0, 0, aureolas[i].radius, aureolas[i].radius);
        p5.pop();
      } else if (selectedShape === "chart") {
        let size = aureolas[i].radius + 20 * p5.sin(p5.frameCount * 0.1);
        p5.rect(aureolas[i].x - size / 2, aureolas[i].y - size / 2, size, size);
      }

      if (aureolas[i].growing) {
        aureolas[i].radius -= 5;
      }

      if (aureolas[i].radius >= 340) {
        aureolas.splice(i, 1);
      }
    }
  };

  return (
    <div className="sketch-draw-image-figure-container">
      <div className="sketch-draw-image-figure-container-column">
        <label
          htmlFor="imageUpload"
          className="control-button-add-photo tooltip"
          onMouseDown={() => setIsControlPressed(true)}
          onMouseUp={() => setIsControlPressed(false)}
        >
          <img className="shape-button" src={wallpaper} alt="Choose" />
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <input
          type="range"
          min="100"
          max="300"
          value={imageSize}
          onChange={(e) => setImageSize(e.target.value)}
          className="control-button-slide"
          onMouseDown={() => setIsControlPressed(true)}
          onMouseUp={() => setIsControlPressed(false)}
        />
      </div>
      <div className="sketch-draw-image-figure-content">
        <div className="sketch-controls">
          <input
            type="color"
            id="aureolaColor"
            value={aureolaColor}
            onChange={handleColorChange}
            className="color-button"
            onMouseDown={() => setIsControlPressed(true)}
            onMouseUp={() => setIsControlPressed(false)}
          />
          <button
            className={`control-button ${
              selectedShape === "ellipse" ? "selected" : ""
            }`}
            onClick={() => setSelectedShape("ellipse")}
            onMouseDown={() => setIsControlPressed(true)}
            onMouseUp={() => setIsControlPressed(false)}
          >
            <img src={circleIcon} />
          </button>
          <button
            className={`control-button ${
              selectedShape === "rect" ? "selected" : ""
            }`}
            onClick={() => setSelectedShape("rect")}
            onMouseDown={() => setIsControlPressed(true)}
            onMouseUp={() => setIsControlPressed(false)}
          >
            <img src={sideSquareIcon} />
          </button>
          <button
            className={`control-button ${
              selectedShape === "centerRect" ? "selected" : ""
            }`}
            onClick={() => setSelectedShape("centerRect")}
            onMouseDown={() => setIsControlPressed(true)}
            onMouseUp={() => setIsControlPressed(false)}
          >
            <img src={squareIcon} />
          </button>
          <button
            className={`control-button ${
              selectedShape === "tube" ? "selected" : ""
            }`}
            onClick={() => setSelectedShape("tube")}
            onMouseDown={() => setIsControlPressed(true)}
            onMouseUp={() => setIsControlPressed(false)}
          >
            <TbArrowDownRightCircle size={30} />
          </button>
          <button
            className={`control-button ${
              selectedShape === "circleLoop" ? "selected" : ""
            }`}
            onClick={() => setSelectedShape("circleLoop")}
            onMouseDown={() => setIsControlPressed(true)}
            onMouseUp={() => setIsControlPressed(false)}
          >
            <TbTopologyStarRing size={30} />
          </button>
          <button
            className={`control-button ${
              selectedShape === "squareLoop" ? "selected" : ""
            }`}
            onClick={() => setSelectedShape("squareLoop")}
            onMouseDown={() => setIsControlPressed(true)}
            onMouseUp={() => setIsControlPressed(false)}
          >
            <LiaVectorSquareSolid size={30} />
          </button>
          <button
            className={`control-button ${
              selectedShape === "blurie" ? "selected" : ""
            }`}
            onClick={() => setSelectedShape("blurie")}
            onMouseDown={() => setIsControlPressed(true)}
            onMouseUp={() => setIsControlPressed(false)}
          >
            <img src={blur} />
          </button>
          <button
            className={`control-button ${
              selectedShape === "chart" ? "selected" : ""
            }`}
            onClick={() => setSelectedShape("chart")}
            onMouseDown={() => setIsControlPressed(true)}
            onMouseUp={() => setIsControlPressed(false)}
          >
            <img src={chart} />
          </button>
        </div>

        <Sketch
          windowResized={(p5) => windowResized(p5)}
          className="fluid"
          setup={setup}
          draw={draw}
          mousePressed={mousePressed}
          mouseReleased={mouseReleased}
        />
      </div>
    </div>
  );
};

export default ImageCircle;
