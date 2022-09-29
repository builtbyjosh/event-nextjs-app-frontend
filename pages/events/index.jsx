import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import Link from 'next/link';
const PER_PAGE = 2;

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
      {/* Button to Previous Page */}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary" style={{ float: 'right' }}>
            Next
          </a>
        </Link>
      )}
      {/* Button to Next Page */}
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}
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
