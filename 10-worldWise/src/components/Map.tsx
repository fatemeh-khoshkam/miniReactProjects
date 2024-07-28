import styles from "./Map.module.css";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useCities } from "../contexts/CitiesContext";
import convertCountryCodeToString from "../utils/convertCountryCodeToString";

function Map() {
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0]);
  const { cities } = useCities();

  console.log(setMapPosition);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <img
                className={styles.emoji}
                alt={city.emoji}
                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${convertCountryCodeToString(city.emoji)}.svg`}
              />
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
