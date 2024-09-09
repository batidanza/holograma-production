import React from 'react';
import './SketchVisualizerInstructions.css'; // Asegúrate de crear este archivo CSS

const SketchVisualizerInstructions = ({ onReady }) => {
  return (
    <div className="instructions-overlay">
      <div className="instructions-content">
        <h1>Instructions</h1>
        <ul>
          <li>Press 'L' to toggle the cube rotation.</li>
          <li>Press 'B' to enable beat visualization.</li>
          <li>Press 'K' to start the bass effect.</li>
          <li>Press 'S' for additional sound effects.</li>
          <li>Press 'H' for a pulsating circle.</li>
          <li>Press 'R' for star effects.</li>
        </ul>
        <button onClick={onReady}>Ready</button>
      </div>
    </div>
  );
};

export default SketchVisualizerInstructions;
