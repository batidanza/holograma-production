export const setup = (p5, canvasParentRef) => {
  let canvasWidth = Math.min(window.innerWidth * 0.8, 1024);
  let canvasHeight = canvasWidth * (1.9 / 3);

  if (window.innerWidth < 780) {
    canvasWidth = window.innerWidth * 0.65;
    canvasHeight = window.innerHeight * 0.9;
  }

  const canvas = p5.createCanvas(canvasWidth, canvasHeight);
  canvas.parent(canvasParentRef);

  canvas.style("display", "block");
  canvas.style("margin", "auto");
  canvas.style("user-select", "none");
  canvas.style("touch-action", "none");
  canvas.style("border-radius", "10px");
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
  eraserMode // Added: Eraser mode
) => {
  p5.background(255);

  p5Instance = p5;
  // Set cursor style based on eraser mode
  if (eraserMode) {
    p5.cursor("crosshair");
  } else {
    p5.cursor("default");
  }

  // Display instructions if needed
  if (showInstructions) {
    if (p5.frameCount % 30 < 15) {
      p5.fill(0);
      p5.textAlign(p5.CENTER);
      const instructionTextSize = p5.width < 600 ? 20 : 35;
      p5.textSize(instructionTextSize);
      p5.textFont("Array");
      p5.fill(0, 0, 0);
      const instructionText = "PRESS U TO LOAD IMAGES";
      p5.text(
        instructionText,
        p5.width / 2,
        p5.height / 2 + instructionTextSize / 2
      );
    }
  } else {
    // Display secondary instruction if needed
    if (
      showSecondInstruction &&
      !printedFirstImage &&
      imagesHistory.current.length === 0
    ) {
      if (p5.frameCount % 30 < 15) {
        p5.fill(0);
        p5.textAlign(p5.CENTER);
        const instructionTextSize = p5.width < 600 ? 20 : 35;
        p5.textSize(instructionTextSize);
        p5.textFont("Array");
        const instructionText = "CLICK INSIDE THE CANVAS";
        p5.text(
          instructionText,
          p5.width / 2,
          p5.height / 2 + instructionTextSize / 2
        );
      }
    }

    // Draw all images from history
    for (let i = 0; i < imagesHistory.current.length; i++) {
      const { img, x, y, width, height } = imagesHistory.current[i];
      p5.image(img, x - width / 2, y - height / 2, width, height);
    }

    // Draw new image if needed
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
  }
};

export const saveSketch = () => {
  if (p5Instance) {
    p5Instance.saveCanvas("my-drawing", "png");
  }
};
