"use client";

import { useEffect, useState } from "react";
import { IAdvocate } from "./Models/Advocate";
import Button from "./components/Button";
import AdvocateList from "./components/AdvocateList";
import styles from "./Home.module.css";

const Home = () => {
  const [advocates, setAdvocates] = useState<IAdvocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<IAdvocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetch("/api/advocates")
      .then((response) => response.json())
      .then((jsonResponse) => {
        const { data } = jsonResponse;
        if (!Array.isArray(data)) throw new Error("Invalid API response");

        setAdvocates(data);
        setFilteredAdvocates(data);
      })
      .catch((error) => console.error("Error fetching advocates:", error));
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    setFilteredAdvocates(
      advocates.filter(
        (advocate) =>
          [
            advocate.firstName,
            advocate.lastName,
            advocate.city,
            advocate.degree,
            advocate.yearsOfExperience.toString(),
          ]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(term)) ||
          advocate.specialties.some((s) => s.toLowerCase().includes(term))
      )
    );
  };

  const onResetClick = () => {
    setFilteredAdvocates(advocates);
    setSearchTerm("");
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
          <label htmlFor="searchTerm">Find an Advocate:</label>
          <input
            name="searchTerm"
            className={styles.searchTerm}
            value={searchTerm}
            onChange={onChange}
          />
        </div>
        <Button text="Reset" type="primary" onClick={onResetClick} height="40px" width="100px" />
      </div>
      <br />
      <br />
      <AdvocateList advocates={filteredAdvocates} />
    </main>
  );
};

export default Home;
