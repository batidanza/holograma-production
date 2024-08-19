import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import { getPhotoByArchive } from "../../../services/ArchiveAPI";
import { useNavigate } from "react-router-dom";

// Importar la imagen de fondo desde tus assets
import backgroundImage from "../../../assets/rainbow.png";
// Importar el archivo de audio
import backgroundAudio from "../../../assets/psy-sketch-audio.wav";

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

  useEffect(() => {
    // Cargar y reproducir el audio en loop
    const audio = new Audio(backgroundAudio);
    audio.loop = true;
    audio.play().catch((error) => console.error("Error playing audio:", error));

    return () => {
      // Detener el audio cuando el componente se desmonta
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const setup = async (p5, canvasParentRef) => {
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    const canvas = p5.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasParentRef);

    canvas.style("user-select", "none");
    canvas.style("touch-action", "none");

    // Cargar y mostrar la imagen de fondo
    p5.background(p5.loadImage(backgroundImage));

    try {
      const collection = await getPhotoByArchive("Holograma");
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

      // Configurar la animación para mostrar imágenes rápidamente
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
      }, 100); // Cambiar este valor para ajustar la velocidad de la animación

      return () => clearInterval(intervalId);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const loadImages = async (collection, p5) => {
    const imageUrls = collection.map((item) => item.Image);

    const isMobile = window.innerWidth <= 768; // Detectar si es un dispositivo móvil
    const imgWidth = isMobile ? 100 : 180; // Ajustar el tamaño de la imagen

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
    p5.background(p5.loadImage(backgroundImage)); // Fondo de la imagen
    for (let i = 0; i <= currentIndex; i++) {
      imageDisplays[i]?.display();
    }
  };

  const handleSkipAnimation = () => {
    setIsAnimationStopped(true);
    setCurrentIndex(imageDisplays.length - 1);
  };

  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default RapidPrintPhoto;
