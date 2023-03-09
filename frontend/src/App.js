import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "./App.css";
import product from './components/Product'
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import React,{ useContext, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import AdminScreen from './screens/AdminScreen';
import { signOut, onAuthStateChanged } from 'firebase/auth';

import { auth } from "./firebase/Firebase";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  const [user, setUser] = useState({});
  const [statusUser, setStatus] = useState();

  const logout = async () => {
    await signOut(auth);
  };

 onAuthStateChanged(auth, (currentUser) => {
    // setError("")

   if (currentUser == null) {
     setUser("not connected");
       setStatus("guest");
   }
   else {
     setUser(currentUser);
     let p = 
       setStatus(user.email);
    }
  });
  
  
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar className="navbar">
            
            <Container className='navbar_container'>
              <LinkContainer to="/"><Navbar.Brand className='logo'>Amazon best seller </Navbar.Brand></LinkContainer>

              <Nav className="navbar_menu">
                  <Nav className="navbar_item">
                <Link to="/cart" className="nav-link">Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                    )} </Link>
                </Nav>
                <Nav className="navbar_item">

                  <Link to="/login" className="nav-link" onChange={onAuthStateChanged}>Login</Link></Nav>
                  <Nav className="navbar_item">
                  <Link to="/Admin" className="nav-link">Admin
                  
                  </Link>

                </Nav>
                <button onClick={logout} className="button"> Sign Out </button>
                  <li className='nav-link'> hello,{statusUser}</li>
            </Nav>
            </Container>
            </Navbar>
        </header>

        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:name" element={<ProductScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/Admin" element={<AdminScreen/>} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
