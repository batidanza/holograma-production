import { setP5Instance } from "./P5Instance";
import pencilIcon from "../../../../../assets/icons/pencil_icon.svg"


export const setup = (p5, canvasParentRef) => {
  setP5Instance(p5); // Guardamos la instancia de p5

  const updateCanvasSize = () => {
    let canvasWidth = Math.min(window.innerWidth * 0.8, 1024); // 80% del ancho, máximo 1024px
    let canvasHeight = canvasWidth * (1.9 / 3); // Mantiene la relación de aspecto 1.9:3

    if (window.innerHeight < 1060) {
      let canvasWidth = Math.min(window.innerWidth * 0.8, 1024); // 80% del ancho, máximo 1024px
      canvasHeight = window.innerHeight * 0.75; // 7.5% of the window height

    }
    // En pantallas pequeñas
    if (window.innerWidth < 980) {
      canvasWidth = window.innerWidth; 
      canvasHeight = window.innerHeight * 0.7; 
    }

    p5.resizeCanvas(canvasWidth, canvasHeight);
  };

  const canvas = p5.createCanvas(1, 1); 
  canvas.parent(canvasParentRef);

  canvas.id("drawingCanvas");
  
  updateCanvasSize(); 

  // Estilos para el canvas
  canvas.style("display", "block");
  canvas.style("margin", "auto");
  canvas.style("user-select", "none");
  canvas.style("touch-action", "none");
  canvas.style("border", "1.5px dashed whitesmoke");  // Aumentar el grosor del borde
  canvas.style("border-spacing", "10px");  canvas.style("padding", "10px");
  canvas.style("border-radius", "6px");  canvas.style("padding", "10px");


  // Establecer fuente
  p5.textFont("Array");

  // Manejar eventos táctiles
  canvas.elt.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );

  p5.frameRate(60);

  window.addEventListener("resize", updateCanvasSize);
};


export const windowResized = (p5) => {
  let canvasWidth = Math.min(window.innerWidth * 0.8, 1024);
  let canvasHeight = canvasWidth * (1.9 / 3);

  if (window.innerWidth < 780) {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight * 0.9;
  }

  p5.resizeCanvas(canvasWidth, canvasHeight);
};

let p5Instance = null;

export const draw = (
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
  eraserMode,
  particleMode
) => {
  p5.background(245, 245, 245);
  
  p5.cursor(eraserMode ? "crosshair" : "default");

  if (showInstructions) {
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(30);
    p5.textFont("IBM Plex Sans");

    const fadeInDuration = 120;
    const fadeOutDuration = 120;
    const totalDuration = fadeInDuration + fadeOutDuration;

    let alpha = 255;
    const cyclePosition = p5.frameCount % totalDuration;
    if (cyclePosition < fadeInDuration) {
      alpha = p5.lerp(0, 255, cyclePosition / fadeInDuration);
    } else {
      const fadeOutPosition = cyclePosition - fadeInDuration;
      alpha = p5.lerp(255, 0, fadeOutPosition / fadeOutDuration);
    }

    const instructionText =
      "✨ Choose an image, press and hold the mouse to drag and paint the image over the canvas ✨";

    const wrappedText = wrapText(instructionText, p5.width - 40, p5);

    p5.fill(4, 3, 17, alpha);
    const lineHeight = 40;
    wrappedText.forEach((line, index) => {
      p5.text(line, p5.width / 2, p5.height / 2 + index * lineHeight);
    });
  }

  function wrapText(text, maxWidth, p5) {
    const words = text.split(" ");
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = p5.textWidth(currentLine + " " + word);
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  // Si está en modo borrador y el mouse está presionado, eliminar imágenes cercanas
if (eraserMode && p5.mouseIsPressed) {
  // Elimina imágenes cercanas al mouse
  imagesHistory.current = imagesHistory.current.filter(({ x, y, width, height }) => {
    const d = p5.dist(p5.mouseX, p5.mouseY, x, y);
    return d > Math.max(width, height) * 0.3; // Borra si está cerca
  });
}

  // Dibuja las imágenes históricas con efecto de partículas si está activado
  for (let i = 0; i < imagesHistory.current.length; i++) {
    const { img, x, y, width, height } = imagesHistory.current[i];
    if (particleMode) {
      // Dibuja la imagen como partículas lineales
      for (let px = 0; px < width; px += 4) {
        for (let py = 0; py < height; py += 4) {
          let pixelColor = img.get(px * (img.width/width), py * (img.height/height));
          if (pixelColor[0] + pixelColor[1] + pixelColor[2] > 200) { // Si el pixel es claro
            p5.stroke(0);
            p5.strokeWeight(1);
            p5.line(
              x - width/2 + px, 
              y - height/2 + py,
              x - width/2 + px, 
              y - height/2 + py + 3
            );
          }
        }
      }
    } else {
      p5.image(img, x - width/2, y - height/2, width, height);
    }
  }

  // Dibuja la imagen del usuario si está habilitado
  if (!eraserMode && drawImage && userImage && p5.mouseIsPressed) {
    const currentImage = {
      img: userImage,
      x: p5.mouseX,
      y: p5.mouseY,
      width: userImage.width * (size / userImage.width),
      height: userImage.height * (size / userImage.width),
    };
    imagesHistory.current.push(currentImage);
    if (!printedFirstImage) {
      setShowSecondInstruction(false);
      setPrintedFirstImage(true);
    }
  }
};



export const saveSketch = () => {
  if (p5Instance) {
    p5Instance.saveCanvas("my-drawing", "png");
  }
};
