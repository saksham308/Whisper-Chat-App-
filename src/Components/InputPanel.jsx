import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";
import { db } from "../Config/firebase_config";
import { updateDoc, arrayUnion, doc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
const InputPanel = () => {
  const { currUser, room } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessageText = e.target[0].value;
    if (newMessageText === "") {
      alert("Enter a message");
      return;
    }
    const docRef = doc(db, "userChats", room);
    const newMessage = {
      sender: currUser.displayName,
      message: newMessageText,
      createdAt: Timestamp.now(),
    };
    await updateDoc(docRef, {
      messages: arrayUnion(newMessage),
    })
      .then(() => {
        console.log("Message added to the 'messages' array successfully.");
      })
      .catch((error) => {
        console.error("Error adding message to 'messages' array:", error);
      });
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <form onSubmit={handleSubmit}>
          <input type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default InputPanel;
