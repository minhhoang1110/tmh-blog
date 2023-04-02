export interface ChildrenNode {
  children: ReactNode;
}
export interface ChildrenNodeData {
  children: ReactNode;
  node: any;
}
export interface PrismicBaseSection {
  alternate_languages: any[];
  first_publication_date: any;
  href: string;
  id: string;
  lang: string;
  last_publication_date: any;
  linked_documents: any[];
  slugs: string[];
  tags: string[];
  type: string;
  uid: string;
  url: string;
}
export type AsProps = {
  [K in keyof JSX.IntrinsicElements]: { as: K } & JSX.IntrinsicElements[K];
}[keyof JSX.IntrinsicElements];
declare module JSX {
  interface IntrinsicElements {
    [Comp: string]: any;
  }
}
interface SliceProps {
  slice: any;
}
