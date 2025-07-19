import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductImage } from '../types/product';

interface GalleryProps {
  images: ProductImage[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden border border-gray-200">
        <img
          src={images[selectedImageIndex].url}
          alt={images[selectedImageIndex].alt}
          className="w-full h-full object-contain p-4"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                index === selectedImageIndex
                  ? 'border-blue-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 