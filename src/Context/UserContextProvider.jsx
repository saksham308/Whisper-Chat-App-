import { onAuthStateChanged } from "firebase/auth";
import React, { useState, createContext, useEffect } from "react";
import { auth } from "../Config/firebase_config";
const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  let [theme, setTheme] = useState(false);
  const [room, setRoom] = useState("");
  const [currUser, setCurrUser] = useState({});
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrUser(user);
    });
    return () => unsub();
  });
  return (
    <UserContext.Provider value={{ theme, setTheme, currUser, room, setRoom }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export { UserContext };
