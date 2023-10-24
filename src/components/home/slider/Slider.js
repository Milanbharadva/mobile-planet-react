// src/components/Slider.js

import React, { useState } from "react";

const images = ["apple.jpg", "samsung.jpg", "oneplus.jpg"];

const Slider2 = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="w-full max-w-screen-lg mx-auto">
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-300 transform"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  src={`${window.location.origin}/assets/slider/${image}`}
                  alt={` ${index}`}
                  className="w-full lg:h-[500px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
        <button
          onClick={prevImage}
          className="p-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full focus:outline-none"
        >
          Previous
        </button>
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 right-4">
        <button
          onClick={nextImage}
          className="p-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Slider2;
