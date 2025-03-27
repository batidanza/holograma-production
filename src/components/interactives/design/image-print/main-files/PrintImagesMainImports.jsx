import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import horseImage from "../../../../../assets/print-images/horse.png";
import image1 from "../../../../../assets/print-images/flan.png";
import image2 from "../../../../../assets/print-images/wwwww.png";
import image3 from "../../../../../assets/print-images/feel.png";
import image4 from "../../../../../assets/print-images/stars.png";
import image5 from "../../../../../assets/print-images/face.png";

import extraSmallSizeIcon from "../../../../../assets/icons/extra_small.svg";
import smallSizeIcon from "../../../../../assets/icons/picture_small.svg";
import mediumSizeIcon from "../../../../../assets/icons/picture_medium.svg";
import largeSizeIcon from "../../../../../assets/icons/picture_large.svg";
import wallpaper from "../../../../../assets/icons/wallpaper.svg";
import refresh from "../../../../../assets/icons/refresh2.svg";
import eraserModeIcon from "../../../../../assets/icons/eraser.svg";
import eraserOfIcon from "../../../../../assets/icons/eraser_of.svg";

import downloadIcon from "../../../../../assets/icons/download_icon.svg";
import chooseImage from "../../../../../assets/icons/choose_image.svg";
import fullScreanIcon from "../../../../../assets/icons/full_screan.svg";
import undoIcon from "../../../../../assets/icons/undo.svg";
import plusIcon from "../../../../../assets/icons/plus-icon.svg";
import minorIcon from "../../../../../assets/icons/minor-icon.svg";

import "./PrintImages.css";
import { getPhotoByArchive } from "../../../../../services/ArchiveAPI";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { saveSketch } from "../p5-functions/CanvasSetupAndDraw";
import ImagesContainer from "./ImagesContainer";
import { FaAngleDown } from "react-icons/fa6";
import { getP5Instance } from "../p5-functions/P5Instance";

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
  mousePressed,
  mouseDragged,
  setup,
  draw,
  windowResized,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(size);
  const [ignoreCanvasClicks, setIgnoreCanvasClicks] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [eraserMode, setEraserMode] = useState(false);
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
    setIgnoreCanvasClicks(true);
    setSize(newSize);
    setSelectedSize(newSize);
    setTimeout(() => setIgnoreCanvasClicks(false), 0);
  };

  const scrollToImagesContainer = () => {
    const imagesContainer = document.getElementById("images-container");
    if (imagesContainer) {
      imagesContainer.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClearCanvas = () => {
    const p5 = getP5Instance(); // Access the p5 instance

    imagesHistory.current = []; // Vaciar historial de imágenes
    setSelectedImage(null); // Asegurar que no quede imagen seleccionada
    setIgnoreCanvasClicks(true);

    if (p5) {
      p5.background(255); // Limpia el canvas manualmente
    }

    setTimeout(() => setIgnoreCanvasClicks(false), 300); // Reactivar clics después de un momento
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        event.preventDefault();
        setIgnoreCanvasClicks(true);
        handleUndo();
        setTimeout(() => setIgnoreCanvasClicks(false), 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Updated handleUndo without params
  const handleUndo = () => {
    for (let i = imagesHistory.current.length - 1; i >= 0; i--) {
      if (imagesHistory.current[i].hasOwnProperty("img")) {
        imagesHistory.current.splice(i, 1);
        break;
      }
    }
    setDrawImage((prev) => !prev); // Toggle to refresh
  };

  const removeImage = (imageToRemove) => {
    setUploadedImages((prevImages) =>
      prevImages.filter((image) => image !== imageToRemove)
    );
  };

  const handleImageSelect = (image) => {
    setIgnoreCanvasClicks(true);
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

    setShowInstructions(false);
    setShowSecondInstruction(true);

    setTimeout(() => setIgnoreCanvasClicks(false), 0);
  };
  useEffect(() => {
    const handleResize = () => {
      const p5 = getP5Instance();
      if (p5) {
        windowResized(p5); // Llamamos a la función para redimensionar el canvas
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getP5Instance]);

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
    return (
      <div className="size-controls">
        <button
          className="control-button tooltip"
          onClick={() => handleSizeChangeButton(selectedSize - 50)}
          disabled={selectedSize <= 50}
        >
          <img src={minorIcon} />
          <span className="tooltip-text">{selectedSize}px</span>
        </button>

        <button
          className="control-button tooltip"
          onClick={() => handleSizeChangeButton(selectedSize + 50)}
          disabled={selectedSize >= 1050}
        >
          <img src={plusIcon} />
          <span className="tooltip-text">{selectedSize}px</span>
        </button>
      </div>
    );
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
    <div className="sketch-container">
      <div className="canvas-images-container">
        <div className="image-sizes">
          {renderSizeButtons()}
          <button
            className="control-button tooltip"
            onClick={() => handleButtonClickWithIgnore(openFullscreen)}
          >
            <img className="icon-image" src={fullScreanIcon} alt="Fullscreen" />
            <span className="tooltip-text">Full Screan</span>
          </button>
          <button
            className="control-button tooltip"
            onClick={() => setEraserMode(!eraserMode)}
          >
            {eraserMode ? (
              <img src={eraserOfIcon} />
            ) : (
              <img src={eraserModeIcon} />
            )}
            <span className="tooltip-text">
              {eraserMode ? "Eraser Of" : "Eraser On"}
            </span>
          </button>

          <button
            className="control-button tooltip"
            onClick={handleClearCanvas}
          >
            <img src={refresh} />
            <span className="tooltip-text">Reset</span>
          </button>
          {/*
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
          */}
          <button className="control-button tooltip" onClick={handleDownload}>
            <img className="icon-image" src={downloadIcon} alt="Download" />
            <span className="tooltip-text">Download</span>
          </button>
        </div>
        <div className="canvas-controls-desktop-row">
          {!isMobile && 
                    <div className="image-items">
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
          }
          <div className="canvas-content">
            <Sketch
              setup={(p5, canvasParentRef) => setup(p5, canvasParentRef)}
              windowResized={(p5) => windowResized(p5)}
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
                    size,
                    eraserMode
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
          {isMobile && (
            <div className="image-items">
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
          )}
          <div className="image-column">
            {uploadedImages.map((image, index) => (
              <div key={index} className="image-column">
                <img
                  src={image}
                  alt="uploaded-image"
                  className={`our-image ${
                    selectedImage === image ? "selected" : ""
                  }`}
                  onClick={() => handleImageSelect(image)}
                />
                <button
                  className="close-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que el clic afecte la selección de la imagen
                    removeImage(image);
                  }}
                >
                  <img src={minorIcon} />
                </button>
              </div>
            ))}

            <div
              className="control-button-add-photo tooltip"
              onClick={() =>
                document.getElementById("dynamicImageInput").click()
              }
            >
              <img src={wallpaper} alt="Upload" />
              <span className="tooltip-text">Add Images</span>
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
        <button
          className="more-images-button"
          onClick={scrollToImagesContainer}
        >
          RANDOM PHOTOS <FaAngleDown />
        </button>
        <div id="images-container">
          <ImagesContainer
            handleImageSelect={handleImageSelect}
            selectedImage={selectedImage}
          />
        </div>
      </div>
    </div>
  );
};

export default PrintImagesJsx;
