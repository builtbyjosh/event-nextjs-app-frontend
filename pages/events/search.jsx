import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import qs from 'qs';

export default function SearchPage({ events }) {
  // const {events} = data
  console.log('EVENTS: ', events);
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <h1>Search Results for '{router.query.term}'</h1>
      <Link href={`/events`}>
        <a className="btn">Go Back</a>
      </Link>
      {events.length === 0 && <h3>No Events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        { name: { $contains: term } },
        { performers: { $contains: term } },
        { description: { $contains: term } },
        { venue: { $contains: term } },
      ],
    },
    // encodeValuesOnly: true, // prettify URL
  });
  console.log('QUERY STRING: ', query);
  const res = await fetch(`${API_URL}/api/events?populate=*&${query}`);
  const events = await res.json();

  return {
    props: { events: events.data },
  };
}
