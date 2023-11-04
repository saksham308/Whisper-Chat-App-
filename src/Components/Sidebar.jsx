import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import FriendUsers from "./FriendUsers";
import styles from "./Sidebar.module.css";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Navbar />
      <SearchBar />
      <FriendUsers />
    </div>
  );
};

export default Sidebar;
