import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";

import { getExcerpt } from "../../lib/getExcerpt";
import { findFirstImage } from "../../lib/findFirstImage";
import { dateFormatter } from "../../lib/dateFormatter";
import Heading from "../Heading";
import React from "react";
import { Acticle } from "@/types";
import { EmptyImageFieldImage, FilledImageFieldImage } from "@prismicio/types";
interface Props {
  article: Acticle;
}
const Article: React.FC<Props> = ({ article }) => {
  const featuredImage: EmptyImageFieldImage | FilledImageFieldImage | null =
    (prismicH.isFilled.image(article.data.featuredImage) &&
      article.data.featuredImage) ||
    findFirstImage(article.data.slices);
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );
  const excerpt = getExcerpt(article.data.slices);

  return (
    <li className="grid grid-cols-1 items-start gap-6 border-b-1 border-solid border-gray-200 md:grid-cols-3 md:gap-8">
      <PrismicLink
        document={article}
        tabIndex={-1}
        aria-label={prismicH.asText(article.data.title) || ""}
      >
        <div className="aspect-w-4 aspect-h-3 relative bg-gray-100">
          {prismicH.isFilled.image(featuredImage) && (
            <PrismicNextImage
              field={featuredImage}
              fill={true}
              className="object-cover"
              priority={true}
              width={360}
              height={270}
              alt=""
            />
          )}
        </div>
      </PrismicLink>
      <div className="grid grid-cols-1 gap-3 md:col-span-2">
        <Heading as="h2">
          <PrismicLink
            document={article}
            aria-label={prismicH.asText(article.data.title) || ""}
          >
            <PrismicText field={article.data.title} />
          </PrismicLink>
        </Heading>
        <p className="font-serif italic tracking-tighter text-slate-500">
          {dateFormatter.format(date || new Date())}
        </p>
        {excerpt && (
          <p className="font-serif leading-relaxed md:text-lg md:leading-relaxed">
            {excerpt}
            <PrismicLink
              document={article}
              className="ml-1.5 italic underline"
              aria-label={prismicH.asText(article.data.title) || ""}
            >
              Đọc tiếp
            </PrismicLink>
          </p>
        )}
      </div>
    </li>
  );
};
export default Article;
