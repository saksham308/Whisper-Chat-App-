import React from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";
import styles from "./message.module.css";
const Message = ({ sender, data }) => {
  const { currUser } = useContext(UserContext);
  return (
    <div
      className={
        sender == currUser.displayName ? styles.sender : styles.receiver
      }
      style={{
        alignSelf: `${
          sender == currUser.displayName ? "flex-start" : "flex-end"
        }`,
      }}
    >
      <p>{data}</p>
    </div>
  );
};

export default Message;
