import Head from "next/head";
import React from "react";

type Props = {
  title?: string;
};

const PageHead = (props: Props) => {
  const { title = "Acara" } = props;
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <link rel="icon" href="/images/general/logo.svg" type="x-icon" />
    </Head>
  );
};

export default PageHead;
