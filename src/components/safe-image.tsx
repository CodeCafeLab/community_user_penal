"use client";

import Image, { type ImageProps } from "next/image";
import * as React from "react";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc?: string;
};

export function SafeImage({
  src,
  fallbackSrc = "/images/placeholder.svg",
  onError,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = React.useState(src);

  React.useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={currentSrc}
      onError={(e) => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
        onError?.(e);
      }}
    />
  );
}


