import { BrowserRouter, Link, Route } from 'react-router-dom';
import "../App.css";
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import React,{ useContext, useState , useEffect, Children} from 'react';
import { Store } from '../Store';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { auth } from "../firebase/Firebase";
import './Navbar.css'
import MenuAdmi from './MenuAdmi'

function NavbarComponent() {

  const { state } = useContext(Store);
  const { cart } = state;
  const [nameUser, setNameUser] = useState();
  const [SinginOutBtn, setSinginOutBtn] = useState();
  const [RegisterBtn, setRegister] = useState();
  const [adminBtn, setAdmin] = useState();

 let product1=[];

  const logout = async () => {
    window.location.href = "/";
    setAdmin()
    await signOut(auth);
    setNameUser("guest")
    setSinginOutBtn(<a href="/login"> <button className="button"> Log in </button> </a>)
    setRegister(<a href="/register"> <button className="button"> Register</button> </a>)

  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      // setError("")
      if (currentUser == null) {
        setNameUser("guest")
        setSinginOutBtn(<a href="/login"> <button className="button"> Log in </button> </a>)
        setRegister(<a href="/register"> <button className="button"> Register</button> </a>)
      }

      else {
        if (currentUser.email === 'admin@gmail.com') {
        setAdmin(<Nav className="navbar_item"> <Link to="/Admin" className="nav-link">Admin</Link></Nav>)
        }
        getUser(currentUser)
        setSinginOutBtn(<button onClick={logout} className="button"> Sign Out </button>)
        setRegister()
      }
    });
  },auth);
  
    const getUser = async (currentUser) => {
    try {
      const result = await axios.get(`/api/users/search/` + currentUser.email);
      product1 = result.data;
      if (product1[0].email === 'admin@gmail.com') {
        setAdmin(<Nav className="navbar_item"> <Link to="/Admin" className="nav-link">Admin</Link></Nav>)
        }
        console.log(adminBtn)
      setNameUser(product1[0].firstName+" "+product1[0].lastName)

  } catch (err) {
    console.log(err);
    }
  }

  return (
      <Navbar className='className="navbar"'>
    <Container className='navbar-menu-container'>
      <LinkContainer to="/"><Navbar.Brand className='logo'>Bookstore</Navbar.Brand></LinkContainer>
      <Nav className="navbar_menu">
      
          <Nav className="navbar_item">
            <Link to="/About" className="nav-link" onChange={onAuthStateChanged}>About</Link>
          </Nav>

        <Nav className="navbar_item">
            <Link to="/catalog" className="nav-link" onChange={onAuthStateChanged}>Catalog</Link>
          </Nav>
          
          <Nav className="navbar_item">
          </Nav>

        <Nav className="navbar_item">
          <Link to="/cart" className="nav-link">Cart
          {cart.cartItems.length > 0 && (
            <Badge pill bg="danger">
              {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
            </Badge>
            )} </Link>
        </Nav>

        <Nav className='navbar_item '>
        <section>{adminBtn}</section>
        </Nav >
        <Nav className='navbar_item '>
          <section>{SinginOutBtn}</section>
        </Nav>
        <Nav className='navbar_item '>
          <section>{RegisterBtn}</section>
        </Nav>
        
        <Nav className='navbar_item '>
        <li className="nav-link"> hello,{nameUser}</li>
        </Nav>
    </Nav>
      </Container>
      </Navbar>
  );
}

export default NavbarComponent;
