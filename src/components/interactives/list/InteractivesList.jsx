import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SketchList.css";
import { Spoiler } from "spoiled";

import calm from "../../../assets/interactiveList/calm.png";
import calm2 from "../../../assets/interactiveList/calm2.jpeg";
import printImg from "../../../assets/interactiveList/print-images.jpeg";
import printImg2 from "../../../assets/interactiveList/print-images-2.jpeg";
import shapeImg from "../../../assets/interactiveList/image-shape.jpeg";
import psy from "../../../assets/interactiveList/psy.jpeg";
import chaotic from "../../../assets/interactiveList/chaotic.jpeg";
import dynamic3 from "../../../assets/interactiveList/dynamic3.jpeg";

import dynamic from "../../../assets/interactiveList/dynamic2.jpeg";
import pad from "../../../assets/interactiveList/pad.jpeg";

const InteractivesList = () => {
  const [hoveredDescription, setHoveredDescription] = useState(
    "Geometric shapes, patterns, or structured art."
  );
  const [visibleSketches, setVisibleSketches] = useState([]);
  const [linePosition, setLinePosition] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sketchCount, setSketchCount] = useState(visibleSketches.length);
  const [activeSection, setActiveSection] = useState({
    name: "DESIGN",
    description: "Geometric shapes, patterns, or structured art.",
  });

  useEffect(() => {
    setSketchCount(visibleSketches.length);
  }, [visibleSketches]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 968);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const updateLinePosition = () => {
      if (!activeSection) return;

      const button = document.querySelector(
        `[data-section="${activeSection.name}"]`
      );
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const startX = rect.left + rect.width / 2;
      const startY = rect.bottom + (isMobile ? 120 : 50);
      let endY = startY + 150;

      const sketches = sketchesBySection[activeSection.name] || [];
      let sketchesWithPositions = [];

      if (sketches.length > 0) {
        const screenWidth = window.innerWidth;
        const padding = 100;
        const availableWidth = screenWidth - padding * 2;
        const sketchSpacing = availableWidth / sketches.length;
        const startXOffset = padding + sketchSpacing / 2;

        sketchesWithPositions = sketches.map((sketch, index) => ({
          ...sketch,
          x: startXOffset + index * sketchSpacing - 90,
          y: endY + 90,
        }));

        endY += 20;
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

    updateLinePosition();
    window.addEventListener("resize", updateLinePosition);
    return () => window.removeEventListener("resize", updateLinePosition);
  }, [activeSection]);

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
    {
      name: "DYNAMIC",
      description: "Designs with movement or a sense of energy.",
    },
  ];

  const sketchesBySection = {
    CALM: [
      {
        id: 1,
        src: calm,
        title: "calm",
        path: "fluid-component",
      },
      {
        id: 2,
        src: calm2,
        title: "calm 2",
        path: "particle-component",
      },
    ],
    PSYCHEDELIC: [
      {
        id: 3,
        src: psy,
        title: "psy",
        path: "alma",
      },
    ],
    CHAOTIC: [
      { id: 4, src: chaotic, title: "chaotic", path: "chaotic" },
      {
        id: 5,
        src: printImg2,
        title: "Nature Abstract Sketch",
        path: "chaotic_particles",
      },
    ],
    DESIGN: [
      { id: 5, src: printImg, title: "PRINT IMAGES", path: "print-images" },
      {
        id: 6,
        src: shapeImg,
        title: "IMAGE + SHAPE",
        path: "image-circle",
      },
    ],
    NATURE: [
      {
        id: 2,
        src: printImg2,
        title: "Nature Abstract Sketch",
        path: "chaotic",
      },
    ],
    EXPERIMENTAL: [
      {
        id: 3,
        src: dynamic3,
        title: "SHAPE",
        path: "rolling_interactive_spiral",
      },
    ],
    DYNAMIC: [
      { id: 6, src: dynamic, title: "FAN SKETCH", path: "fan-sketch" },
      { id: 6, src: pad, title: "FAN SKETCH", path: "pad" },
    ],
  };

  const handleHover = (section) => {
    setHoveredDescription(section.description);
    setActiveSection(section);
  };

  return (
    <div className="sketch-list-view-container">
      <div className="sketch-carousel">
        <div className="section-description-container">
          <div className="sections-container">
            {sections.map((section) => (
              <button
                key={section.name}
                className="section-button"
                data-section={section.name}
                onMouseEnter={() => handleHover(section)}
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

      <div className="sketch-container" data-count={sketchCount}>
        {visibleSketches.map((sketch, index) => (
          <>
            <Link
              to={`/${sketch.path}`}
              key={`${sketch.id}-${index}`}
              className="sketch-image-container"
              style={{ top: sketch.y, left: sketch.x }}
            >
              <img src={sketch.src} alt={sketch.title} />
            </Link>
          </>
        ))}
      </div>

      {linePosition && (
        <svg className="dotted-line" xmlns="http://www.w3.org/2000/svg">
          <line
            x1={linePosition.startX}
            y1={linePosition.startY}
            x2={linePosition.endX}
            y2={linePosition.endY}
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          {linePosition.branches?.map((sketch, index) => (
            <line
              key={index}
              x1={linePosition.endX}
              y1={linePosition.endY}
              x2={sketch.x + 35}
              y2={sketch.y}
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          ))}
        </svg>
      )}
    </div>
  );
};

export default InteractivesList;
