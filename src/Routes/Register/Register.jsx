import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../Config/firebase_config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import styles from "./register.module.css";
const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const username = e.target[1].value;
    const pass = e.target[2].value;
    const pass2 = e.target[3].value;
    const file = e.target[4].files[0];
    console.log(file);
    const isFilled = (...param) => {
      return param.every((param) => param.trim() !== "");
    };
    if (pass != pass2) {
      setError("Passwords don't match!!");
      return;
    }
    if (!isFilled(username, email, pass, pass2)) {
      setError("Fill all the fields");
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      const storageRef = ref(storage, username);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.error(error);
          setError(error.message); // Set an error message
          // Handle error further if needed
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              username,
              email,
              photoURL: downloadURL,
            });
            navigate("/");

            setError("");
          } catch (error) {
            setError(error.message); // Handle error
          }
        }
      );
    } catch (err) {
      console.error(err);
      setError(err.message); // Handle error
    }
  };
  return (
    <div className={styles.register_container}>
      <form className={styles.register_form} action="" onSubmit={handleSubmit}>
        <input
          className={styles.register_input}
          type="email"
          placeholder="Email"
        />
        <input
          className={styles.register_input}
          type="text"
          placeholder="Username"
        />
        <input
          className={styles.register_input}
          type="password"
          placeholder="Password"
        />
        <input
          className={styles.register_input}
          type="password"
          placeholder="Re-enter password"
        />
        <label htmlFor="file" className={styles.register_label}>
          <img
            width="32"
            height="32"
            src="https://img.icons8.com/tiny-color/16/name.png"
            alt="name"
          />
          Enter your avatar
        </label>
        <input
          className={styles.register_file_input}
          id="file"
          type="file"
          style={{ display: "none" }}
        />
        <button className={styles.register_button} type="submit">
          Signup
        </button>
      </form>
      <span className={styles.register_error}>{error}</span>
      <div>
        Do you have an account?{" "}
        <Link to="/login" className={styles.register_link}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
