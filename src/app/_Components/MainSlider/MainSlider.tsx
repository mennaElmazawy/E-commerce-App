"use client";

import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  return (

    <div className="flex w-3/4 my-5 flex-col md:flex-row md:w-1/3 mx-auto">
      <div className=" md:w-1/2 m-3 md:m-0">
        <Slider {...settings}>
          <div>
            <Image
              src="/images/bag.jpg"
              alt="img1"
              width={100}
              height={100}
              className="w-full  object-cover"
            />
          </div>
          <div>
            <Image
              src="/images/seat.jpg"
              alt="img2"
              width={100}
              height={100}
              className="w-full  object-cover"
            />
          </div>
          <div>
            <Image
              src="/images/rings.jpg"
              alt="img3"
              width={100}
              height={100}
              className="w-full  object-cover"
            />
          </div>
        </Slider>
      </div>
      <div className="md:w-1/2 m-4 md:m-0 flex flex-col">
        <div className="h-1/2">
          <Image
            src="/images/bagsss.jpg"
            alt="img4"
            width={100}
            height={100}
            className="w-full  object-cover"
          />
        </div>
        <div className="h-1/2">
          <Image
            src="/images/music.jpg"
            alt="img5"
            width={100}
            height={100}
            className="w-full  object-cover"
          />
        </div>
      </div>
    </div>
  );
}
