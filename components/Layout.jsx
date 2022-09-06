import React from 'react';
import Head from 'next/head';
import { Header } from './Header';
import styles from '@/styles/Layout.module.css';
import { Footer } from './Footer';
import Showcase from './Showcase';
import { useRouter } from 'next/router';

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'Events | Find the best spots',
  description: 'One stop shop to find all the cool places to go',
  keywords: 'music',
};
