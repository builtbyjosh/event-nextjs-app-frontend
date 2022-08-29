import React from 'react';
import Head from 'next/head';

export default function Layout({title, keywords, description, children}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta name='keywords' content={keywords} />
      </Head>
      {children}
    </div>
  );
}

Layout.defaultProps = {
  title: 'Events | Find the best spots',
  description: 'One stop shop to find all the cool places to go',
  keywords: 'music'
}