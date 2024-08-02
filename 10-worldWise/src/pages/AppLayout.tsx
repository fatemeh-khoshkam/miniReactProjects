import styles from "./App.module.css";
import SideBar from "../components/SideBar";
import Map from "../components/Map";
import User from "../components/User";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar></SideBar>
      <Map></Map>
      <User></User>
    </div>
  );
}
