export const keyTyped = (p5, handleUndo, handleSizeChange) => {
    if ((p5.key === "z" || p5.key === "Z") && p5.keyIsDown(91)) {
      handleUndo();
    } else if (p5.key === "U" || p5.key === "u") {
      document.getElementById("imageInput").click();
    } else {
      handleSizeChange(p5.key);
    }
  };
  
  export const keyDown = (event, handleUndo) => {

    if (event.metaKey && event.key === "z") {
      handleUndo();

      event.preventDefault();
    }
  };
  
  export const handleUndo = (imagesHistory, setDrawImage, drawImage) => {

    for (let i = imagesHistory.current.length - 1; i >= 0; i--) {
      if (imagesHistory.current[i].hasOwnProperty("img")) {
        imagesHistory.current.splice(i, 1);
        break;
      }
    }
  
    // Forzar una actualización del componente
    setDrawImage(!drawImage);
  
    console.log(imagesHistory.current);
  };
  
  export const handleSizeChange = (key, setSize) => {
    switch (key) {
      case "1":
        setSize(50);
        break;
      case "2":
        setSize(150);
        break;
      case "3":
        setSize(250);
        break;
      case "4":
        setSize(500);
        break;
      case "5":
        setSize(1050);
        break;
      default:
        break;
    }
  };
  