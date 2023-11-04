import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./Routes/Register/Register.jsx";
import "./index.css";
import Login from "./Routes/Login/Login.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoutes from "./Components/ProtectedRoutes.jsx";
import UserContextProvider from "./Context/UserContextProvider.jsx";
import Home from "./Routes/Home/Home.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        }
      ></Route>

      <Route path="login" element={<Login />}></Route>
      <Route path="signup" element={<Register />}></Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
