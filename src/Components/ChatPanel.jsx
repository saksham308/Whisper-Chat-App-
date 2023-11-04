import React from "react";
import { useState, useEffect } from "react";
import InputPanel from "./InputPanel";
import Message from "./Message";
import styles from "./ChatPanel.module.css";
import { db } from "../Config/firebase_config";
import { doc, onSnapshot } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";
const ChatPanel = () => {
  const { room } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const handleRoom = async () => {
    const docRef = doc(db, "userChats", room);
    const unSub = onSnapshot(docRef, (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  };
  useEffect(() => {
    room && handleRoom();
  }, [room]);
  console.log(messages);
  return (
    <>
      <div className={styles.outerContainer}>
        <div className={styles.ChatPanel}>
          {messages.map((message) => (
            <Message
              key={message.createdAt.nanoseconds}
              data={message.message}
              sender={message.sender}
            />
          ))}
        </div>

        <InputPanel />
      </div>
    </>
  );
};

export default ChatPanel;
