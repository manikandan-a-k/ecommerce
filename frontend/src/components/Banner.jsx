import React, { useEffect, useState } from "react";
import bannerImage from "../assets/banner/image.js";



const Banner = () => {
  const desktopImages = [
    bannerImage.webBan1,
    bannerImage.webBan2
  ];

  let [currentImage, setCurrentImage] = useState(0);
  const handleImagePrevSlider = () => {
    if (currentImage != 0) {
      setCurrentImage(currentImage - 1);
    }
  };
  const handleImageNextSlider = () => {
    setCurrentImage((prevImage) =>
      prevImage < desktopImages.length - 1 ? prevImage + 1 : 0
    );
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      handleImageNextSlider();
    }, 3000);
  
    return () => clearInterval(interval);
  }, [currentImage, desktopImages.length]);
  
  return (
    <div className="mx-auto container px-4 mt-5">
      <div className=" h-[25vh] relative md:h-[75vh] bg-slate-200 w-full  rounded">
      
        {/* Desktop and Tablet Banner */}
        <div className="w-full h-full flex overflow-hidden">
          {desktopImages.map((imageURL) => {
            return (
              <div
                className="min-w-full min-h-full transition-all"
                key={imageURL}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={imageURL} className="h-full w-full sm:object-fit " />
              </div>
            );
          })}
        </div>
        {/* Mobile Banner */}
        
      </div>
    </div>
  );
};

export default Banner;
