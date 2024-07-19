import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './TransactionTable';
import MonthDropdown from './MonthDropdown';
import YearDropdown from './YearDropdown';
import SearchBox from './SearchBox';
import Pagination from './Pagination';
import Statistics from './Statistics';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './css/home.module.css';

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('January');
  const [year, setYear] = useState(2021);
  const [page, setPage] = useState(1);
  const [statistics, setStatistics] = useState({});
  const [showStatistics, setShowStatistics] = useState(false);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [search, month, page]);

  useEffect(() => {
    if (showStatistics) {
      fetchStatistics();
    }
  }, [month, year, showStatistics]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/url/transactions?search=${search}&month=${month}&page=${page}&perPage=${perPage}`
      );

      const data = response.data;
      setTransactions(data.transactions);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error('Failed to fetch transactions.');
    }
  };

  const fetchStatistics = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/url/statistics?month=${month}&year=${year}`);
      setStatistics(data);
    } catch (error) {
      toast.error('Failed to fetch statistics.')
    }
  };

  const toggleStatistics = () => {
    setShowStatistics((prev) => !prev);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleNextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <h1 id={styles.heading}>Transactions</h1>
      <div id={styles.searchContainer}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <MonthDropdown value={month} onChange={handleMonthChange} />
        <YearDropdown value={year} onChange={handleYearChange} />
      </div>
      <p onClick={toggleStatistics} id={styles.statisticsLink}>
        {showStatistics ? 'Close' : 'See Statistics'}
      </p>
      {showStatistics && <Statistics data={statistics} />}
      <TransactionsTable transactions={transactions} />
      <Pagination
        containerStyles={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        currentPage={page}
        totalPages={totalPages}
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
      />
      <ToastContainer/>
    </>
  );
}

export default Home;
