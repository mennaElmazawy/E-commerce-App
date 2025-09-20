"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function ProductSlider({ images }: { images: string[] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  
  };
  return (
    <div className="grid grid-cols-12 my-6">
      <div className="col-span-10">
        <Slider {...settings}>
          {images.map((image) => {
            return (
              <div key={image}>
                <Image
                  src={image}
                  alt="img1"
                  width={1000}
                  height={1000}
                  className="w-full h-96 object-cover"
                />
              </div>
            );
          })}
        </Slider>
      </div>
      
    </div>
  );
}
