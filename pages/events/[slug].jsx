import React from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';

export default function EventPage({ evt }) {
  console.log('EVT: ', evt);
  const router = useRouter();
  return (
    <Layout>
      <h1>{evt.name}</h1>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const data = await res.json();
  const paths = data.events.map((evt) => ({
    params: { slug: evt.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`);
  const events = await res.json();
  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}
// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()
//   return {
//     props: {
//       evt: events[0]
//     },
//   };
// }
