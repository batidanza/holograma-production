import React from "react";
import videoSource from "../../../assets/sketch-ellipses-video.mp4";
import "./Home.css";
import HomeSketch from "./HomeSketch";

const Home = () => {
  return (
    <>
      <div className="home-video">
        <HomeSketch />
      </div>
    </>
  );
};

export default Home;
