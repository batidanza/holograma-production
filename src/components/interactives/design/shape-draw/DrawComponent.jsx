import React, { useState } from "react";
import Sketch from "react-p5";
import "./DrawComponent.css";
import { setup } from "../image-print/p5-functions/CanvasSetupAndDraw";

const DrawComponent = () => {
  const [isMouseOverCanvas, setIsMouseOverCanvas] = useState(false);
  const [drawnShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState("ellipse");
  const [currentDrawing, setCurrentDrawing] = useState([]);
  const [lineStart, setLineStart] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#242424");
  const [shapeColor, setShapeColor] = useState("#14DCEB");
  const [shapeSize, setShapeSize] = useState(1); // Cambiado de lineThickness a shapeSize
  const [textToPrint, setTextToPrint] = useState("");

  const draw = (p5) => {
    p5.background(backgroundColor);

    setIsMouseOverCanvas(
      p5.mouseX > 0 &&
        p5.mouseX < p5.width &&
        p5.mouseY > 0 &&
        p5.mouseY < p5.height
    );

    if (p5.mouseIsPressed && isMouseOverCanvas) {
      if (currentShape === "ellipse") {
        const ellipseShape = {
          type: "ellipse",
          x: p5.mouseX,
          y: p5.mouseY,
          size: shapeSize, // Usar shapeSize en lugar de tamaño fijo
          color: shapeColor,
        };
        setCurrentDrawing([...currentDrawing, ellipseShape]);
      } else if (currentShape === "line" && !lineStart) {
        setLineStart({ x: p5.mouseX, y: p5.mouseY });
      } else if (currentShape === "line" && lineStart) {
        const lineShape = {
          type: "line",
          startX: lineStart.x,
          startY: lineStart.y,
          endX: p5.mouseX,
          endY: p5.mouseY,
          color: shapeColor,
          thickness: shapeSize, // Usar shapeSize para el grosor de la línea
        };
        setCurrentDrawing([...currentDrawing, lineShape]);
      } else if (currentShape === "text") {
        const textShape = {
          type: "text",
          x: p5.mouseX,
          y: p5.mouseY,
          color: shapeColor,
          size: shapeSize, // Usar shapeSize para el tamaño del texto
        };
        setCurrentDrawing([...currentDrawing, textShape]);
      }
    }

    for (const shapes of drawnShapes) {
      for (const shape of shapes) {
        p5.stroke(shape.color);
        if (shape.type === "ellipse") {
          p5.ellipse(shape.x, shape.y, shape.size, shape.size);
        } else if (shape.type === "line") {
          p5.strokeWeight(shape.thickness); // Usar el grosor de la línea del objeto shape
          p5.line(shape.startX, shape.startY, shape.endX, shape.endY);
        } else if (shape.type === "text") {
          p5.textSize(shape.size); // Ajustar el tamaño del texto
          p5.text("*", shape.x, shape.y);
        }
      }
    }

    for (const shape of currentDrawing) {
      p5.stroke(shape.color);
      if (shape.type === "ellipse") {
        p5.ellipse(shape.x, shape.y, shape.size, shape.size);
      } else if (shape.type === "line") {
        p5.strokeWeight(shape.thickness); 
        p5.line(shape.startX, shape.startY, shape.endX, shape.endY);
      } else if (shape.type === "text") {
        p5.textFont("Array");
        p5.textSize(shape.size);
        p5.text(textToPrint, shape.x, shape.y);
      }
    }
  };

  const handleEllipseClick = () => {
    setCurrentShape("ellipse");
  };

  const handleLineClick = () => {
    setCurrentShape("line");
  };

  const handleTextClick = () => {
    setCurrentShape("text");
  };

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleShapeColorChange = (event) => {
    setShapeColor(event.target.value);
  };

  const handleShapeSizeChange = (event) => {
    setShapeSize(parseInt(event.target.value));
  };

  const handleTextChange = (event) => {
    setTextToPrint(event.target.value);
  };

  return (
    <div className="sketch-draw-container">
      <div>
        <div className="sketch-buttons">
          <button onClick={handleEllipseClick}>DRAW CIRCLE</button>
          <button onClick={handleLineClick}>DRAW LINE</button>
          <button onClick={handleTextClick}>PRINT TEXT</button>
        </div>
        <div className="sketch-controls">
          <label htmlFor="backgroundColor">BACKGROUND COLOR</label>
          <input
            type="color"
            id="backgroundColor"
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
          />
          <label htmlFor="shapeColor">SHAPE COLOR</label>
          <input
            type="color"
            id="shapeColor"
            value={shapeColor}
            onChange={handleShapeColorChange}
          />
          <label htmlFor="shapeSize">SHAPE SIZE</label>
          <input
            className="shapeSize"
            type="range"
            id="shapeSize"
            min="1"
            max="100"
            value={shapeSize}
            onChange={handleShapeSizeChange}
          />
          <label htmlFor="textToPrint">TEXT TO PRINT</label>
          <input
            type="text"
            id="textToPrint"
            value={textToPrint}
            onChange={handleTextChange}
          />
        </div>
      </div>
      <div>
        <Sketch setup={setup} draw={draw} />
      </div>
    </div>
  );
};

export default DrawComponent;
