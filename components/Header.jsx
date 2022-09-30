import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Header.module.css';
import Search from './Search';
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a href="">Music Events Project</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a href="">Events</a>
            </Link>
          </li>
          <li>
            <Link href="/events/add">
              <a>Add Event</a>
            </Link>
          </li>
          <li>
            <Link href="/account/login">
              <a className='btn-secondary btn-icon'><FaSignInAlt/> Login</a>
            </Link>
          </li>
          <li>
            <Link href="/account/login">
              <a className='btn-secondary btn-icon'><FaSignOutAlt/> Logout</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
