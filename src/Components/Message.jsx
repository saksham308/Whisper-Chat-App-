import React from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";
const Message = ({ sender, data }) => {
  const { currUser } = useContext(UserContext);
  console.log(currUser.displayName === sender);
  return (
    <div
      style={{
        backgroundColor: `${sender == currUser.displayName ? "red" : "blue"}`,
        height: "auto",
        padding: "7px",
        borderRadius: "15px",
        alignSelf: `${
          sender == currUser.displayName ? "flex-start" : "flex-end"
        }`,
        width: "auto",
        margin: "5px",
      }}
    >
      {data}
    </div>
  );
};

export default Message;
