import React from "react";
import Sketch from "react-p5";
import horseImage from "../../../../../assets/horse.png";
import image1 from "../../../../../assets/face.png";
import image2 from "../../../../../assets/flan.png";
import image3 from "../../../../../assets/feel.png";
import image4 from "../../../../../assets/stars.png";
import image5 from "../../../../../assets/dolphines.png";
import './PrintImages.css';

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
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedSize, setSelectedSize] = React.useState(size);

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

  return (
    <div className="draw-images">
      <h4 className="title"> PRINT IMAGES </h4>
      <div className="canvas-images-container">
        <div className="image-sizes">
          <p className="image-size-title"> SIZE </p>
          {[50, 150, 250, 500, 1050].map((s) => (
            <button
              key={s}
              className={`control-button ${selectedSize === s ? 'selected' : ''}`}
              onClick={() => handleSizeChangeButton(s)}
            >
              {s / 50}
            </button>
          ))}
          <button className="control-text" onClick={openFullscreen}>
            FULL SCREEN
          </button>
          <button className="control-text" onClick={handleButtonClick}>
            LOAD PHOTO
          </button>
          <button
            className="control-text"
            onClick={() => handleUndo(imagesHistory, setDrawImage, drawImage)}
          >
            UNDO
          </button>
        </div>
        <div className="canvas-content">
          <Sketch
            setup={(p5, canvasParentRef) => setup(p5, canvasParentRef)}
            draw={(p5) =>
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
              )
            }
            keyTyped={(p5) => handleKeyTyped(p5)}
            mousePressed={(p5) =>
              mousePressed(
                p5,
                imagesHistory,
                userImage,
                setShowSecondInstruction,
                setPrintedFirstImage,
                setShowInstructions,
                size
              )
            }
            mouseReleased={(p5) => setShowInstructions(false)}
            mouseDragged={(p5) =>
              mouseDragged(
                p5,
                imagesHistory,
                userImage,
                setShowSecondInstruction,
                setPrintedFirstImage,
                setShowInstructions,
                size
              )
            }
          />
        </div>
        <div className="image-column">
          {[horseImage, image1, image2, image3, image4, image5].map((image) => (
            <img
              key={image}
              src={image}
              alt="our-image"
              className={`our-image ${selectedImage === image ? 'selected' : ''}`}
              onClick={() => handleImageSelect(image)}
            />
          ))}
        </div>
      </div>
      <div className="controls-container">
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
        />
      </div>
      <div className="instructions-container">
        <p>
          <br /><br />
          Welcome to our interactive image collage platform! How It Works
          <br />
          For guidance on using the platform, follow the on-screen instructions.
          These will provide helpful tips and information as you navigate the
          collage creation process.
          <br />
          Whether you're an artist, designer, or simply looking to unleash your
          creativity, our interactive image collage platform offers a fun and
          efficient way to bring your ideas to life. Get started now and let
          your imagination run wild!
          <br />
          <br />
          Fullscreen Mode: Want to immerse yourself fully in your creative
          process? Click the "FULLSCREEN" button to enter fullscreen mode.
          <br />
          Pause/Resume Drawing: Need a break or want to pause the drawing
          process? Simply click inside the canvas area again to toggle between
          pause and resume modes.
        </p>
        <p>
          Begin by uploading your desired images using the "LOAD IMAGE" button.
          Simply click the button or press "U" to trigger the image upload
          prompt.
        </p>
        <p>
          Once you've uploaded your images, click inside the canvas area to
          start placing them. Each click will position the image at the cursor
          location.
        </p>
        <p>
          Image Size Adjustment: To adjust the size of the images, use the
          numbered keys on your keyboard:
          <br />
          Press 1 for an extra-small size (50px).
          <br />
          Press 2 for a small size (150px).
          <br />
          Press 3 for a medium size (250px).
          <br />
          Press 4 for a large size (500px).
          <br />
          Press 5 for an extra-large size (1050px).
        </p>
      </div>
    </div>
  );
};

export default PrintImagesJsx;
