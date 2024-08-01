import React, { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContext";

import DatePicker from "react-datepicker/dist/index";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";

import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import Message from "./Message";
import cityDataType from "types/cityDataType";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode: string): string {
  if (typeof countryCode !== "string" || countryCode.length !== 2) {
    console.error("Invalid country code");
    return "";
  }

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  try {
    return String.fromCodePoint(...codePoints);
  } catch (error) {
    console.error("Failed to convert country code to emoji:", error);
    return "";
  }
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [notes, setNotes] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const [emoji, setEmoji] = useState<string>("");
  const [geocodingError, setGeocodingError] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);

  useEffect(
    function () {
      async function fetchCityInfo() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`,
          );
          const data = await res.json();
          console.log(data);

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉",
            );

          setCityName(data.city || data.locality || "");
          setEmoji(data.countryCode);
          setCountry(data.countryName);
        } catch (err) {
          if (err instanceof TypeError) {
            setGeocodingError("🌐 Please check your internet connection.");
          } else if (err instanceof Error) {
            setGeocodingError(err.message);
          } else {
            setGeocodingError("An unknown error occurred.");
          }
        } finally {
          setIsLoadingGeocoding(false);
        }
      }

      fetchCityInfo();
    },
    [lat, lng],
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submit");
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity: cityDataType = {
      cityName,
      country,
      emoji: convertToEmoji(emoji),
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />

        <span className={styles.flag}>
          <img
            alt={emoji}
            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${emoji}.svg`}
          />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date: Date | null) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        ></DatePicker>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" buttonType="submit">
          Add
        </Button>
        <BackButton></BackButton>
      </div>
    </form>
  );
}

export default Form;
