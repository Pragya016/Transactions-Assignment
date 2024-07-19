// src/SearchBox.js
import React from 'react';
import styles from './css/search.box.module.css';

function SearchBox({ value, onChange }) {
  return (
    <input
      id={styles.searchBox}
      type="text"
      placeholder="Search transactions"
      value={value}
      onChange={onChange}
    />
  );
}

export default SearchBox;
