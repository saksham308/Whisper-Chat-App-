import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContextProvider";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/firebase_config";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
const Login = () => {
  const { currUser } = useContext(UserContext);
  const [error, setError] = useState("");
  console.log(currUser);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const pass = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/");
      return;
    } catch (err) {
      setError(err.message);
      return;
    }
  };
  return (
    <div className={styles.login_container}>
      <form className={styles.login_form} action="" onSubmit={handleSubmit}>
        <input
          className={styles.login_input}
          type="email"
          placeholder="Email"
        />
        <input
          className={styles.login_input}
          type="password"
          placeholder="Password"
        />
        <button className={styles.login_button} type="submit">
          Login
        </button>
      </form>
      <span className={styles.login_error}>{error}</span>
      <div>
        Don't have an account?{" "}
        <Link to="/signup" className={styles.login_link}>
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
