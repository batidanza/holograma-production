import React, { useState } from "react";
import videoSource from "../../../assets/sketch-ellipses-video.mp4";
import "./Home.css";
import HomeSketch from "./HomeSketch";
import Fan from "../../interactives/artwork/Fan";
import RapidPrintPhoto from "./RapidPrintPhoto.jsx";

import SketchVisualizerInstructions from "../../interactives/audio/audio-visualizer/SketchVisualizerInstructions.jsx";
import Pad2 from "../../interactives/audio/audio-visualizer/Pad2.jsx";

const Home = () => {
  const [showInstructions, setShowInstructions] = useState(true);

  const handleReady = () => {
    setShowInstructions(false);
  };

  
  return (
    <>
    <div>
      {showInstructions ? (
        <SketchVisualizerInstructions onReady={handleReady} />
      ) : (
        <Pad2/>
      )}
    </div>

    </>
  );
};

export default Home;
