import React from 'react'
import Link from 'next/link'
import styles from '../styles/Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Music Events 2021</p>
      <p>
        <Link href={'/about'}>About this project</Link>
      </p>
    </footer>
  )
}
