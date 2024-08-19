import React from "react";
import videoSource from "../../../assets/sketch-ellipses-video.mp4";
import "./Home.css";
import HomeSketch from "./HomeSketch";
import Fan from "../../interactives/artwork/Fan";
import RapidPrintPhoto from "./RapidPrintPhoto.jsx";

const Home = () => {
  return (
    <>
      <div className="home-video">
        <RapidPrintPhoto/>
      </div>
    </>
  );
};

export default Home;
