import React from "react";
import { animated } from "react-spring";
import { Link } from "react-router-dom";
import "./AnimatedCollection.css"

import AnimatedCollectionLogic from "./AnimatedCollectionLogic";
import LoadingSketch from "../../layout/Loading/LoadingSketch";

const AnimatedCollectionVisual = () => {
  const { props, positions, currentIndex, media, loading } = AnimatedCollectionLogic();

  const isMobile = window.innerWidth <= 768;
  const handleClick = (userId) => {
    console.log(`Clic en la imagen del usuario con ID: ${userId}`);
  };

  return (
    <div
      className="images-content"
    >
      {loading ? (
        <LoadingSketch />
      ) : (
        <div className="animated-collection-container">
          {media.length > 0 && (
            <div className="animated-media-container">
              {positions.map((position, i) => (
                <animated.div
                  key={i}
                  style={{
                    ...props,
                    position: "absolute",
                    left: position && position.left,
                    top: position && position.top,
                    width: isMobile ? "140px" : "200px", 
                  }}
                >
                  {media[i] && (
                    <Link
                      to={`/creatives/${media[i].UserID}`} 
                      key={media[i].ID}
                      onClick={() => handleClick(media[i].UserID)}
                    >
                      <img
                        className={`animated-media-image ${
                          i === currentIndex ? "active" : ""
                        }`}
                        src={media[i].Image}
                        alt={media[i].Title}
                        style={{ width: "100%", objectFit: "cover" }}
                      />
                    </Link>
                  )}
                </animated.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnimatedCollectionVisual;
