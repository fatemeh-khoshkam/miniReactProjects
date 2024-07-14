//import React from 'react';
import styles from "./CountryList.module.css";
import countryDataType from "../../types/countryDataType.ts";
import cityDataType from "../../types/cityDataType.ts";
import Spinner from "../Spinner.tsx";
import Message from "../Message.tsx";
import CountryItem from "./CountryItem.tsx";

type countryListProps = {
  cities: cityDataType[];
  isLoading: boolean;
};

function CountryList({ cities, isLoading }: countryListProps) {
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
