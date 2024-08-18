export const handleButtonClick = () => {
    document.getElementById("imageInput").click();
  };
  
  export const handleImageClick = (p5, image, size, setUserImage, imagesHistory, setShowSecondInstruction, setPrintedFirstImage, setShowInstructions) => {
    const canvasX = p5.mouseX - p5.width / 2;
    const canvasY = p5.mouseY - p5.height / 2;
    const imageSize = size / 2; // Tamaño de la imagen dividido por 2 para centrarla correctamente
  
    const img = p5.loadImage(image, () => {
      if (img.width !== 0 && img.height !== 0) {
        setUserImage(img);
        const currentImage = {
          img: img,
          x: canvasX - imageSize, // Ajustar la posición en función del tamaño de la imagen
          y: canvasY - imageSize, // Ajustar la posición en función del tamaño de la imagen
          width: img.width * (size / img.width),
          height: img.height * (size / img.width),
        };
        imagesHistory.current.push(currentImage);
        setShowSecondInstruction(false);
        setPrintedFirstImage(true);
        setShowInstructions(false);
      } else {
        console.error("Error loading image.");
      }
    });
  };
  