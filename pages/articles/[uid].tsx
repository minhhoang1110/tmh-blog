import Head from "next/head";
import { PrismicLink, PrismicText, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import Layout from "../../components/Layout";
import Bounded from "../../components/Bounded";
import Heading from "../../components/Heading";
import HorizontalDivider from "../../components/HorizontalDivider";
import { GetStaticPropsContext } from "next";
import { Acticle, Navigation, Setting } from "@/types";
import React from "react";

interface LatestArticleProps {
  article: Acticle;
}
interface ActicleProps {
  article: Acticle;
  latestArticles: Acticle[];
  navigation: Navigation;
  settings: Setting;
}
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const LatestArticle: React.FC<LatestArticleProps> = ({ article }) => {
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );

  return (
    <li>
      <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
        <PrismicLink document={article}>
          <PrismicText field={article.data.title} />
        </PrismicLink>
      </h1>
      <p className="font-serif italic tracking-tighter text-slate-500">
        {dateFormatter.format(date || new Date())}
      </p>
    </li>
  );
};

const Article: React.FC<ActicleProps> = ({
  article,
  latestArticles,
  navigation,
  settings,
}) => {
  const date = prismicH.asDate(
    article.data.publishDate || article.first_publication_date
  );

  return (
    <Layout
      withHeaderDivider={false}
      withProfile={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>
          {prismicH.asText(article.data.title)} |{" "}
          {prismicH.asText(settings.data.name)}
        </title>
      </Head>
      <Bounded>
        <PrismicLink
          href="/"
          className="font-semibold tracking-tight text-slate-400"
        >
          &larr; Back to articles
        </PrismicLink>
      </Bounded>
      <article>
        <Bounded className="pb-0">
          <h1 className="mb-3 text-3xl font-semibold tracking-tighter text-slate-800 md:text-4xl">
            <PrismicText field={article.data.title} />
          </h1>
          <p className="font-serif italic tracking-tighter text-slate-500">
            {dateFormatter.format(date || new Date())}
          </p>
        </Bounded>
        <SliceZone slices={article.data.slices} components={components} />
      </article>
      {latestArticles.length > 0 && (
        <Bounded>
          <div className="grid grid-cols-1 justify-items-center gap-16 md:gap-24">
            <HorizontalDivider />
            <div className="w-full">
              <Heading size="2xl" className="mb-10">
                Latest articles
              </Heading>
              <ul className="grid grid-cols-1 gap-12">
                {latestArticles.map((article) => (
                  <LatestArticle key={article.id} article={article} />
                ))}
              </ul>
            </div>
          </div>
        </Bounded>
      )}
    </Layout>
  );
};

export default Article;

export async function getStaticProps({
  params,
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const article: Acticle = (await client.getByUID(
    "article",
    (params && (params.uid as string)) || ""
  )) as Acticle;
  const latestArticles: Acticle[] = (await client.getAllByType("article", {
    limit: 3,
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  })) as Acticle[];
  const navigation: Navigation = (await client.getSingle(
    "navigation"
  )) as Navigation;
  const settings: Setting = (await client.getSingle("settings")) as Setting;

  return {
    props: {
      article,
      latestArticles,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const articles = await client.getAllByType("article");

  return {
    paths: articles.map((article) => prismicH.asLink(article)),
    fallback: false,
  };
}
