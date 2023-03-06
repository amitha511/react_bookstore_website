import { useState } from "react";
import React from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./Login.css";
import { auth } from "../firebase/Firebase";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  const [massage, setError] = useState("");


  onAuthStateChanged(auth, (currentUser) => {
    // setError("")
    if (currentUser == null)
      setUser("not connected")
    else
      setUser(currentUser);
  });

  //create user
  const register = async () => {
    setError("");
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  //login
  const login = async () => {
    setError("");
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  //logout
  const logout = async () => {
    await signOut(auth);
  };


  return (
    <div className="App">
      <p>
        <div>
          <h3> Register User </h3>
          <p>
            <input placeholder="Email..." onChange={(event) => { setRegisterEmail(event.target.value); }} />
          </p>
          <input placeholder="Password..." onChange={(event) => { setRegisterPassword(event.target.value); }} />
          <br />
          <br />
          <button onClick={register}> Create User</button>

        </div>
      </p>
      <p>
        <div>
          <h3> Login </h3>
          <p>
            <input placeholder="Email..." onChange={(event) => { setLoginEmail(event.target.value); }} />
          </p>
          <input placeholder="Password..." onChange={(event) => { setLoginPassword(event.target.value); }} />
          <br />
          <br />
          <button onClick={login}> Login</button>
        </div>
      </p>

      <h4> User Logged In: </h4>
      {user.email}
      {massage}
      <button onClick={logout}> Sign Out </button>

    </div>
  );
}

export default App;