import React from 'react'
import Layout from './Layout'
import styles from '@/styles/Showcase.module.css'

export default function Showcase() {
  return (
    <div className={styles.showcase}>
      <h1>Welcome to the party!</h1>
      <h2>Find the latest music events</h2>
    </div>
  )
}
