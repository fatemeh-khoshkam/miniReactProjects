//import React from 'react';
import cityDataType from "../../types/cityDataType.ts";
import styles from "./CityItem.module.css";
import formatDate from "../../utils/formatDate.ts";
import convertCountryCodeToString from "../../utils/convertCountryCodeToString.ts";

type CityProps = {
  city: cityDataType;
};

function CityItem({ city }: CityProps) {
  const { cityName, date, emoji } = city;
  console.log(city);
  const countryFlag = convertCountryCodeToString(emoji);

  return (
    <li className={styles.cityItem}>
      <img
        className={styles.emoji}
        alt={emoji}
        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryFlag}.svg`}
      />
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
