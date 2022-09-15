import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import Link from 'next/link';

export default function HomePage({ events }) {
  console.log('EVENTS: ', events);
  return (
    <Layout>
      <h1>Upcomming Events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&sort=date:ASC&pagination[limit]=3`);
  const events = await res.json();
  return {
    props: { events: events.data},
    // props: { events: data.events.slice(0,3) },
    revalidate: 1,
  };
}
