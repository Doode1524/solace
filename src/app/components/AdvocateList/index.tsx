"use client";

import { IAdvocate } from "@/app/Models/Advocate";
import Button from "../Button";
import styles from "./AdvocateList.module.css";

interface IProps {
  advocates: IAdvocate[];
  lastAdvocateRef: (node: HTMLDivElement) => void;
}

const AdvocateList = ({ advocates, lastAdvocateRef }: IProps) => {
  const formatPhoneNumber = (phone: string | number): string => {
    const cleaned = phone.toString().replace(/\D/g, "");

    if (cleaned.length !== 10) return phone.toString();

    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
      10
    )}`;
  };

  return (
    <div className={styles.advocateList}>
      <div className={styles.advocateListContainer}>
        {advocates &&
          advocates.map((advocate, index) => {
            const isLastAdvocate = index === advocates.length - 1;
            return (
              <div
                key={index}
                className={styles.advocateCard}
                ref={isLastAdvocate ? lastAdvocateRef : null}
              >
                <div className={styles.advocateInto}>
                  <h1 className={styles.advocateName}>
                    {advocate.firstName} {advocate.lastName}, {advocate.degree}
                  </h1>
                  <p className={styles.text}>{advocate.city}</p>
                  <p className={styles.text}>
                    {formatPhoneNumber(advocate.phoneNumber)}
                  </p>
                  <p className={styles.text}>
                    {advocate.yearsOfExperience} years experience
                  </p>
                  <p className={styles.specialties}>
                    <strong>Specialties:</strong>
                  </p>
                  <p className={styles.description}>
                    {advocate.specialties.join(", ")}
                  </p>
                </div>
                <div className={styles.bottomContainer}>
                  <Button
                    text="Learn More"
                    onClick={() => console.log("Learn more clicked!")}
                    width="100%"
                    type="secondary"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdvocateList;
