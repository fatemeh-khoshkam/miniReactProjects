import styles from "./App.module.css";
import SideBar from "../components/SideBar.tsx";
import Map from "../components/Map.tsx";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar></SideBar>
      <Map></Map>
    </div>
  );
}
