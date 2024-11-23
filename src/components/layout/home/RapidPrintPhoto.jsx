import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import { getPhotoByArchive } from "../../../services/ArchiveAPI";
import { useNavigate } from "react-router-dom";

class ImageDisplay {
  constructor(img, p5, x, y) {
    this.img = img;
    this.p5 = p5;
    this.x = x;
    this.y = y;
  }

  display() {
    const { p5, img, x, y } = this;
    p5.push();
    p5.image(img, x, y);
    p5.pop();
  }
}

const RapidPrintPhoto = () => {
  const [imageDisplays, setImageDisplays] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimationStopped, setIsAnimationStopped] = useState(false);
  const navigate = useNavigate();

  const setup = async (p5, canvasParentRef) => {
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    const canvas = p5.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasParentRef);
    p5.background(24, 2, 2) ;
    canvas.style("user-select", "none");
    canvas.style("touch-action", "none");

    try {
      const collection = await getPhotoByArchive("print-images");
      const images = await loadImages(collection, p5);

      const imageDisplays = images.map((img, index) => {
        return new ImageDisplay(
          img,
          p5,
          p5.random(p5.width - img.width),
          p5.random(p5.height - img.height)
        );
      });

      setImageDisplays(imageDisplays);

      let intervalId = setInterval(() => {
        if (!isAnimationStopped) {
          setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            if (nextIndex >= imageDisplays.length) {
              clearInterval(intervalId);
            }
            return nextIndex;
          });
        }
      }, 100);

      return () => clearInterval(intervalId);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const loadImages = async (collection, p5) => {
    const imageUrls = collection.map((item) => item.Image);

    const isMobile = window.innerWidth <= 768;
    const imgWidth = isMobile ? 100 : 180;

    const loadedImages = await Promise.all(
      imageUrls.map(
        (imageUrl) =>
          new Promise((resolve) => {
            p5.loadImage(imageUrl, (img) => {
              img.resize(imgWidth, 0);
              resolve(img);
            });
          })
      )
    );

    return loadedImages;
  };

  const draw = (p5) => {
    p5.background(20, 21, 12, 9)
    for (let i = 0; i <= currentIndex; i++) {
      imageDisplays[i]?.display();
    }
  };

  const handleSkipAnimation = () => {
    setIsAnimationStopped(true);
    setCurrentIndex(imageDisplays.length - 1);
  };

  return (
    <div style={{position:"absolute"}}> 
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default RapidPrintPhoto;
