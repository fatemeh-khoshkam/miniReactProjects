//import React from 'react';
import cityDataType from "../../types/cityDataType";
import styles from "./CityItem.module.css";
import formatDate from "../../utils/formatDate";
import convertCountryCodeToString from "../../utils/convertCountryCodeToString";
import { Link } from "react-router-dom";

type CityProps = {
  city: cityDataType;
};

function CityItem({ city }: CityProps) {
  const { cityName, date, emoji, id, position } = city;
  console.log(city);
  const countryFlag = convertCountryCodeToString(emoji);
  console.log(position);
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={styles.cityItem}
      >
        <img
          className={styles.emoji}
          alt={emoji}
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryFlag}.svg`}
        />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
