import { useState,useEffect } from "react";
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
import TextField from '@mui/material/TextField';
import io from 'socket.io-client';


function LoginScreen() {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  const [massageLogin, setmassageLogin] = useState("");
  const [massageRegister, setmassageRegister] = useState("");

    useEffect(() => {
    const socket = io();
    // Socket.IO event listener for userCount updates
    socket.on('userCount', (count) => {
      //setUserCount(count);
    });

    return () => {
      socket.disconnect();
    };

    }, []);
  
  onAuthStateChanged(auth, (currentUser) => {
    // setError("")
    if (currentUser == null)
      setUser("not connected")
    else
      setUser(currentUser);
  });

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
    <div className="screen">
    <div className="App">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Row>
        <Col md={4}>
            <Card className="box1">
            <Card.Body>
              <ListGroup variant="flush">
                  <ListGroup.Item> 
                  <h3> Login </h3>
                </ListGroup.Item>
                <ListGroup.Item> 
                  {massageLogin}
                  <p>
                    <TextField placeholder="Email..." label ="Email" onChange={(event) => { setLoginEmail(event.target.value); }} />
                  </p>
                  <TextField type ="password" label ="Password" placeholder="Password..." onChange={(event) => { setLoginPassword(event.target.value); }} />
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
      </div>
  );
}

export default LoginScreen;