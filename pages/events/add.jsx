import {useState} from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import styles from '@/styles/Form.module.css'


export default function AddEventPage() {
  return (
    <Layout>
      <h1>Add Event</h1>
    </Layout>
  );
}
