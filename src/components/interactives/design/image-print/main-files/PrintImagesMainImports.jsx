import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import horseImage from "../../../../../assets/print-images/horse.png";
import image1 from "../../../../../assets/print-images/flan.png";
import image2 from "../../../../../assets/print-images/wwwww.png";
import image3 from "../../../../../assets/print-images/feel.png";
import image4 from "../../../../../assets/print-images/stars.png";
import image5 from "../../../../../assets/print-images/face.png";
import image7 from "../../../../../assets/print-images/background1.png";
import image8 from "../../../../../assets/print-images/_DSC0416.jpg";
import image9 from "../../../../../assets/print-images/weso.jpg";
import image10 from "../../../../../assets/print-images/wwwww.png";
import image11 from "../../../../../assets/print-images/background2.png";
import image12 from "../../../../../assets/print-images/background3.png";

import extraSmallSizeIcon from "../../../../../assets/icons/extra_small.svg";
import smallSizeIcon from "../../../../../assets/icons/picture_small.svg";
import mediumSizeIcon from "../../../../../assets/icons/picture_medium.svg";
import largeSizeIcon from "../../../../../assets/icons/picture_large.svg";
import backgroundSizeIcon from "../../../../../assets/icons/wallpaper.svg";

import downloadIcon from "../../../../../assets/icons/download_icon.svg";
import chooseImage from "../../../../../assets/icons/choose_image.svg";
import fullScreanIcon from "../../../../../assets/icons/full_screan.svg";
import undoIcon from "../../../../../assets/icons/undo.svg";
import plusIcon from "../../../../../assets/icons/plus-symbol.svg";
import "./PrintImages.css";
import { getPhotoByArchive } from "../../../../../services/ArchiveAPI";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingSketch from "../../../../layout/Loading/LoadingSketch";
import { saveSketch } from "../p5-functions/CanvasSetupAndDraw";
import ImagesContainer from "./ImagesContainer";

const PrintImagesJsx = ({
  drawImage,
  setDrawImage,
  userImage,
  setUserImage,
  showInstructions,
  setShowInstructions,
  showSecondInstruction,
  setShowSecondInstruction,
  printedFirstImage,
  setPrintedFirstImage,
  size,
  setSize,
  imgRef,
  imagesHistory,
  handleKeyTyped,
  handleButtonClick,
  handleImageClick,
  handleImageUpload,
  openFullscreen,
  handleUndo,
  mousePressed,
  mouseDragged,
  setup,
  draw,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(size);
  const [ignoreCanvasClicks, setIgnoreCanvasClicks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  {
    /* 
  useEffect(() => {
    const fetchPhotoCollection = async () => {
      const data = await getPhotoByArchive("print-images");
      setCollection(data);
      console.log(data);
    };
    fetchPhotoCollection();
  }, []);

  */
  }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSizeChangeButton = (newSize) => {
    setSize(newSize);
    setSelectedSize(newSize);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    handleImageClick(
      new window.p5(),
      image,
      size,
      setUserImage,
      imagesHistory,
      setShowSecondInstruction,
      setPrintedFirstImage,
      setShowInstructions
    );
  };

  const sizeIconMap = {
    50: extraSmallSizeIcon,
    150: smallSizeIcon,
    250: mediumSizeIcon,
    500: largeSizeIcon,
    1050: backgroundSizeIcon,
  };

  const handleImageUploadDynamic = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImages((prevImages) => [...prevImages, imageUrl]);
    }
  };

  const handleButtonClickWithIgnore = (callback) => {
    setIgnoreCanvasClicks(true);
    callback();
    setTimeout(() => setIgnoreCanvasClicks(false), 0);
  };

  const handleDownload = () => {
    saveSketch(); // Llama directamente a la función saveSketch.
  };

  const renderSizeButtons = () => {
    const sizeButtons = [50, 150, 250, 500, 1050].map((s) => (
      <button
        key={s}
        className={`control-button ${selectedSize === s ? "selected" : ""}`}
        onClick={() => handleSizeChangeButton(s)}
      >
        <img className="icon-image" src={sizeIconMap[s]} alt={`Size ${s}`} />
      </button>
    ));

    return <div className="button-row">{sizeButtons}</div>;
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="draw-images">
      <div className="canvas-images-container">
        <div className="image-sizes">
          {renderSizeButtons()}
          <button
            className="control-button"
            onClick={() => handleButtonClickWithIgnore(openFullscreen)}
          >
            <img className="icon-image" src={fullScreanIcon} alt="Fullscreen" />
          </button>
          <button
            className="control-button"
            onClick={() =>
              handleButtonClickWithIgnore(() =>
                handleUndo(imagesHistory, setDrawImage, drawImage)
              )
            }
          >
            <img className="icon-image" src={undoIcon} alt="Undo" />
          </button>
          <button className="control-button" onClick={handleDownload}>
            <img className="icon-image" src={downloadIcon} alt="Download" />
          </button>
        </div>
        <div className="canvas-controls-desktop-row">
          <div className="image-row">
            {[horseImage, image1, image2, image3, image4, image5].map(
              (image) => (
                <img
                  key={image}
                  src={image}
                  alt="our-image"
                  className={`our-image ${
                    selectedImage === image ? "selected" : ""
                  }`}
                  onClick={() => handleImageSelect(image)}
                />
              )
            )}
          </div>
          <div className="canvas-content">
            <Sketch
              setup={(p5, canvasParentRef) => setup(p5, canvasParentRef)}
              draw={(p5) => {
                if (!ignoreCanvasClicks) {
                  draw(
                    p5,
                    showInstructions,
                    showSecondInstruction,
                    printedFirstImage,
                    imagesHistory,
                    drawImage,
                    userImage,
                    setShowSecondInstruction,
                    setPrintedFirstImage,
                    size
                  );
                }
              }}
              keyTyped={(p5) => handleKeyTyped(p5)}
              mousePressed={(p5) => {
                if (!ignoreCanvasClicks) {
                  mousePressed(
                    p5,
                    imagesHistory,
                    userImage,
                    setShowSecondInstruction,
                    setPrintedFirstImage,
                    setShowInstructions,
                    size
                  );
                }
              }}
              mouseReleased={() => {
                if (!ignoreCanvasClicks) {
                  setShowInstructions(false);
                }
              }}
              mouseDragged={(p5) => {
                if (!ignoreCanvasClicks) {
                  mouseDragged(
                    p5,
                    imagesHistory,
                    userImage,
                    setShowSecondInstruction,
                    setPrintedFirstImage,
                    setShowInstructions,
                    size
                  );
                }
              }}
            />
          </div>

          <div className="image-column">
            {uploadedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="uploaded-image"
                className={`our-image ${
                  selectedImage === image ? "selected" : ""
                }`}
                onClick={() => handleImageSelect(image)}
              />
            ))}
            <div
              className="control-button-add-photo"
              onClick={() =>
                document.getElementById("dynamicImageInput").click()
              }
            >
              <img src={plusIcon} alt="Upload" />
            </div>

            <input
              type="file"
              id="dynamicImageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUploadDynamic}
            />
          </div>
        </div>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) =>
            handleImageUpload(
              new window.p5(),
              e,
              setUserImage,
              setShowInstructions,
              setDrawImage,
              setShowSecondInstruction,
              imgRef
            )
          }
        ></input>

        {/* 
        <div style={{ width: "60vw" }}>
          <Slider {...settings}>
            {imagesToDisplay.map((image, index) => (
              <div key={index}>
                 <img
                src={image}
                alt={`Random ${index + 1}`}
                className={`our-image ${
                  selectedImage === image ? "selected" : ""
                }`}
                onClick={() => handleImageSelect(image)}
              />
              </div>
            ))}
          </Slider>
        </div>
        */}
        {/* 
        <div className="all-images-container">
          {imagesToDisplay.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Random ${index + 1}`}
                className={`our-image ${
                  selectedImage === image ? "selected" : ""
                }`}
                onClick={() => handleImageSelect(image)}
              />
            </div>
          ))}
        </div>
          */}

        <ImagesContainer
          handleImageSelect={handleImageSelect}
          selectedImage={selectedImage}
        />
      </div>
    </div>
  );
};

export default PrintImagesJsx;
