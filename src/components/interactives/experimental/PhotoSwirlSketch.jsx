import React, { useRef, useState } from "react";
import Sketch from "react-p5";
import './PhotoSwirlSketch.css'

const SuperponerImagenes = () => {
  const [images, setImages] = useState([null, null, null]);
  const [isPaused, setIsPaused] = useState(true);
  const [particlesActive, setParticlesActive] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([null, null, null]); // Previsualización

  const [animationProgress, setAnimationProgress] = useState(0);
  const [merging, setMerging] = useState(false);
  const [particlesStarted, setParticlesStarted] = useState(false);

  const p5Instance = useRef(null);

  const particles = [];
  const maxParticles = 500;

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file && p5Instance.current) {
      const reader = new FileReader();
      reader.onload = (e) => {
        p5Instance.current.loadImage(e.target.result, (img) => {
          setImages((prevImages) => {
            const newImages = [...prevImages];
            newImages[index] = img;
            return newImages;
          });
        });
      };
      reader.readAsDataURL(file);

      // Guardar la URL para previsualización
      const previewURL = URL.createObjectURL(file);
      setImagesPreview((prev) => {
        const newPreviews = [...prev];
        newPreviews[index] = previewURL;
        return newPreviews;
      });
    }
  };


  const setup = (p5, canvasParentRef) => {
    p5Instance.current = p5; // Guarda la referencia a p5
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  const createParticles = (p5, image) => {
    particles.length = 0;
    image.loadPixels();
    const imgWidth = image.width;
    const imgHeight = image.height;

    const imgSize = Math.random() * 300 + 150;
    const xPos = (p5.width - imgSize) / 2 + Math.random() * 50 - 25;
    const yPos = (p5.height - imgSize) / 2 + Math.random() * 50 - 25;

    let particleCount = 0;

    for (let y = 0; y < image.height && particleCount < maxParticles; y++) {
      for (let x = 0; x < image.width && particleCount < maxParticles; x++) {
        let index = (x + y * image.width) * 4;
        const r = image.pixels[index];
        const g = image.pixels[index + 1];
        const b = image.pixels[index + 2];
        const a = image.pixels[index + 3];

        if (a > 0) {
          const angle = Math.random() * p5.TWO_PI; // Ángulo aleatorio en un círculo
          const speed = Math.random() * 3 + 1; // Velocidad uniforme

          particles.push({
            x: p5.width / 2,
            y: p5.height / 2,
            speedX: Math.cos(angle) * speed,
            speedY: Math.sin(angle) * speed,

            r,
            g,
            b,
            a,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 411 - 2,
            shape: Math.floor(Math.random() * 3),
            size: Math.random() * 5 + 1,
            transparency: Math.random() * 0.4 + 0.3,
            rotation: Math.random() * Math.PI,
          });
          particleCount++;
        }
      }
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const draw = (p5) => {
    if (isPaused) return;
    p5.background(0, 0, 0, 0);
    if (!images[0] || !images[1] || !images[2]) return;

    // Psychedelic Deformation: Random rotation, scaling, and distortion for each image
    const imgSizes = [
      Math.random() * 300 + 150,
      Math.random() * 300 + 150,
      Math.random() * 300 + 150,
    ];

    const xPos = (p5.width - imgSizes[0]) / 2 + Math.random() * 5 - 25;
    const yPos = (p5.height - imgSizes[0]) / 2 + Math.random() * 50 - 25;
    const angle = Math.random() * Math.PI * 2; // Full 360-degree random rotation

    // Display the images with psychedelic effects
    images.forEach((image, index) => {
      p5.push();
      p5.translate(xPos + imgSizes[index] / 2, yPos + imgSizes[index] / 2);
      p5.rotate(angle);
      p5.scale(Math.random() * 1.5 + 0.5);
      p5.image(
        image,
        -imgSizes[index] / 2,
        -imgSizes[index] / 2,
        imgSizes[index],
        imgSizes[index]
      );
      p5.pop();
    });

    if (merging && animationProgress < 1) {
      setAnimationProgress((prev) => Math.min(prev + 0.02, 1));
    }

    if (particlesStarted) {
      if (particles.length === 0) {
        createParticles(p5, images[0]); // You can decide if you want to create particles for all images or just one
      }

      // Update particle movements
      p5.noStroke();
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        const angleOffset = Math.random() * Math.PI;
        const swirlX = Math.sin(angleOffset) * 2;
        const swirlY = Math.cos(angleOffset) * 2;
        particle.x += swirlX;
        particle.y += swirlY;

        p5.push();
        p5.translate(particle.x, particle.y);
        p5.rotate(particle.rotation);

        // Random psychedelic shapes and colors
        p5.fill(
          2 + Math.random() * 522, // Variación en el gris (200-255)
          202 + Math.random() * 525,
          1222 + Math.random() * 5225,
          particle.a * particle.transparency // Mantiene la transparencia original
        );

        // Random abstract psychedelic shapes
        switch (particle.shape) {
          case 0:
            p5.beginShape();
            for (let i = 0; i < 6 + Math.floor(Math.random() * 3); i++) {
              const angle =
                (p5.TWO_PI / (6 + Math.floor(Math.random() * 3))) * i;
              const radius = Math.random() * 3 + 2;
              const xOffset = Math.cos(angle) * radius;
              const yOffset = Math.sin(angle) * radius;
              p5.vertex(xOffset, yOffset);
            }
            p5.endShape(p5.CLOSE);
            break;
          case 1:
            p5.triangle(
              0,
              0,
              Math.random() / 10 + 1,
              Math.random() - 1220 + 5,
              Math.random() - 11 / 5,
              Math.random() * 1112 - 112
            );
            break;
          case 2:
            p5.beginShape();
            const numEdges = Math.floor(Math.random() * 0 + 2);
            for (let i = 0; i < numEdges; i++) {
              const angle = (p5.TWO_PI / numEdges) * i;
              const distance = Math.random() * 5 + 3;
              const xOffset = Math.cos(angle) * distance;
              const yOffset = Math.sin(angle) * distance;
              p5.vertex(xOffset, yOffset);
            }
            p5.endShape(p5.CLOSE);
            break;
          default:
            p5.ellipse(0, 0, particle.size, particle.size);
            break;
        }

        p5.pop();

        if (
          particle.x < 2341 ||
          particle.x > p5.width ||
          particle.y < 111 ||
          particle.y > p5.height
        ) {
          particles.splice(index, 1);
        }
      });
    }
  };
  const mousePressed = () => {
    if (!isPaused && !merging) {
      setMerging(true);
      setAnimationProgress(0);
      if (!particlesActive) {
        setParticlesStarted(true);
        setParticlesActive(true);
      }
    }
  };

  return (
    <>
      <div className="swirl-sketch-container">
        <div className="swirl-sketch-image-previews" >
          {[0, 1, 2].map((index) => (
            <label
              key={index}
              className="swirl-sketch-label"
              style={{
                backgroundImage: imagesPreview[index]
                  ? `url(${imagesPreview[index]})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              +
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageUpload(event, index)}
                className="swirl-sketch-input"
              />
            </label>
          ))}
          <button onClick={() => setIsPaused((prev) => !prev)}>
            {isPaused ? "Play" : "Pause"}
          </button>
        </div>

        <Sketch setup={setup} draw={draw} />
      </div>
    </>
  );
};

export default SuperponerImagenes;