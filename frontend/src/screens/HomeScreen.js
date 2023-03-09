import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import HomeProduct from '../components/HomeProduct'
import '../App.css'
// import data from '../data';


function HomeScreen() {


    const backgroundImage = {
    backgroundImage: "url('https://t3.ftcdn.net/jpg/03/58/79/66/360_F_358796655_1Zoe4oyLOoE7lL4izOvy8DvCP0xypYgg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    
    <div>
      <div style={backgroundImage}>
        <h1 style={{ color: 'white', textAlign: 'center', padding: '280px' }}>bookstore</h1>
    </div>
    </div>
  );
}
export default HomeScreen;