"use client";

import { useEffect, useState } from "react";
import { IAdvocate } from "./Models/Advocate";
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
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input
          className={styles.searchTerm}
          value={searchTerm}
          onChange={onChange}
        />
        <button onClick={onResetClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => (
            <tr key={advocate.phoneNumber}>
              <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>
                {advocate.specialties.map((s, index) => (
                  <div key={index}>{s}</div>
                ))}
              </td>
              <td>{advocate.yearsOfExperience}</td>
              <td>{advocate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Home;
