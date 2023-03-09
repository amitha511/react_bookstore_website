import React, { useEffect, useReducer, useState } from 'react';

import HomeProduct from '../components/HomeProduct'
import '../App.css'
// import data from '../data';


function CatalogScreen() {


    const backgroundImage = {
    backgroundImage: "url('https://t3.ftcdn.net/jpg/03/58/79/66/360_F_358796655_1Zoe4oyLOoE7lL4izOvy8DvCP0xypYgg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    
    <div>
     <HomeProduct></HomeProduct>
    </div>
  );
}
export default CatalogScreen;