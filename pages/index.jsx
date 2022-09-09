import Head from 'next/head'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

export default function HomePage({events}) {
  console.log('EVENTS: ', events)
  return (
    <Layout>
      <h1>Upcomming Events</h1>      
    </Layout>
  )
}

export async function getServerSideProps(){
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()
  return {
    props: {events}
  }
}