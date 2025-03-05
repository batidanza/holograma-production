import React, { useState, useEffect } from "react";
import Sketch from "react-p5";
import { getPhotoByArchive } from "../../../services/ArchiveAPI";
import "./Magazine.css";

const articles = [
  {
    title: "Outlaw Man",
    text: "Outlaw Man (アウトロー・マン, Autorō Man): Fue publicado como una historia especial en la revista Shōnen Jump en 1982. La trama gira en torno a un personaje principal que se encuentra en situaciones de conflicto y aventuras en un entorno que puede ser hostil o lleno de peligros."
  },
  {
    title: "Mashōnen B. T. (魔少年ビーティー, Mashōnen bītī): Este manga fue serializado en la revista Shōnen Jump semanal desde 1982 hasta 1983. La historia sigue las aventuras de un joven protagonista que posee habilidades especiales o sobrenaturales.",
    text: "Mashōnen B. T. (魔少年ビーティー, Mashōnen bītī): Este manga fue serializado en la revista Shōnen Jump semanal desde 1982 hasta 1983. La historia sigue las aventuras de un joven protagonista que posee habilidades especiales o sobrenaturales."
  },
  {
    title: "Baoh",
    text: "Baoh (バオー来訪者, Baō Raohōsha): Publicado en la revista Shōnen Jump semanal de 1984 a 1985, Baoh es una obra que mezcla acción, ciencia ficción y elementos sobrenaturales. La trama se centra en un adolescente que adquiere poderes especiales."
  },
  {
    title: "Gorgeous Irene",
    text: "Gorgeous Irene: Esta obra es una colección de one-shots, que son historias autoconclusivas, publicada en 1987. Cada historia ofrece una narrativa independiente con personajes y situaciones únicas."
  }
];

const Magazine = () => {
  const [imageDisplays, setImageDisplays] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setup = async (p5, canvasParentRef) => {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const canvas = p5.createCanvas(canvasWidth, canvasHeight);
    canvas.parent(canvasParentRef);
    p5.background(24, 2, 2);
    canvas.style("user-select", "none");
    canvas.style("touch-action", "none");

    try {
      const collection = await getPhotoByArchive("print-images");
      const images = await loadImages(collection, p5);

      const imageDisplays = images.map((img, index) => ({
        img,
        x: p5.random(p5.width - img.width),
        y: p5.random(p5.height - img.height),
        offsetX: 0,
        offsetY: 0,
        speedX: p5.random(1, 3),
        speedY: p5.random(1, 3)
      }));

      setImageDisplays(imageDisplays);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const loadImages = async (collection, p5) => {
    const imageUrls = collection.map((item) => item.Image);
    const imgWidth = 180;

    const loadedImages = await Promise.all(
      imageUrls.map(
        (imageUrl) =>
          new Promise((resolve) => {
            p5.loadImage(imageUrl, (img) => {
              img.resize(imgWidth, 0);
              resolve(img);
            }, (error) => {
              console.error(`Failed to load image: ${imageUrl}`, error);
              resolve(p5.createImage(imgWidth, 0)); // fallback empty image
            });
          })
      )
    );

    return loadedImages;
  };
  const draw = (p5) => {
    p5.background(24, 21, 12, 9);
  
    // 📌 Animación de imágenes con rebote
    imageDisplays.forEach((display) => {
      display.x += display.speedX;
      display.y += display.speedY;
  
      // 📌 Rebote en los bordes del canvas
      if (display.x > p5.width - display.img.width || display.x < 0) {
        display.speedX *= -1;
      }
      if (display.y > p5.height - display.img.height || display.y < 0) {
        display.speedY *= -1;
      }
  
      // 📌 Dibujar imágenes
      p5.image(display.img, display.x, display.y);
    });
  
    // 📌 Obtener el artículo actual
    const article = articles[currentIndex];
  
    // 📌 Alinear el texto al centro
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.fill(255);
  
    // 📌 1️⃣ Título (Centrado)
    p5.textSize(32);
    const titleX = p5.width / 2;
    const titleY = p5.height / 2 - 100;
    p5.text(article.title, titleX, titleY);
  
    // 📌 2️⃣ Texto del artículo (Centrado)
    p5.textSize(18);
    const textX = p5.width / 2;
    const textY = titleY + 50;
    const textWidth = p5.width * 0.6; // Solo para calcular saltos de línea manualmente
  
    // 📌 Formateo manual de líneas para mantener el centrado
    const formattedText = p5.split(article.text, ' ');
    let line = '';
    let yOffset = 0;
  
    formattedText.forEach((word) => {
      const testLine = line + word + ' ';
      const testWidth = p5.textWidth(testLine);
      
      if (testWidth > textWidth) {
        p5.text(line, textX, textY + yOffset);
        line = word + ' ';
        yOffset += 24; // Espaciado entre líneas
      } else {
        line = testLine;
      }
    });
  
    // 📌 Última línea del texto
    p5.text(line, textX, textY + yOffset);
  };
  
  

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length);
  };

  return (
    <div className="magazine-container">
      <Sketch setup={setup} draw={draw} />
      <div className="carousel-navigation">
        <div className="carousel-prev" onClick={handlePrevious}>
          <span>&lt;</span>
        </div>
        <div className="carousel-next" onClick={handleNext}>
          <span>&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default Magazine;
