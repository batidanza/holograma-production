import React, { useState, useRef } from "react";
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

const ImageCircle = () => {
  const [aureolaColor, setAureolaColor] = useState("#91A0DC");
  const [userImage, setUserImage] = useState(null);
  const [drawUserImage, setDrawUserImage] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedShape, setSelectedShape] = useState("ellipse");
  const imgRef = useRef(null);
  const aureolas = [];

  const handleColorChange = (event) => {
    setAureolaColor(event.target.value);
  };

  const handleImageUpload = (event) => {
    setShowInstructions(false);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setUserImage(e.target.result);
      setDrawUserImage(true);
    };
    reader.readAsDataURL(file);
  };

  const mousePressed = (p5) => {
    if (drawUserImage && userImage && imgRef.current && imgRef.current.user) {
      const img = imgRef.current.user;
      const maxSize = 250;
      let imgWidth = img.width;
      let imgHeight = img.height;
      const scaleFactor = Math.min(maxSize / imgWidth, maxSize / imgHeight);
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
    canvas.style("border", "2px solid rgb(255, 255, 255); ;  ;");
    canvas.style("border-radius", "10px");
    p5.textFont("Array");

    if (!userImage) {
      p5.background(255, 55, 50);
    } else {
      p5.background(255, 5, 50);
    }
    p5.frameRate(60);
  };

  const draw = (p5) => {
    if (!userImage) {
      p5.background(255);
    }

    if (showInstructions) {
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.textSize(30);
      p5.textFont("Array");

      const fadeInDuration = 120;
      const fadeOutDuration = 120;
      const totalDuration = fadeInDuration + fadeOutDuration;

      let alpha = 255;
      const cyclePosition = p5.frameCount % totalDuration;
      if (cyclePosition < fadeInDuration) {
        alpha = p5.lerp(0, 255, cyclePosition / fadeInDuration);
      } else if (cyclePosition < totalDuration) {
        const fadeOutPosition = cyclePosition - fadeInDuration;
        alpha = p5.lerp(255, 0, fadeOutPosition / fadeOutDuration);
      }

      p5.fill(0, 0, 0, alpha);
    } 

    if (userImage && !imgRef.current) {
      imgRef.current = {
        user: p5.loadImage(userImage, () => {
          console.log("User image loaded successfully.");
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
    <div className="sketch-container">
      <div className="sketch-controls">
        <input
          type="color"
          id="aureolaColor"
          value={aureolaColor}
          onChange={handleColorChange}
          className="color-button"
        />
        <label htmlFor="imageUpload" className="image-upload-button">
          <img className="shape-button" src={chooseImageIcon} alt="Choose" />
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <button
          className="shape-button"
          onClick={() => setSelectedShape("ellipse")}
        >
          <img src={circleIcon} />
        </button>
        <button
          className="shape-button"
          onClick={() => setSelectedShape("rect")}
        >
          <img src={sideSquareIcon} />
        </button>
        <button
          className="shape-button"
          onClick={() => setSelectedShape("centerRect")}
        >
          <img src={squareIcon} />
        </button>
        <button
          className="shape-button"
          onClick={() => setSelectedShape("tube")}
        >
          <TbArrowDownRightCircle size={30} />
        </button>
        <button
          className="shape-button"
          onClick={() => setSelectedShape("circleLoop")}
        >
          <TbTopologyStarRing size={30} />
        </button>
        <button
          className="shape-button"
          onClick={() => setSelectedShape("squareLoop")}
        >
          <LiaVectorSquareSolid size={30} />
        </button>
        <button
          className="shape-button"
          onClick={() => setSelectedShape("blurie")}
        >
          <img src={blur} />
        </button>
        <button
          className="shape-button"
          onClick={() => setSelectedShape("chart")}
        >
          <img src={chart} />
        </button>
      </div>
      <div>
        <Sketch
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
