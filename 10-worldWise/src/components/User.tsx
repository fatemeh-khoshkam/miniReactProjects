import styles from "./User.module.css";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

// import { useEffect } from "react";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  // useEffect(() => {
  //   if (!user) navigate("/login");
  // }, [navigate, user]);

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user?.avatar} alt={user?.name} />
      <span>Welcome, {user?.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
