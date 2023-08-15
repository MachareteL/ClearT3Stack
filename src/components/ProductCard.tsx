import Image from "next/image";
import React from "react";

export default function ProductCard({
  name,
  category,
  description,
  imageUrl,
  price,
}: Product) {
  return (
    <div className="mt-12 w-80 overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg">
      <Image
        src={imageUrl}
        alt=""
        width={200}
        height={200}
        loading="lazy"
        placeholder="blur"
        blurDataURL="https://via.placeholder.com/150"
        className="h-64 w-full object-contain object-center"
      />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-medium text-gray-900 ">{name}</h2>
        <p className="300 mb-2 text-base text-gray-700">{description}</p>
        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold text-gray-900">${price}</p>
          <p className="300  text-base font-medium text-gray-500 line-through">
            ${price + price * 0.2}
          </p>
          <p className="ml-auto text-base font-medium text-green-500">
            20% off
          </p>
        </div>
      </div>
    </div>
    // <div className="flex flex-col justify-between px-4 py-6 shadow-md">
    //   <Image src={imageUrl} alt="" width={200} height={200} loading="eager" />
    //   <div>
    //     <h1>{name}</h1>
    //   </div>
    // </div>
  );
}
