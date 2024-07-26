import styles from "./App.module.css";
import SideBar from "../components/SideBar";
import Map from "../components/Map";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar></SideBar>
      <Map></Map>
    </div>
  );
}
