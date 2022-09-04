import React from 'react'
import Link from 'next/link'
import styles from '@/styles/Header.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
        <a href="">Music Events Project</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href='/events'>
              <a href="">Events</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
