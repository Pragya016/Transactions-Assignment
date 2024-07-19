import React from 'react';
import styles from './css/dropdown.module.css';

function MonthDropdown({ value, onChange }) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <select value={value} onChange={onChange} id={styles.select}>
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
}

export default MonthDropdown;
