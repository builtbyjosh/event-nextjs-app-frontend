import React from 'react';
import Head from 'next/head';
import styles from '../styles/Layout.module.css'

export default function Layout({title, keywords, description, children}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta name='keywords' content={keywords} />
      </Head>
      <div className={styles.container}>

      {children}
      </div>
    </div>
  );
}

Layout.defaultProps = {
  title: 'Events | Find the best spots',
  description: 'One stop shop to find all the cool places to go',
  keywords: 'music'
}