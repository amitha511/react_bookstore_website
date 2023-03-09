import { useState } from "react";
import React from 'react';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Col from 'react-bootstrap/Col';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./Login.css";
import { auth } from "../firebase/Firebase";

function LoginScreen() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
    const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
    const [registerUserName, setRegisterUserName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  const [massageLogin, setmassageLogin] = useState("");
  const [massageRegister, setmassageRegister] = useState("");


  onAuthStateChanged(auth, (currentUser) => {
    // setError("")
    if (currentUser == null)
      setUser("not connected")
    else
      setUser(currentUser);
  });

  //create user
  const register = async () => {
    setmassageRegister("");
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      ); 
      const userData = {
        email: registerEmail,
        firstName: registerFirstName,
        lastName: registerLastName,
        userName: registerUserName,
      }
        setRegisterFirstName("");
        setRegisterEmail("");
        setRegisterLastName("");
        setRegisterUserName(""); 
      
      addUserHendler(userData);
      setmassageRegister("successfully connected")
      window.location.href = "/";

      console.log(user);
    } catch (error) {
      setmassageRegister("Password longer than 6 characters or email wrong");
      console.log(error.message);
    }
  };

  async function addUserHendler(userData) {
      console.log(userData);
      const response = await fetch('http://localhost:5000/api/users/addUser', {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const data = await response;
      console.log(data);
  }

  //login
  const login = async () => {
    setmassageLogin("");
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
          window.location.href = "/";

      setmassageLogin("successfully connected")
      console.log(user);
    } catch (error) {
      setmassageLogin("Email or password wrong");
      console.log(error.message);
    }
  };
  

  return (
    <div className="App">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                  <ListGroup.Item>  
                    <h3> Register User </h3>
                  </ListGroup.Item>
                <ListGroup.Item>
                {massageRegister}
                <p>
                  <input placeholder="First name..." onChange={(event) => { setRegisterFirstName(event.target.value); }} />
                  </p>
                <p>
                  <input placeholder="Last name..." onChange={(event) => { setRegisterLastName(event.target.value); }} />
                  </p>
                <p>
                  <input placeholder="user name..." onChange={(event) => { setRegisterUserName(event.target.value); }} />
                </p>
                <p>
                  <input placeholder="Email..." onChange={(event) => { setRegisterEmail(event.target.value); }} />
                </p>
                <input placeholder="Password..." onChange={(event) => { setRegisterPassword(event.target.value); }} />
                <br />
                <br />
                <Button type="button" onClick={register}> Create User</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                  <ListGroup.Item> 
                  <h3> Login </h3>
                </ListGroup.Item>
                <ListGroup.Item> 
                  {massageLogin}
                  <p>
                    <input placeholder="Email..." onChange={(event) => { setLoginEmail(event.target.value); }} />
                  </p>
                  <input placeholder="Password..." onChange={(event) => { setLoginPassword(event.target.value); }} />
                  <br />
                  <br />
                  <Button onClick={login}> Login</Button>
                </ListGroup.Item> 
            </ListGroup>
          </Card.Body>
        </Card>
        </Col>
    </Row>

  </div>
  );
}

export default LoginScreen;