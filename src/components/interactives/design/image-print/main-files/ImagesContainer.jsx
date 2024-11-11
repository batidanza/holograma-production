import React, { useEffect, useState } from "react";
import { getPhotoByArchive } from "../../../../../services/ArchiveAPI";
import LoadingSketch from "../../../../layout/Loading/LoadingSketch";

const ImagesContainer = ({ selectedImage, handleImageSelect }) => {
  const [collection, setCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhotoCollection = async () => {
      try {
        const data = await getPhotoByArchive("print-images");
        setCollection(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setIsLoading(false); 
      }
    };
    fetchPhotoCollection();
  }, []);

  const getImages = () => {
    return collection?.map((item) => item.Image);
  };

  const imagesToDisplay = getImages();


  return (
    <div className="all-images-container">
      {isLoading && <LoadingSketch />} 
      {!isLoading && imagesToDisplay.length > 0 && imagesToDisplay.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Random ${index + 1}`}
            className={`our-image ${selectedImage === image ? "selected" : ""}`}
            onClick={() => handleImageSelect(image)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesContainer;
