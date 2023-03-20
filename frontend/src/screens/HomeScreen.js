// import React from "react";
// import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../book.png";
import { FiArrowRight } from "react-icons/fi";
import CatalogScreen from "./catalogScreen";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Background from "../components/Background";
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import SocketIO from "../components/SocketIO";
const HomeScreen = () => {
  
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
  
    const handleClick = () => {
        window.location.href = "/catalog";
    };
  
  return (
  <div className="screen">
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            All favorite books in one place
          </h1>
          <p className="primary-text">
            Drama, comedy, fantasy books and more..
            Bestsellers, of the most successful authors.
            Everything in one place, highly recommended
          </p>
          
          <button className="secondary-button" onClick={handleClick} >
              Order Now <FiArrowRight />{" "}
            </button>
          <div>
    </div>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
      </div>
      </div>

    
  );
};


export default HomeScreen; 