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
    <div className="flex flex-col justify-between px-4 py-6 shadow-md">
      <Image src={imageUrl} alt="" width={200} height={200} loading="eager" />
      <div>
        <h1>{name}</h1>
      </div>
    </div>
  );
}
