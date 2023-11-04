import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase_config";
import { useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const { currUser } = useContext(UserContext);
  const logout = async () => {
    await signOut(auth);
    console.log(room);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div>ChatApp</div>
        </div>
        <div className={styles.right}>
          <span>{currUser.displayName}</span>
          <img
            style={{ borderRadius: "50%" }}
            src={currUser.photoURL}
            width="25"
            height="25"
          />
          <button className={styles.btn} onClick={logout}>
            logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
