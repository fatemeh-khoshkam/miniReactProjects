import styles from "./Map.module.css";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useCities } from "../contexts/CitiesContext";
import convertCountryCodeToString from "../utils/convertCountryCodeToString";
import { useSearchParams } from "react-router-dom/dist/index";
import { useNavigate } from "react-router-dom";

function Map() {
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0]);
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([parseFloat(mapLat), parseFloat(mapLng)]);
      }
    },
    [mapLat, mapLng, searchParams],
  );

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={8}
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

        <ChangeCenter position={mapPosition}></ChangeCenter>
        <DetectClick></DetectClick>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: { position: LatLngExpression }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      console.log(e);
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      navigate(`form?lat=${lat}, lat=${lng}`);
    },
  });

  return null;
}

export default Map;
