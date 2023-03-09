import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';

import { useParams } from 'react-router-dom';

import './ProductScreen.css'

function ProductScreen() {
  const [name] = useState(useParams().name);

  const [enterdName, setEnterdName] = useState("");
    const [enterdAmount, setEnterdAmount] = useState("");
    const [enterdImg, setEnterdImg] = useState("");
    const [enterdGenre, setEnterdGener] = useState("");
    const [enterdStore, setEnterdStore] = useState("");
    const [enterdLanguage, setEnterdLanguage] = useState("");
    const [enterdPages, setEnterdPages] = useState("");
    const [enterdYear, setEnterdYear] = useState("");

  let product1 = "";
  useEffect(() => {
  const loadProduct = async () => {
    try {
    console.log(name);
      const result = await axios.get(`/api/products/search/` + name);
      product1 = result.data;
      setEnterdName(product1[0].name)
      setEnterdImg(product1[0].img);
      setEnterdAmount(product1[0].amount);
      setEnterdGener(product1[0].gener)
      setEnterdStore(product1[0].store)
      setEnterdLanguage(product1[0].language)
      setEnterdPages(product1[0].pages)
      setEnterdYear(product1[0].year)
  } catch (err) {
    console.log(err);
    }
  }
    loadProduct();
  },[name])

    return(
      <div className="app" >
        {
            <div className="details" >
              <div className="big-img">
                <img src={enterdImg} alt={enterdName} />
              </div>

              <div className="box">
                <div className="row">
                  <h2>{enterdName}</h2>
                </div>
                  <p>Amount: {enterdAmount} $</p>
                <p>Page: {enterdPages}</p>
              <p>Year: {enterdYear}</p>
              <p>Language: {enterdLanguage}</p>

                <button className="cart">Add to cart</button>

              </div>
            </div>
          
        }
      </div>
    );
  };


export default ProductScreen;