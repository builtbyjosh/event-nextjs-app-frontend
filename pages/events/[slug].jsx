import React from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

export default function EventPage({ evt }) {
  console.log('EVT: ', evt);
  const router = useRouter();

  const deleteEvent = (e) => {
    console.log('DELETE EVENT');
  };

  const { image, date, time, name, slug, id, performers, description, venue, address } = evt.attributes
  const thumbnail = image.data.attributes.url

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controles}>
          <Link href={`/events/edits/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
        {new Date(date).toLocaleDateString('en-US')} at {time}
        </span>
        <h1>{name}</h1>

        {image && (
          <div className={styles.image}>
            <Image src={thumbnail} height={600} width={960} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{performers}</p>
        <h3>Description:</h3>
        <p>{description}</p>
        <h3>Venue: {venue}</h3>
        <p>{address}</p>
        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();  
  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events?populate=*&filters[slug][$contains]=${slug}`);
  const events = await res.json();
  return {
    props: {
      evt: events.data[0],
    },
    revalidate: 1,
  };
}
// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events?filters[slug][$contains]=${slug}`)
//   const events = await res.json()
//   console.log('EVENT DATA: ', events)
//   return {
//     props: {
//       evt: events
//     },
//   };
// }
