
"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { BrandsData, SpecificBrand } from "src/types/Brands.type";
import ReactModal from "react-modal";
import { Button } from "src/components/ui/button";

export default function BrandCard({ brand }: { brand: BrandsData }) {
  const { image, name, slug, _id } = brand;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [specificBrand, setSpecificBrand] = useState<BrandsData>();
  if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

  function closeModal() {
    setIsOpen(false);
  }
  async function openModal() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands/${_id}`
    );
    const data: SpecificBrand = await res.json();
    setSpecificBrand(data.data);
    setIsOpen(true);
  }

  return (
    <div>
      
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="relative bg-white p-4 rounded-lg w-80 md:w-[500px] mx-auto outline-none"
        overlayClassName="fixed inset-0 bg-gray-500/50 z-90 flex items-center justify-center"
      >
        
        <span className="flex justify-end cursor-pointer" onClick={closeModal}>
          <i className="fa-solid fa-close "></i>
          
        </span>

        
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex flex-col w-1/2">
            <p className="mt-3 text-[calc(1.375rem+1.5vw)] font-semibold text-main" >
              {specificBrand?.name}
            </p>
            <p className="mt-3  font-semibold">
              {specificBrand?.slug}
            </p>
          </div>
          <Image
            src={specificBrand?.image || ""}
            alt={name}
            width={400}
            height={300}
            className=" h-48 md:w-1/2  rounded"
          />
          
        </div>
        <div className="flex justify-end">
          <Button className="bg-gray-500 cursor-pointer hover:bg-gray-600" onClick={closeModal}> Close </Button>
        </div>
        
      </ReactModal>

      
      <div onClick={openModal}>
        <Card className="bg-gray py-0 gap-0 hover:shadow-[1px_1px_10px_#4fa74f] transition-all duration-500">
          <CardContent className="px-0">
            <Image
              src={image}
              alt={name}
              width={100}
              height={300}
              className="w-full max-w-full  "
            />
          </CardContent>
          <CardFooter className="p-5">
            <CardTitle className=" mx-auto text-[16px]">
              {name}
            </CardTitle>
          </CardFooter>
          
        </Card>
      </div>
    </div>
  );
}
