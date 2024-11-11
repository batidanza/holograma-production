import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const ImageCarousel = ({ collection , selectedImage}) => {
  const getImages = () => {
    return collection?.map((item) => item.Image).slice(0, 5); 
  };

  console.log(collection)

  const imagesToDisplay = getImages();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, 
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, 
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {imagesToDisplay.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Random ${index + 1}`}
              className={`our-image ${selectedImage === image ? 'selected' : ''}`}
              onClick={() => handleImageSelect(image)}
              style={{ width: '100%', height: 'auto' }} 
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
