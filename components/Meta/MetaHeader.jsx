import Head from "next/head";
import React from "react";

const MetaHeader = ({ description = "", title = "" }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="title" content={title} />
      <meta name="author" content="Shradha Suman" />
      <meta name="copyright" content="Shradha Suman" />
      <meta name="robots" content="index, follow" />
      <title>{title}</title>
    </Head>
  );
};

export default MetaHeader;
