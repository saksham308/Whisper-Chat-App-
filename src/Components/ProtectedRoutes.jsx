import React, { useContext } from "react";
import { UserContext } from "../Context/UserContextProvider";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  const { currUser } = useContext(UserContext);
  return currUser ? children : <Navigate to="/login" />;
};
export default ProtectedRoutes;
