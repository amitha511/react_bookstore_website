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
import React,{ useContext, useState , useEffect} from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import AdminScreen from './screens/AdminScreen';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { auth } from "./firebase/Firebase";
import CatalogScreen from './screens/catalogScreen';

function App() {

  const { state } = useContext(Store);
  const { cart } = state;
  const [nameUser, setNameUser] = useState();
  const [display, setdisplay] = useState();
  const [adminBtn, setAdmin] = useState();

 let product1=[];

  const logout = async () => {
    setAdmin()
    await signOut(auth);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      // setError("")
      if (currentUser == null) {
        setNameUser("guest");
        setdisplay(<a href="/login"> <button className="button"> Log in </button> </a>)
      }
      else {
        getUser(currentUser)
        setdisplay()
        setdisplay(<button onClick={logout} className="button"> Sign Out </button>)
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
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar className="navbar">
            <Container className='navbar_container'>
              <LinkContainer to="/"><Navbar.Brand className='logo'>Amazon best seller </Navbar.Brand></LinkContainer>
              <Nav className="navbar_menu">
                <Nav className="navbar_item">
                  <Nav className="navbar_item">
                  <Link to="/catalog" className="nav-link" onChange={onAuthStateChanged}>Catalog</Link></Nav>
                  <Link to="/cart" className="nav-link">Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                    )} </Link>
                </Nav>
                <Nav>
                <section>{adminBtn}</section>
                </Nav>
                <section>{display}</section>
                  <li className='nav-link'> hello,{nameUser}</li>
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
              <Route path="/catalog" element={<CatalogScreen />} />
              

            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
