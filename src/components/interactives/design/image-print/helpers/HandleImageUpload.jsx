export const handleImageUpload = (p5, e, setUserImage, setShowInstructions, setDrawImage, setShowSecondInstruction, imgRef) => {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = p5.loadImage(reader.result, () => {
          setUserImage(img);
          setShowInstructions(false);
          setDrawImage(true);
          setShowSecondInstruction(true);
          openFullscreen();
        });
        imgRef.current = img;
      };
      reader.readAsDataURL(file);
    }
  };
  
  
  export const openFullscreen = () => {
    const canvas = document.getElementById("drawingCanvas");
    if (!canvas) {
      console.error("No se encontró el canvas de dibujo");
      return;
    }
    try {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
      } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
      }
    } catch (error) {
      console.error("Error requesting fullscreen:", error);
    }
};

