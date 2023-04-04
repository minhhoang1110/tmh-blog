import * as prismicH from "@prismicio/helpers";
import { PrismicRichText, SliceLike } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Bounded from "../../components/Bounded";
import React from "react";
import { SliceProps } from "@/types";

const Image: React.FC<SliceProps> = ({ slice }) => {
  const image = slice.primary.image;

  return (
    <Bounded as="section" size={slice.variation === "wide" ? "widest" : "base"}>
      <figure className="grid grid-cols-1 gap-4">
        {prismicH.isFilled.image(image) && (
          <div className="bg-gray-100">
            <PrismicNextImage
              field={image}
              sizes="100vw"
              className="w-full"
              priority={true}
              width={300}
              height={300}
              alt=""
            />
          </div>
        )}
        {prismicH.isFilled.richText(slice.primary.caption) && (
          <figcaption className="font-serif text-center italic tracking-tight text-slate-500">
            <PrismicRichText field={slice.primary.caption} />
          </figcaption>
        )}
      </figure>
    </Bounded>
  );
};

export default Image;
