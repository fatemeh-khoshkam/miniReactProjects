//import React from 'react';
import styles from "./CountryList.module.css";
import countryDataType from "../../types/countryDataType";
import cityDataType from "../../types/cityDataType";
import Spinner from "../Spinner";
import Message from "../Message";
import CountryItem from "./CountryItem";
import { useCities } from "../../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner></Spinner>;

  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on a country on the map"></Message>
    );

  const countries: countryDataType[] = cities.reduce(
    (arr: countryDataType[], city: cityDataType) => {
      if (!arr.some((el) => el.country === city.country)) {
        return [
          ...arr,
          { country: city.country, emoji: city.emoji, id: city.id },
        ];
      } else return arr;
    },
    [],
  );

  return (
    <div className={styles.countryList}>
      {countries.map((country: countryDataType) => (
        <CountryItem country={country} key={country.id}></CountryItem>
      ))}
    </div>
  );
}

export default CountryList;
