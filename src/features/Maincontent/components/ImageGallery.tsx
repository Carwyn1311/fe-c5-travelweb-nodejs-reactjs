import React from 'react';
import { DestinationImage } from '../Content/DestinationTypes';

interface ImageGalleryProps {
  images: DestinationImage[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  return (
    <>
      {images.map((image, index) => (
        <img key={index} src={`${baseUrl}${image.image_url}`} alt="Destination" className="destination-image" />
      ))}
    </>
  );
};

export default ImageGallery;
