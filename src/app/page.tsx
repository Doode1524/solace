"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { IAdvocate } from "./Models/Advocate";
import Button from "./components/Button";
import AdvocateList from "./components/AdvocateList";
import styles from "./Home.module.css";

const LIMIT = 30;

const Home = () => {
  const [advocates, setAdvocates] = useState<IAdvocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchAdvocates = useCallback(
    async (search: string, resetPage = false) => {
      if (loading || (!hasMore && !search)) return;

      setLoading(true);
      try {
        const newPage = resetPage ? 1 : search ? searchPage : page;
        const response = await fetch(
          `/api/advocates?page=${newPage}&limit=${LIMIT}&searchTerm=${search}`
        );
        const { data, total } = await response.json();

        if (resetPage) {
          setAdvocates(data);
          setSearchPage(2);
        } else {
          setAdvocates((prev) => [...prev, ...data]);
          search
            ? setSearchPage((prev) => prev + 1)
            : setPage((prev) => prev + 1);
        }

        setHasMore(advocates.length + data.length < total);
      } catch (error) {
        console.error("Error fetching advocates:", error);
      }
      setLoading(false);
    },
    [page, searchPage, hasMore, loading]
  );

  useEffect(() => {
    fetchAdvocates("");
  }, []);

  const lastAdvocateRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchAdvocates(searchTerm);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, searchTerm]
  );

  const handleSearchClick = () => {
    setPage(1);
    setSearchPage(1);
    setHasMore(true);
    fetchAdvocates(searchTerm, true);
  };

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.header}>Don't navigate your health alone.</h1>
      <h2 className={styles.subHeader}>
        Find a care advocate who will help you unlock better healthcare by phone
        or video—no matter what you need.
      </h2>
      <div className={styles.searchContainer}>
        <div className={styles.searchInput}>
          <label htmlFor="searchTerm">What can we help with today?</label>
          <input
            name="searchTerm"
            className={styles.searchTerm}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          text="Search"
          type="primary"
          onClick={handleSearchClick}
          height="40px"
          width="100px"
        />
      </div>
      <AdvocateList advocates={advocates} lastAdvocateRef={lastAdvocateRef} />
      {loading && <p className={styles.loading}>Loading...</p>}
    </main>
  );
};

export default Home;
