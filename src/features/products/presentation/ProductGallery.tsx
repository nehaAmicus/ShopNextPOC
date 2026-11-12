"use client";
import Image from "next/image";
import { useState } from "react";

interface Props {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images.length) {
    return <div className="aspect-square rounded-xl bg-gray-100" />;
  }

  return (
    <div className="space-y-4">
      <div className="relative flex aspect-square items-center justify-center rounded-xl bg-gray-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src={images[selectedIndex]}
          alt={title}

          width={400}
          height={400}
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setSelectedIndex(index)}
            className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
              selectedIndex === index ? "border-black" : "border-gray-200"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`${title} ${index + 1}`}
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
