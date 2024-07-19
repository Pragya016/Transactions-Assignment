import React from 'react';
import styles from './css/pagination.module.css';

function Pagination({ currentPage, totalPages, onNext, onPrevious, containerStyles }) {
  return (
    <div style={containerStyles}>
      <button onClick={onPrevious} disabled={currentPage === 1} id={styles.prevBtn}>
        Previous
      </button>
      <span id={styles.text}>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage === totalPages} id={styles.nextBtn}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
