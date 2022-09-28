import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';
import defaultImage from '../public/images/event-default.png'

export default function EventItem({ evt }) {
  const { image, date, time, name, slug } = evt.attributes;
  // const thumbnail = image.data.attributes.url
  const thumbnail =
    image.data !== null ? image.data.attributes.url : defaultImage;
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={thumbnail ? thumbnail : '/images/event-default.png'}
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(date).toLocaleDateString('en-US')} at {time}
        </span>
        <h3>{name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
