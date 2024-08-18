import React from "react";
import { Routes, Route } from "react-router-dom";
import PrintImages from "../components/interactives/design/image-print/main-files/PrintImages";
import ParticleComponent from "../components/interactives/audio/song-animated/main-files/ParticleComponent";
import FluidComponent from "../components/interactives/audio/song-animated/main-files/FluidComponent";
import Home from "../components/layout/home/Home";
import InteractivesList from "../components/interactives/list/InteractivesList";
import Magazine from "../components/magazine/main-files/Magazine";
import Login from "../components/user/login/Login";
import Profile from "../components/user/profile/Profile";
import DrawComponent from "../components/interactives/design/shape-draw/DrawComponent";
import Fan from "../components/interactives/artwork/Fan";
import BackgroundSketch from "../components/interactives/artwork/BackgroundSketch";
import AudioVisualizerComponent from "../components/interactives/audio/audio-visualizer/AudioVisualizerComponent";
import ImageCircle from "../components/interactives/design/image-circle/ImageCircle";
import Register from "../components/user/signin/Register";
import Creatives from "../components/user/creatives/Creatives";
import CreativeDetail from "../components/user/creatives/CreativeDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/magazine" element={<Magazine />} />
      <Route path="/interactives-list" element={<InteractivesList />} />
      <Route path="/draw-shape" element={<DrawComponent />} />
      <Route path="/print-images" element={<PrintImages />} />
      <Route path="/particle-component" element={<ParticleComponent />} />
      <Route path="/fluid-component" element={<FluidComponent />} />
      <Route path="/fan-sketch" element={<Fan />} />
      <Route path="/image-particle" element={<BackgroundSketch />} />
      <Route path="/audio-visualizer" element={<AudioVisualizerComponent />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/image-circle" element={<ImageCircle />} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/creatives" element={<Creatives/>} />
      <Route path="/creatives/:userId" element={<CreativeDetail/>} />
    </Routes>
  );
};

export default AppRoutes;
