import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices";
import Layout from "../components/Layout";
import { GetStaticPropsContext } from "next";
import { Navigation, Page, Setting } from "@/types";
import React from "react";

interface Props {
  page: Page;
  navigation: Navigation;
  settings: Setting;
}
const Page: React.FC<Props> = ({ page, navigation, settings }) => {
  return (
    <Layout navigation={navigation} settings={settings}>
      <Head>
        <title>
          {prismicH.asText(page.data.title)} |{" "}
          {prismicH.asText(settings.data.name)}
        </title>
      </Head>
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({
  params,
  previewData,
}: GetStaticPropsContext) {
  const client = createClient({ previewData });
  const page: Page = await client.getByUID(
    "page",
    (params && (params.uid as string)) || ""
  );
  const navigation: Navigation = (await client.getSingle(
    "navigation"
  )) as Navigation;
  const settings: Setting = (await client.getSingle("settings")) as Setting;

  return {
    props: {
      page,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return {
    paths: pages.map((page) => prismicH.asLink(page)),
    fallback: false,
  };
}
