import React from "react";
import { Link } from "react-router-dom";
import "./SketchList.css";

import sketchImage1 from "../../../assets/interactiveList/sketch-image-color-photo.png";
import sketchImage2 from "../../../assets/interactiveList/sketch-image-color-photo.png";
import sketchImage3 from "../../../assets/interactiveList/sketch-image-color-photo.png";
import sketchImage4 from "../../../assets/interactiveList/sketch-image-color-photo.png";
import sketchImage5 from "../../../assets/interactiveList/sketch-image-color-photo.png";
import sketchImage6 from "../../../assets/interactiveList/sketch-image-color-photo.png";
import sketchImage7 from "../../../assets/interactiveList/sketch-image-color-photo.png";
import sketchImage8 from "../../../assets/interactiveList/sketch-image-color-photo.png";

const InteractivesList = () => {
  const imagesData = [
    { id: 1, src: sketchImage1, title: "PRINT IMAGES", path: "print-images" },
    { id: 2, src: sketchImage2, title: "SOLO BRILLABA", path: "particle-component" },
    { id: 3, src: sketchImage3, title: "DRAW SHAPE", path: "draw-shape" },
    { id: 4, src: sketchImage4, title: "FLUID SKETCH", path: "fluid-component" },
    { id: 5, src: sketchImage5, title: "SPHERE IMAGES", path: "image-circle" },
    { id: 6, src: sketchImage6, title: "FAN SKETCH", path: "fan-sketch" },
    { id: 7, src: sketchImage7, title: "IMAGE PARTICLE", path: "image-particle" },
    { id: 8, src: sketchImage8, title: "AUDIO & IMAGES PATCH", path: "audio-visualizer" },
  ];

  return (
    <div className="sketch-image-list">
      <h4 className="title"> INTERACTIVE SKETCHES </h4>
      <div className="sketch-containers">
        {imagesData.map((image) => (
          <div key={image.id} className="sketch-image-container">
            <Link to={`/${image.path}`}>
              <img
                src={image.src}
                alt={image.title}
                className="sketch-image"
              />
            </Link>
            <div className="image-title">{image.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractivesList;
