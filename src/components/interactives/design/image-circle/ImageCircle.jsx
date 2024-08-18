import React, { useState, useRef } from "react";
import Sketch from "react-p5";
import { ChromePicker } from "react-color";
import './ImageCircle.css'

const ImageCircle = () => {
  const [aureolaColor, setAureolaColor] = useState({ r: 145, g: 160, b: 220 });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [drawUserImage, setDrawUserImage] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const imgRef = useRef(null);
  const aureolas = [];

  const handleColorChange = (color) => {
    setAureolaColor(color.rgb);
  };

  const toggleColorPicker = () => {
    setShowColorPicker((prev) => !prev);
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  const keyPressed = (p5) => {
    if (p5.key === "u" || p5.key === "U") {
      setShowInstructions(false);
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserImage(e.target.result);
          setDrawUserImage(true);
        };
        reader.readAsDataURL(file);
      };
      fileInput.click();
    }
  };

  const mousePressed = (p5) => {
    if (drawUserImage && userImage && imgRef.current && imgRef.current.user) {
      // Draw user image when mouse is pressed
      const mouseX = p5.mouseX;
      const mouseY = p5.mouseY;
      const imgSize = 100;
      p5.image(
        imgRef.current.user,
        mouseX - imgSize / 2,
        mouseY - imgSize / 2,
        imgSize,
        imgSize
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
    let canvasWidth = Math.min(window.innerWidth * 0.8, 1024)
    let canvasHeight = canvasWidth * (1.9 / 3);
  
    if (window.innerWidth < 780) {
      canvasWidth = window.innerWidth * 0.65; 
      canvasHeight = window.innerHeight * 0.9; 
    }
  
    // Create canvas and set parent
    const canvas = p5.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasParentRef);
  
    // Apply CSS styles to canvas
    canvas.style("display", "block");
    canvas.style("margin", "auto");
    canvas.style("user-select", "none");
    canvas.style("touch-action", "none");
    canvas.style("border", "2px solid black"); 
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

    if (showInstructions && p5.frameCount % 60 < 30) {
      p5.textAlign(p5.CENTER);
      p5.textSize(30);
      p5.textFont("Array");
      p5.fill(0);

      if (p5.frameCount < 230) {
        if (p5.frameCount % 60 < 15) {
          p5.text("DONT BE SHY!!", p5.width / 2, p5.height / 2 - 50);
        }
      } else {
        const textLine1 = "PRESS U TO UPLOAD YOUR PHOTOS";
        const textLine2 =
          "CLICK INSIDE THE CANVAS TO DRAW YOUR IMAGE WITH THE CHOSEN COLOR";

        p5.text(textLine1, p5.width / 2, p5.height / 2 - 50);
        p5.text(textLine2, p5.width / 2, p5.height / 2 + -20);
      }
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
      p5.stroke(aureolaColor.r, aureolaColor.g, aureolaColor.b);
      p5.ellipse(
        aureolas[i].x,
        aureolas[i].y,
        aureolas[i].radius,
        aureolas[i].radius
      );

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
      <div className="image-circle-container">
      <div className="color-button-container">
        <button className="color-buttons" onClick={toggleColorPicker}>
          PICK COLOR
        </button>
        {showColorPicker && (
          <div className="picker">
          <ChromePicker
            color={aureolaColor}
            onChange={handleColorChange}
            onClose={handleCloseColorPicker}
          />
          </div>
        )}
      </div>
        <div>
          <Sketch
            className="fluid"
            setup={setup}
            draw={draw}
            keyPressed={keyPressed}
            mousePressed={mousePressed}
            mouseReleased={mouseReleased}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCircle;
