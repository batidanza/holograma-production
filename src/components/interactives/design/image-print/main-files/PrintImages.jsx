import React, { useState, useRef, useEffect } from "react";
import { handleImageUpload, openFullscreen } from "../helpers/HandleImageUpload";
import { mousePressed, mouseDragged } from "../helpers/MouseInteraction";
import { handleButtonClick, handleImageClick } from "../helpers/HandleImageAndButtonClick";
import { keyTyped, keyDown, handleUndo, handleSizeChange } from "../helpers/KeyInteractions";
import { setup, draw } from "../p5-functions/CanvasSetupAndDraw";
import PrintImagesJsx from "./PrintImagesMainImports";

const PrintImages = () => {
  const [drawImage, setDrawImage] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showSecondInstruction, setShowSecondInstruction] = useState(false);
  const [printedFirstImage, setPrintedFirstImage] = useState(false);
  const [size, setSize] = useState(() => {
    return window.innerWidth < 710 ? 50 : 100;
  });

  const imgRef = useRef(null);
  const imagesHistory = useRef([]);

  const handleKeyTyped = (p5) => {
    keyTyped(p5, () => handleUndo(imagesHistory, setDrawImage, drawImage), (key) => handleSizeChange(key, setSize));
  };

  const handleKeyDown = (event) => {
    keyDown(event, () => handleUndo(imagesHistory, setDrawImage, drawImage));
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <PrintImagesJsx
      drawImage={drawImage}
      setDrawImage={setDrawImage}
      userImage={userImage}
      setUserImage={setUserImage}
      showInstructions={showInstructions}
      setShowInstructions={setShowInstructions}
      showSecondInstruction={showSecondInstruction}
      setShowSecondInstruction={setShowSecondInstruction}
      printedFirstImage={printedFirstImage}
      setPrintedFirstImage={setPrintedFirstImage}
      size={size}
      setSize={setSize}
      imgRef={imgRef}
      imagesHistory={imagesHistory}
      handleKeyTyped={handleKeyTyped}
      handleButtonClick={handleButtonClick}
      handleImageClick={handleImageClick}
      handleImageUpload={handleImageUpload}
      openFullscreen={openFullscreen}
      handleUndo={handleUndo}
      mousePressed={mousePressed}
      mouseDragged={mouseDragged}
      setup={setup}
      draw={draw}
    />
  );
};

export default PrintImages;
