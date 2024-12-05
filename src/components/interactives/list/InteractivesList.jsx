import React from "react";
import { Link } from "react-router-dom";
import "./SketchList.css";

import sketchImage1 from "../../../assets/interactiveList/draw-images.png";
import sketchImage2 from "../../../assets/interactiveList/particle.png";
import sketchImage3 from "../../../assets/interactiveList/draw-lines.png";
import sketchImage4 from "../../../assets/interactiveList/fluid.png";
import sketchImage5 from "../../../assets/interactiveList/draw-image-with-shape.png";
import sketchImage6 from "../../../assets/interactiveList/Screenshot 2024-11-10 at 20.32.04 2.jpeg";

const InteractivesList = () => {
  const imagesData = [
    { id: 1, src: sketchImage1, title: "PRINT IMAGES", path: "print-images" },
    { id: 2, src: sketchImage2, title: "SOLO BRILLABA", path: "particle-component" },
    { id: 3, src: sketchImage3, title: "SHAPE", path: "draw-shape" },
    { id: 4, src: sketchImage4, title: "FLUID SKETCH", path: "fluid-component" },
    { id: 5, src: sketchImage5, title: "IMAGE + SHAPE", path: "image-circle" },
    { id: 6, src: sketchImage6, title: "FAN SKETCH", path: "fan-sketch" },
  ];

  return (
    <div className="view-container">
      <div className="sketch-carousel">
        
        {imagesData.map((image) => (
          <div className="sketch-image-container" key={image.id}>
            <Link to={`/${image.path}`} aria-label={`Go to ${image.title}`}>
              <img
                src={image.src}
                alt={image.title}
                className="sketch-image"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractivesList;
