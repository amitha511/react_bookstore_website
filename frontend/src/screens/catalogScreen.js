import React, { useEffect, useReducer, useState } from 'react';
import HomeProduct from '../components/HomeProduct'
import '../App.css'
import io from 'socket.io-client';

// import data from '../data';


function CatalogScreen() {

    useEffect(() => {
    const socket = io();
    // Socket.IO event listener for userCount updates
    socket.on('userCount', (count) => {
      //setUserCount(count);
    });

    return () => {
      socket.disconnect();
    };

  },[]);

    const backgroundImage = {
    backgroundImage: "url('https://t3.ftcdn.net/jpg/03/58/79/66/360_F_358796655_1Zoe4oyLOoE7lL4izOvy8DvCP0xypYgg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    
    <div className='screen'>
     <HomeProduct></HomeProduct>
    </div>
  );
}
export default CatalogScreen;