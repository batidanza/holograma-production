export const setup = (p5, canvasParentRef) => {
  // Calculate canvas dimensions
  let canvasWidth = Math.min(window.innerWidth * 0.8, 1024); // 80% of the window width or 1024px, whichever is smaller
  let canvasHeight = canvasWidth * (1.9 / 3);

  if (window.innerWidth < 780) {
    canvasWidth = window.innerWidth * 0.65; 
    canvasHeight = window.innerHeight * 0.9; 
  }

  // Create canvas and set parent
  const canvas = p5.createCanvas(canvasWidth, canvasHeight);
  canvas.parent(canvasParentRef);

  // Apply CSS styles to canvas
  canvas.style("display", "block");
  canvas.style("margin", "auto");
  canvas.style("user-select", "none");
  canvas.style("touch-action", "none");
  canvas.style("border", "2px solid black"); 
  canvas.style("border-radius", "10px"); 
  p5.textFont("Array");

  // Add touch event listener
  canvas.elt.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );

  // Set canvas background and frame rate
  p5.background(255, 215, 235);
  p5.frameRate(60);
};

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
