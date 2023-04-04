import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

const Document: React.FC = () => {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="overflow-x-hidden antialiased">
        <Main />
        <NextScript />
        <script
          async
          defer
          src="https://static.cdn.prismic.io/prismic.js?new=true&repo=tmh-blog"
        ></script>
      </body>
    </Html>
  );
};
export default Document;
