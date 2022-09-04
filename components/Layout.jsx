import React from 'react';
import Head from 'next/head';
import { Header } from './Header';
import styles from '@/styles/Layout.module.css';
import { Footer } from './Footer';

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer/>
    </div>
  );
}

Layout.defaultProps = {
  title: 'Events | Find the best spots',
  description: 'One stop shop to find all the cool places to go',
  keywords: 'music',
};
