export const mousePressed = (p5, imagesHistory, userImage, setShowSecondInstruction, setPrintedFirstImage, setShowInstructions, size) => {
    const canvasX = p5.width / 2;
    const canvasY = p5.height / 2;
  
    if (
      p5.mouseX > canvasX - p5.width / 2 &&
      p5.mouseX < canvasX + p5.width / 2 &&
      p5.mouseY > canvasY - p5.height / 2 &&
      p5.mouseY < canvasY + p5.height / 2
    ) {
      if (userImage) {
        const currentImage = {
          img: userImage,
          x: p5.mouseX,
          y: p5.mouseY,
          width: userImage.width * (size / userImage.width),
          height: userImage.height * (size / userImage.width),
        };
        imagesHistory.current.push(currentImage);
        setShowSecondInstruction(false);
        setPrintedFirstImage(true);
        setShowInstructions(false);
      }
    }
  };
  
  export const mouseDragged = (p5, imagesHistory, userImage, setShowSecondInstruction, setPrintedFirstImage, setShowInstructions, size) => {
    const canvasX = p5.width / 2;
    const canvasY = p5.height / 2;
  
    if (
      p5.mouseX > canvasX - p5.width / 2 &&
      p5.mouseX < canvasX + p5.width / 2 &&
      p5.mouseY > canvasY - p5.height / 2 &&
      p5.mouseY < canvasY + p5.height / 2
    ) {
      if (userImage) {
        const currentImage = {
          img: userImage,
          x: p5.mouseX,
          y: p5.mouseY,
          width: userImage.width * (size / userImage.width),
          height: userImage.height * (size / userImage.width),
        };
        imagesHistory.current.push(currentImage);
        setShowSecondInstruction(false);
        setPrintedFirstImage(true);
        setShowInstructions(false);
      }
    }
  };
  