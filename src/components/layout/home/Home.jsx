import React from "react";
import "./Home.css";
import RapidPrintPhoto from "./RapidPrintPhoto.jsx";
import Fan from "../../interactives/artwork/Fan.jsx";
import BackgroundSketch from "../../interactives/artwork/BackgroundSketch.jsx";

const Home = () => {
  const lineCount = 70; // Número de líneas de fondo

  return (
    <>
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        {[...Array(lineCount)].map((_, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: `${(index / lineCount) * 100}%`,
              width: '1px',
              height: '100vh',
              backgroundColor:"rgb(255, 255, 255); ;  ;",
              opacity: 0.2,
            }}
          />
        ))}
                <BackgroundSketch/>
      </div>
    </>
  );
};

export default Home;
