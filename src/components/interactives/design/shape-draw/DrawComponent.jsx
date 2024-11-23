import React, { useState } from "react";
import Sketch from "react-p5";
import "./DrawComponent.css";
import { setup } from "../image-print/p5-functions/CanvasSetupAndDraw";
import chooseImageIcon from "../../../../assets/icons/choose_image.svg"; 
import downloadIcon from "../../../../assets/icons/download_icon.svg";

const DrawComponent = () => {
  const [isMouseOverCanvas, setIsMouseOverCanvas] = useState(false);
  const [currentDrawing, setCurrentDrawing] = useState([]);
  const [lineStart, setLineStart] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#242424");
  const [shapeColor, setShapeColor] = useState("#14DCEB");
  const [uploadedImage, setUploadedImage] = useState(null); 

  let p5Instance = null;

  const draw = (p5) => {
    p5Instance = p5;
    p5.background(backgroundColor);

    if (uploadedImage) {
      const imgRatio = uploadedImage.width / uploadedImage.height;
      const canvasRatio = p5.width / p5.height;

      let imgWidth, imgHeight;

      if (imgRatio > canvasRatio) {
        imgWidth = p5.width;
        imgHeight = p5.width / imgRatio;
      } else {
        imgHeight = p5.height;
        imgWidth = p5.height * imgRatio;
      }

      const imgX = (p5.width - imgWidth) / 2;
      const imgY = (p5.height - imgHeight) / 2;

      p5.image(uploadedImage, imgX, imgY, imgWidth, imgHeight);
    }

    setIsMouseOverCanvas(
      p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < p5.height
    );

    if (p5.mouseIsPressed && isMouseOverCanvas) {
      if (!lineStart) {
        setLineStart({ x: p5.mouseX, y: p5.mouseY });
      } else {
        const lineShape = {
          type: "line",
          startX: lineStart.x,
          startY: lineStart.y,
          endX: p5.mouseX,
          endY: p5.mouseY,
          color: shapeColor,
        };
        setCurrentDrawing([...currentDrawing, lineShape]);
      }
    }

    for (const shape of currentDrawing) {
      if (shape.type === "line") {
        p5.stroke(shape.color);
        p5.strokeWeight(1);
        p5.line(shape.startX, shape.startY, shape.endX, shape.endY);
      }
    }
  };

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleShapeColorChange = (event) => {
    setShapeColor(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setUploadedImage(p5Instance.loadImage(img.src)); 
      };
    }
  };

  const saveSketch = () => {
    if (p5Instance) {
      p5Instance.saveCanvas("my-drawing", "png");
    }
  };

  return (
    <div className="sketch-draw-container">
      <div className="sketch-controls">
        <input
          type="color"
          id="backgroundColor"
          value={backgroundColor}
          onChange={handleBackgroundColorChange}
        />
        <input
          type="color"
          id="shapeColor"
          value={shapeColor}
          onChange={handleShapeColorChange}
        />
        <button className="sketch-button-icon" onClick={saveSketch}>
          <img src={downloadIcon} alt="Download" />
        </button>

        <label htmlFor="imageUpload" className="image-upload-button">
          <img src={chooseImageIcon} alt="Choose" />
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }} 
        />
      </div>
      <div>
        <Sketch setup={setup} draw={draw} />
      </div>
    </div>
  );
};

export default DrawComponent;
