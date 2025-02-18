import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SketchList.css";

import sketchImage1 from "../../../assets/interactiveList/draw-images.png";
import sketchImage2 from "../../../assets/interactiveList/particle.png";
import sketchImage3 from "../../../assets/interactiveList/draw-lines.png";
import sketchImage4 from "../../../assets/interactiveList/fluid.png";
import sketchImage5 from "../../../assets/interactiveList/draw-image-with-shape.png";
import sketchImage6 from "../../../assets/interactiveList/Screenshot 2024-11-10 at 20.32.04 2.jpeg";
import sketchImage7 from "../../../assets/interactiveList/swirl.jpg";

const InteractivesList = () => {
  const [hoveredDescription, setHoveredDescription] = useState("");
  const [visibleSketches, setVisibleSketches] = useState([]);
  const [linePosition, setLinePosition] = useState(null);

  const sections = [
    { name: "CALM", description: "Relaxing, fluid, or minimalistic designs." },
    {
      name: "PSYCHEDELIC",
      description: "Abstract, colorful, and eye-catching designs.",
    },
    { name: "CHAOTIC", description: "Messy or visually intense designs." },
    {
      name: "DESIGN",
      description: "Geometric shapes, patterns, or structured art.",
    },
    {
      name: "NATURE",
      description: "Inspired by natural elements like particles or liquids.",
    },
    {
      name: "EXPERIMENTAL",
      description: "Rule-breaking, interactive, or conceptual designs.",
    },
    { name: "MINIMALISTIC", description: "Simple designs with few elements." },
    {
      name: "DYNAMIC",
      description: "Designs with movement or a sense of energy.",
    },
  ];

  const sketchesBySection = {
    CALM: [
      {
        id: 4,
        src: sketchImage4,
        title: "FLUID SKETCH",
        path: "fluid-component",
      },
    ],
    PSYCHEDELIC: [
      {
        id: 2,
        src: sketchImage2,
        title: "SOLO BRILLABA",
        path: "particle-component",
      },
    ],
    CHAOTIC: [
      { id: 6, src: sketchImage6, title: "FAN SKETCH", path: "fan-sketch" },
    ],
    DESIGN: [
      { id: 1, src: sketchImage1, title: "PRINT IMAGES", path: "print-images" },
      {
        id: 5,
        src: sketchImage5,
        title: "IMAGE + SHAPE",
        path: "image-circle",
      },
    ],
    NATURE: [
      {
        id: 2,
        src: sketchImage2,
        title: "SOLO BRILLABA",
        path: "particle-component",
      },
    ],
    EXPERIMENTAL: [
      { id: 3, src: sketchImage7, title: "SHAPE", path: "swirl-sketch" },
    ],
    MINIMALISTIC: [
      {
        id: 5,
        src: sketchImage5,
        title: "IMAGE + SHAPE",
        path: "image-circle",
      },
    ],
    DYNAMIC: [
      { id: 6, src: sketchImage6, title: "FAN SKETCH", path: "fan-sketch" },
    ],
  };

  const handleHover = (section, event) => {
    setHoveredDescription(section.description);

    // Obtener la posición del botón
    const rect = event.target.getBoundingClientRect();
    const startX = rect.left + rect.width / 2; // Centrar la línea en el botón
    const startY = rect.bottom + 50; // Añadir 20 píxeles más abajo
    let endY = startY + 150; // Punto donde se separará la línea

    const sketches = sketchesBySection[section.name] || [];
    let sketchesWithPositions = [];

    if (sketches.length > 0) {
      // Encontrar el punto medio entre las imágenes
      const middleX = startX;
      const spacing = 500; // Separación entre imágenes

      sketchesWithPositions = sketches.map((sketch, index) => ({
        ...sketch,
        x: middleX + (index - (sketches.length - 1) / 2) * spacing, // Distribuir horizontalmente
        y: endY + 50, // Ubicar más abajo de la línea principal
      }));

      endY += 20; // Hacer espacio para la bifurcación
    }

    setLinePosition({
      startX,
      startY,
      endX: startX,
      endY,
      branches: sketchesWithPositions,
    });
    setVisibleSketches(sketchesWithPositions);
  };

  const handleMouseLeave = () => {
    setHoveredDescription("");
    setLinePosition(null);
  };

  return (
    <div className="view-container">
      <div className="sketch-carousel">
        <div className="section-description-container">
          <div className="sections-container">
            {sections.map((section) => (
              <button
                key={section.name}
                className="section-button"
                onMouseEnter={(event) => handleHover(section, event)}
                onMouseLeave={handleMouseLeave}
              >
                {section.name}
              </button>
            ))}
          </div>
          {hoveredDescription && (
            <div className="description-container">{hoveredDescription}</div>
          )}
        </div>
      </div>

      {/* Renderizar las imágenes en posiciones aleatorias */}
      {visibleSketches.map((sketch) => (
        <Link
          to={`/${sketch.path}`}
          key={sketch.id}
          className="sketch-image-container"
          style={{
            position: "absolute",
            top: sketch.y,
            left: sketch.x,
          }}
        >
          <img src={sketch.src} alt={sketch.title} className="sketch-image" />
        </Link>
      ))}
      {linePosition && (
        <svg className="dotted-line" xmlns="http://www.w3.org/2000/svg">
          {/* Línea principal */}
          <line
            x1={linePosition.startX}
            y1={linePosition.startY}
            x2={linePosition.endX}
            y2={linePosition.endY}
            stroke="#4b4b4b"
            strokeWidth="2"
            strokeDasharray="5, 5"
          />
          {/* Líneas secundarias para conectar imágenes */}
          {linePosition.branches &&
            linePosition.branches.map((sketch, index) => (
              <line
                key={index}
                x1={linePosition.endX}
                y1={linePosition.endY}
                x2={sketch.x + 35} // Centrar en la imagen
                y2={sketch.y}
                stroke="#4b4b4b"
                strokeWidth="2"
                strokeDasharray="5, 5"
              />
            ))}
        </svg>
      )}
    </div>
  );
};

export default InteractivesList;
