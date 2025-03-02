export const setup = (p5, canvasParentRef) => {
  let canvasWidth = Math.min(window.innerWidth * 0.8, 1024);
  let canvasHeight = canvasWidth * (1.9 / 3);

  if (window.innerWidth < 780) {
    canvasWidth = window.innerWidth; // Ocupa todo el ancho
    canvasHeight = window.innerHeight * 0.9; // Ajusta altura para mejor proporción
  }
  const canvas = p5.createCanvas(canvasWidth, canvasHeight);
  canvas.parent(canvasParentRef);

  canvas.style("display", "block");
  canvas.style("margin", "auto");
  canvas.style("user-select", "none");
  canvas.style("touch-action", "none");
  p5.textFont("Array");

  canvas.elt.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );

  p5.background(255, 215, 235);
  p5.frameRate(60);
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
  eraserMode
) => {
  p5.background(255);
  p5Instance = p5;

  // Cambia el cursor según el modo borrador
  p5.cursor(eraserMode ? "crosshair" : "default");

  const alpha = p5.map(Math.sin(p5.frameCount * 0.1), -1, 1, 50, 255); 

  if (showInstructions) {
    p5.fill(4, 3, 17, alpha);
    p5.textAlign(p5.CENTER);
    const instructionTextSize = p5.width < 600 ? 18 : 30;
    p5.textSize(instructionTextSize);
    p5.textFont("Array");
    const instructionText = "✨ Choose an image, then print it by dragging the mouse over the canvas ✨";
    p5.text(instructionText, p5.width / 2, p5.height / 2 + instructionTextSize / 2);
  } else if (showSecondInstruction && !printedFirstImage && imagesHistory.current.length === 0) {
    p5.fill(4, 3, 17, alpha);
    p5.textAlign(p5.CENTER);
    const instructionTextSize = p5.width < 600 ? 18 : 30;
    p5.textSize(instructionTextSize);
    p5.textFont("Array");
    const instructionText = "👆 Press and hold the mouse to drag and paint the image on the canvas.  🎨";
    p5.text(instructionText, p5.width / 2, p5.height / 2 + instructionTextSize / 2);
  }

  for (let i = 0; i < imagesHistory.current.length; i++) {
    const { img, x, y, width, height } = imagesHistory.current[i];
    p5.image(img, x - width / 2, y - height / 2, width, height);
  }

  if (drawImage && userImage && p5.mouseIsPressed) {
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
