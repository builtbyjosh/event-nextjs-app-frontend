import React from 'react';
import Layout from '@/components/Layout';
import {useRouter} from 'next/router'

export default function EventPage() {
  const router = useRouter()
  console.log('ROUTER: ', router);
  return (
    <Layout>
      <h1>My Event</h1>
    </Layout>
  );
}
