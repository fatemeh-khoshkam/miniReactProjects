import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import Message from "./Message";
import { useUrlPosition } from "../hooks/useUrlPosition";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState<string>("");

  const [emoji, setEmoji] = useState<string>("");
  const [geocodingError, setGeocodingError] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  console.log(isLoadingGeocoding);

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

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={styles.form}>
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
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
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
        <Button type="primary">Add</Button>
        <BackButton></BackButton>
      </div>
    </form>
  );
}

export default Form;
