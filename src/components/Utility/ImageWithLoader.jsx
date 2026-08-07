"use client";
import React, { useState } from 'react';
import Image from 'next/image';

export default function ImageWithLoader({
  src,
  alt = "Image",
  fill = false,
  width,
  height,
  className = "",
  sizes,
  priority = false,
  unoptimized = true,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''}`}>
      {/* Loading Skeleton & Spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center z-10">
          <div className="w-6 h-6 rounded-full border-2 border-red-600/30 border-t-red-600 animate-spin"></div>
        </div>
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
}
