import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";

// import { Link, useSearchParams } from "react-router-dom";

function Map() {
  // const [searchParams, setSearchParams] = useSearchParams();
  //
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  const navigate = useNavigate();

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      Map
    </div>
  );
}

export default Map;
