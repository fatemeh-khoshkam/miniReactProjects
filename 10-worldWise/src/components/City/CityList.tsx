//import React from 'react';
import styles from "./CityList.module.css";
import cityDataType from "../../types/cityDataType.ts";
import CityItem from "./CityItem";
import Spinner from "../Spinner.tsx";
import Message from "../Message.tsx";

type CityListProps = {
  cities: cityDataType[];
  isLoading: boolean;
};

function CityList({ cities, isLoading }: CityListProps) {
  if (isLoading) return <Spinner></Spinner>;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map"></Message>
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city: cityDataType) => (
        <CityItem key={city.id} city={city}></CityItem>
      ))}
    </ul>
  );
}

export default CityList;
