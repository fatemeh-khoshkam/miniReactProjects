//import React from 'react';
import cityDataType from "../../types/cityDataType";
import styles from "./CityItem.module.css";
import formatDate from "../../utils/formatDate";
import convertCountryCodeToString from "../../utils/convertCountryCodeToString";
import { Link } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
import Button from "../Button";
import React from "react";

type CityProps = {
  city: cityDataType;
};

function CityItem({ city }: CityProps) {
  const { cityName, date, emoji, id, position } = city;
  const { currentCity, deleteCity } = useCities();
  const countryFlag = convertCountryCodeToString(emoji);

  // if (!currentCity) return <div>No city data available.</div>;

  function deleteHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!id) return;
    deleteCity(id);
    //console.log("deleteHandler", e.target);
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${id === currentCity?.id ? styles["cityItem--active"] : ""}`}
      >
        <img
          className={styles.emoji}
          alt={emoji}
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryFlag}.svg`}
        />
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <Button type="deleteBtn" onClick={deleteHandler}>
          &times;
        </Button>
      </Link>
    </li>
  );
}

export default CityItem;
