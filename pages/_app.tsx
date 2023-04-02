import Link from "next/link";
import type { AppProps } from "next/app";
import { PrismicLink, PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";

import { repositoryName } from "../prismicio";
import Heading from "../components/Heading";

import "../styles/globals.css";
import type { ChildrenNode, ChildrenNodeData } from "@/types";

const richTextComponents = {
  heading1: ({ children }: ChildrenNode) => (
    <Heading as="h2" size="3xl" className="mb-7 mt-12 first:mt-0 last:mb-0">
      {children}
    </Heading>
  ),
  heading2: ({ children }: ChildrenNode) => (
    <Heading as="h3" size="2xl" className="mb-7 last:mb-0">
      {children}
    </Heading>
  ),
  heading3: ({ children }: ChildrenNode) => (
    <Heading as="h4" size="xl" className="mb-7 last:mb-0">
      {children}
    </Heading>
  ),
  paragraph: ({ children }: ChildrenNode) => (
    <p className="mb-7 last:mb-0">{children}</p>
  ),
  oList: ({ children }: ChildrenNode) => (
    <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
  ),
  oListItem: ({ children }: ChildrenNode) => (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  list: ({ children }: ChildrenNode) => (
    <ul className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ul>
  ),
  listItem: ({ children }: ChildrenNode) => (
    <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  preformatted: ({ children }: ChildrenNode) => (
    <pre className="mb-7 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }: ChildrenNode) => (
    <strong className="font-semibold">{children}</strong>
  ),
  hyperlink: ({ children, node }: ChildrenNodeData) => (
    <PrismicLink
      field={node.data}
      className="underline decoration-1 underline-offset-2"
    >
      {children}
    </PrismicLink>
  ),
};
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <PrismicProvider
      internalLinkComponent={(props) => <Link {...props} />}
      richTextComponents={richTextComponents}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
  );
};
export default App;
