import styles from "./City.module.css";
import { useParams } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
import { useEffect } from "react";
import convertCountryCodeToString from "../../utils/convertCountryCodeToString";
import formatDate from "../../utils/formatDate";
import Spinner from "../../components/Spinner";
import BackButton from "../BackButton";

function City() {
  const { id } = useParams();
  const { isLoading, currentCity, getCity } = useCities();

  useEffect(
    function () {
      if (!id) return;

      //const idConvert = Number(id);
      getCity(id);
    },
    [id, getCity],
  );
  if (isLoading) return <Spinner></Spinner>;
  if (!currentCity) return <div>No city data available.</div>;

  const { cityName, emoji, date, notes } = currentCity;

  const countryFlag = convertCountryCodeToString(emoji);

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <img
            className={styles.emoji}
            alt={emoji}
            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryFlag}.svg`}
          />
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
        <div>
          <BackButton></BackButton>
        </div>
      </div>
    </div>
  );
}

export default City;
