import React from "react";
import ChatPanel from "../../Components/ChatPanel";
import SideBar from "../../Components/Sidebar";
import styles from "./Home.module.css";
const Home = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <SideBar />
        <ChatPanel />
      </div>
    </div>
  );
};

export default Home;
