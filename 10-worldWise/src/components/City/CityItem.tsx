//import React from 'react';
import cityDataType from "../../types/cityDataType.ts";
import styles from "./CityItem.module.css";

type CityProps = {
  city: cityDataType;
};

function CityItem({ city }: CityProps) {
  const { cityName, date, emoji } = city;
  console.log(city);

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{date}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
