import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import "./App.css";
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen'
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import React,{ useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  
  
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar className="custom-navbar">
          
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Amazon best seller</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                <Link to="/login" className="nav-link">
                  Login
                  {/* {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )} */}
                </Link>
              </Nav>
            </Container>
            </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:name" element={<ProductScreen />} />
              <Route path="/login" element={<LoginScreen/>} />
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
