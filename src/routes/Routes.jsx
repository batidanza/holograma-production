import React from "react";
import { Routes, Route } from "react-router-dom";
import PrintImages from "../components/interactives/design/image-print/main-files/PrintImages";
import ParticleComponent from "../components/interactives/audio/song-animated/main-files/ParticleComponent";
import FluidComponent from "../components/interactives/audio/song-animated/main-files/FluidComponent";
import Home from "../components/layout/home/Home";
import InteractivesList from "../components/interactives/list/InteractivesList";
import Magazine from "../components/magazine/main-files/Magazine";
import Login from "../Login";
import DrawComponent from "../components/interactives/design/shape-draw/DrawComponent";
import Fan from "../components/interactives/dynamic/RollingPhotoSketch.jsx";
import Chaotic from "../components/interactives/chaotic/Chaotic.jsx";
import ImageCircle from "../components/interactives/design/image-circle/ImageCircle";
import CreateArchive from "../components/management/archive/CreateArchive";
import UploadArchivePhotos from "../components/management/archive/UploadArchivePhotos";
import Pad2 from "../components/interactives/audio/audio-visualizer/Pad2";
import Pad from "../components/interactives/audio/audio-visualizer/Pad";
import Signin from "../Signin";
import ProtectedRoute from "../ProtectedRoute";
import PhotoSwirlSketch from "../components/interactives/experimental/PhotoSwirlSketch";
import Alma from "../components/interactives/artwork/Ismael.jsx";
import ChaoticParticles from "../components/interactives/chaotic/ChaoticParticles.jsx";
import RollingInteractiveSpiralSketch from "../components/interactives/dynamic/RollingInteractiveSpiralSketch.jsx";

const AppRoutes = () => {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/signin"
          element={
            <ProtectedRoute redirectTo="/interactives-list">
              <Signin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute redirectTo="/interactives-list">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<InteractivesList />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/magazine" element={<Magazine />} />
        <Route path="/interactives-list" element={<InteractivesList />} />
        <Route path="/draw-shape" element={<DrawComponent />} />
        <Route path="/print-images" element={<PrintImages />} />
        <Route path="/particle-component" element={<ParticleComponent />} />
        <Route path="/fluid-component" element={<FluidComponent />} />
        <Route path="/swirl-sketch" element={<PhotoSwirlSketch />} />
        <Route path="/rolling_interactive_spiral" element={<RollingInteractiveSpiralSketch />} />
        <Route path="/fan-sketch" element={<Fan />} />
        <Route path="/september" element={<Pad2 />} />
        <Route path="/pad" element={<Pad />} />
        <Route path="/image-circle" element={<ImageCircle />} />
        <Route path="/collection-archive-create" element={<CreateArchive />} />
        <Route path="/chaotic" element={<Chaotic/>} />
        <Route path="/sketch" element={<Pad />} />
        <Route path="/alma" element={<Alma />} />
        <Route path="/chaotic_particles" element={<ChaoticParticles />} />

        <Route
          path="/collection-archive-photos-upload"
          element={<UploadArchivePhotos />}
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
