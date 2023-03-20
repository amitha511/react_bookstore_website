import React,{ useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowRight } from "react-icons/fi";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./Login.css";
import { auth } from "../firebase/Firebase";
import io from 'socket.io-client';

export default function CartScreen() {

  const [newNumber, setNumber] = useState('');

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
  
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = async () => {
    var oneItem;
    var name;
    var p;
    var q;
    if (auth.currentUser != null) {
      var email = auth.currentUser.email;
      var address = document.getElementById('Address').value;
    
      if (email != "" && address != "") {
        document.getElementById('Address');
        cartItems.map(async (item) => (
          //name = item.name,
          name = item.name,
          p = item.amount,
          q = item.quantity,
          oneItem = { userName: address, email: email, name: name, amount: p },
        await axios.post("http://localhost:5000/", oneItem)

        ));
        window.alert('Thank you!');
        cartItems.map((item) => (
          removeItemHandler(item)
        ));
        document.getElementById('Address').value = "";
      }
      else {
        window.alert('You must fill address filed Please Try Again!');
      }
    }
    else {
      window.alert('You must log in to the site');
    }
  };

  
  const handleClick = async () => {
    try {
      const response = await fetch(`https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=USD&want=ILS&amount=${number}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '1d7822b503mshee9d8ae2c3caa64p15c394jsn4a064b10b3af',
          'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
        }
      });
      const data = await response.json();
      console.log(data.new_amount);
      setNumber(data.new_amount+'₪');
    } catch (error) {
      console.error(error);
    }
  }

  const number = cartItems.reduce((a, c) => a + Math.round(c.amount) * c.quantity, 0);
  return (
    <div className='screen'>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/catalog">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.img}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.name}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.amount}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce((a, c) => a + Math.round(c.amount) * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <div>Address:</div>
                    <input id='Address'></input>
                    <br></br>
                    <Button 
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Buy Now!
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
                            <ListGroup  variant="flush">
                <ListGroup.Item>
                  <br></br>
                  <h3>
                    ${cartItems.reduce((a, c) => a + Math.round(c.amount) * c.quantity, 0)} <FiArrowRight />{" "}
                  {newNumber}  
                  </h3>
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button 
                      type="button"
                      variant="primary"
                      onClick={handleClick}
                      disabled={cartItems.length === 0}
                    >
                      Convert
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
