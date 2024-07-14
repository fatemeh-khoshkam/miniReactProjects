//import React from 'react';
import countryDataType from "../../types/countryDataType.ts";
import convertCountryCodeToString from "../../utils/convertCountryCodeToString.ts";
import styles from "./CountryItem.module.css";

type CountryItemProps = {
  country: countryDataType;
};

function CountryItem({ country }: CountryItemProps) {
  const countryFlag = convertCountryCodeToString(country.emoji);
  return (
    <li className={styles.countryItem}>
      <img
        alt={country.emoji}
        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryFlag}.svg`}
      />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
