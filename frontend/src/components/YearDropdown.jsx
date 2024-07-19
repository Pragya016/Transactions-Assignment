import React from 'react';
import styles from './css/dropdown.module.css';

function MonthDropdown({ value, onChange }) {
  const years = [2021, 2022];

  return (
    <select value={value} onChange={onChange} id={styles.select}>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}

export default MonthDropdown;
