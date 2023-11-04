import React, { useContext, useState } from "react";
import styles from "./SearchBar.module.css";
import { db } from "../Config/firebase_config";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { UserContext } from "../Context/UserContextProvider";
const SearchBar = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState(null);
  const { currUser, setRoom, room } = useContext(UserContext);
  const handleClick = async () => {
    const combinedId =
      currUser.uid > users.uid
        ? currUser.uid + users.uid
        : users.uid + currUser.uid;
    const res = await getDoc(doc(db, "userChats", combinedId));
    if (!res.exists()) {
      try {
        await setDoc(doc(db, "userChats", combinedId), { messages: [] });
      } catch (err) {
        console.log(err);
      }
    }
    await setRoom(combinedId);
    console.log(room);
  };

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("username", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.docs.length) {
        setUsers(null);
      }

      querySnapshot.forEach((doc) => {
        setUsers(doc.data());
      });
    } catch (err) {}
  };

  const handleSubmit = (e) => {
    e.code === "Enter" && handleSearch();
  };
  return (
    <>
      <input
        className={styles.input}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        onKeyDown={handleSubmit}
        type="text"
        placeholder="Search a User"
      />
      {!users && <span style={{ color: "red" }}>The user was not found!!</span>}
      {users && (
        <div
          onClick={handleClick}
          className={styles.users}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <img
            src={users.photoURL}
            style={{ height: "30px", width: "30px", borderRadius: "50%" }}
          ></img>
          <div>{users.username}</div>
        </div>
      )}
      <br />
    </>
  );
};

export default SearchBar;
