import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import { PreviewData } from "next";
import sm from "./sm.json";
/**
 * The project's Prismic repository name.
 */
export const repositoryName: string = prismic.getRepositoryName(sm.apiEndpoint);

/**
 * The project's Prismic Route Resolvers. This list determines a Prismic document's URL.
 *
 * @type {prismic.ClientConfig['routes']}
 */
interface Route {
  type: string;
  path: string;
}
const routes: Route[] = [
  {
    type: "article",
    path: "/articles/:uid",
  },
  {
    type: "page",
    path: "/:uid",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - A configuration object to
 */
interface ClientConfig {
  previewData?: PreviewData;
  req?: prismic.HttpRequestLike;
  congig?: any;
}
export const createClient = (
  { previewData, req, ...config }: ClientConfig = {} as ClientConfig
): prismic.Client => {
  const client: prismic.Client = prismic.createClient(sm.apiEndpoint, {
    routes,
    ...config,
  });

  prismicNext.enableAutoPreviews({ client, previewData, req });

  return client;
};
