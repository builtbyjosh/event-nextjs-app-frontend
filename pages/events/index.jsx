import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL, PER_PAGE } from '@/config/index';
import Link from 'next/link';
import Pagination from '@/components/Pagination';


export default function EventsPage({ events, page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);

  console.log('EVENTS: ', events, page, total);
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total}/>
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch Events
  const eventRes = await fetch(
    `${API_URL}/api/events?populate=*&sort=date:ASC&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`
  );
  const events = await eventRes.json();
  return {
    props: {
      events: events.data,
      page: parseInt(page),
      total: events.meta.pagination.total,
    },
  };
}
