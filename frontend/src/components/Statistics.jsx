import React from 'react'
import styles from './css/statistics.module.css'

export default function Statistics({data}) {
  return (
    <div id={styles.container}>
      <div className={styles.statistics}> <span className={styles.headings}>Total Sale Amount</span><span>{data.totalSaleAmount || '0' }</span></div>
      <div className={styles.statistics}><span className={styles.headings}>Total Sold Items</span><span>{data.totalSoldItems || '0'}</span></div>
      <div className={styles.statistics}><span className={styles.headings}>Total Unsold Items</span><span>{data.totalUnsoldItems || '0'}</span></div>
    </div>
  )
}
