import * as prismicT from "@prismicio/types";
import type { SliceZoneLike } from "@prismicio/react/dist/SliceZone";
import { PrismicBaseSection } from "./base";
interface Dimension {
  width: number;
  height: number;
}
interface FeatureImage {
  alt: string;
  copyright: string;
  dimensions: Dimension;
  url: string;
}

interface ActicleData {
  featuredImage: FeatureImage;
  publishDate: string;
  slices?: SliceZoneLike;
  title?: prismicT.RichTextField | null;
}
export interface Acticle extends PrismicBaseSection {
  data: ActicleData;
}
interface NavigationLink {
  label?: prismicT.RichTextField | null;
  link?: prismicT.LinkField | null;
}
interface NavigationData {
  homepageLabel?: prismicT.RichTextField | null;
  links: NavigationLink[];
}
export interface Navigation extends PrismicBaseSection {
  data: NavigationData;
}
interface SettingData {
  name?: prismicT.RichTextField | null;
  description?: prismicT.RichTextField | null;
  newsletterDescription?: prismicT.RichTextField | null;
  newsletterDisclaimer?: prismicT.RichTextField | null;
  profilePicture?: FeatureImage;
}
export interface Setting extends PrismicBaseSection {
  data: SettingData;
}
