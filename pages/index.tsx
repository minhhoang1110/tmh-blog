import Head from "next/head";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import Layout from "../components/Layout";
import Bounded from "../components/Bounded";
import Article from "../components/Article";
import React from "react";
import { Acticle, Navigation, Setting } from "@/types";
import { GetStaticPropsContext } from "next/types";
interface Props {
  articles: Acticle[];
  navigation: Navigation;
  settings: Setting;
}
const Index: React.FC<Props> = ({ articles, navigation, settings }) => {
  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(settings.data.name)}</title>
      </Head>
      <Bounded size="widest">
        <ul className="grid grid-cols-1 gap-16">
          {articles.map((article) => (
            <Article key={article.id} article={article} />
          ))}
        </ul>
      </Bounded>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }: GetStaticPropsContext) {
  const client = createClient({ previewData });

  const articles: Acticle[] = (await client.getAllByType("article", {
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
      articles,
      navigation,
      settings,
    },
  };
}
