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
      <div style={{ width: "100%" }}>
        <form
          style={{
            width: "100%",
            display: "flex",
            gap: "4px",
            alignItems: "flex-start",
          }}
          onSubmit={handleSubmit}
        >
          <input
            style={{ width: "92%", padding: "7px", fontSize: "15px" }}
            type="text"
            placeholder="Enter your message"
          />
          <label htmlFor="btn">
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/dusk/64/paper-plane.png"
              alt="paper-plane"
            />
          </label>
          <button id="btn" style={{ display: "none" }} type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default InputPanel;
