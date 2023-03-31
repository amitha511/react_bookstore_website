import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import logger from 'use-reducer-logger';
import AddCart from '../components/AddCart'
import { useParams } from 'react-router-dom';
import { Store } from '../Store';
import './ProductScreen.css'
import io from 'socket.io-client';

function ProductScreen() {
  const [product, setProduct] = useState([]);
  const [name] = useState(useParams().name);
  
  
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
  
 let product1=[];
  useEffect(() => {
  const loadProduct = async () => {
    try {
     
    console.log(name);
      const result = await axios.get(`/api/products/search/` + name);
      product1 = result.data; 
      setProduct(product1[0])

  } catch (err) {
    console.log(err);
    }
  }
    loadProduct();
    setProduct(product1)

  }, [name])
  

  return (
      <div className='screen'>
      <div className="app" >        
            <div className="details" >
              <div className="big-img">
                <img src={product.img} alt={product.name} />
              </div>

              <div className="box">
                <div className="row">
                  <h2>{product.name}</h2>
                </div>
              <p>Amount: {product.amount} $</p>
              <p>Store: {product.store}</p>
              <p>Genere: {product.Genere}</p>
              <p>Language: {product.language}</p>
              <p>Pages: {product.pages}</p>
            <p>Year: {product.year}</p>
                      <AddCart product={product}></AddCart>

          </div>
          </div>
      </div>
      </div>
    );
  };


export default ProductScreen;