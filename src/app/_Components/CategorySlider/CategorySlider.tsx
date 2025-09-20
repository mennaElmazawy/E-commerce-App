
"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import { category } from "src/types/categories.type";

export default function CategorySlider({
  categoryList,
}: {
  categoryList: category[];
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <div className=" ">
      <div className=" ">
        <Slider {...settings}>
          {categoryList.map((Category) => (
            <div key={Category._id}>
              <div>
                <Image
                  alt={Category.name}
                  src={Category.image}
                  width={100}
                  height={100}
                  className="object-fit w-full  h-[250px] "
                />
              </div>
              <p className="text-center text-2xl">{Category.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
