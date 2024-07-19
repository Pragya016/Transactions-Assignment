import React from 'react';
import styles from './css/transaction.table.module.css';

function TransactionsTable({ transactions }) {
  return (
    <div id={styles.tableContainer}>
    <table border="1" id={styles.table}>
      <thead>
        <tr>
          <th className={styles.table_heading} id={styles.id}>ID</th>
          <th className={styles.table_heading} id={styles.title}>Title</th>
          <th className={styles.table_heading} id={styles.desc}>Description</th>
          <th className={styles.table_heading} id={styles.price}>Price</th>
          <th className={styles.table_heading} id={styles.category}>Category</th>
          <th className={styles.table_heading} id={styles.sold}>Sold</th>
          <th className={styles.table_heading} id={styles.image}>Image</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td className={`${styles.table_cols} ${styles.id}`}>{transaction.id}</td>
            <td className={`${styles.table_cols} ${styles.title}`}>{transaction.title}</td>
            <td className={styles.table_cols}>{transaction.description}</td>
            <td className={styles.table_cols}>${transaction.price}</td>
            <td className={styles.table_cols}>{transaction.category}</td>
            <td className={styles.table_cols}>{transaction.sold ? 'Yes' : 'No'}</td>
            <td className={styles.table_cols}>
              <img src={transaction.image} alt={transaction.title} width="50" />
            </td>
          </tr>
        ))}
      </tbody>
      </table>
      </div>
  );
}

export default TransactionsTable;
