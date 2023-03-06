import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../App.css'
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  const [genreSearch, setGenreSearch] = useState("/all");
  const [storeSearch, setStoreSearch] = useState("/all");
  const [priceSearch, setPriceSearch] = useState("/all");
  const [lenguageSearch, setLanguageSearch] = useState("/all");
  const [pagesSearch, setPagesSearch] = useState("/all");
  const [yearSearch, setYearSearch] = useState("/all");
  const [routingSearch, setRoutingSearch] = useState(0);
  useEffect(() => {

    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        let result
        if (routingSearch == 0) {
          result = await axios.get('/api/products/search' + genreSearch + storeSearch + priceSearch);
        }
        else {
          console.log(lenguageSearch);
          result = await axios.get('/api/products/searchSecond' + lenguageSearch + pagesSearch + yearSearch);
        }

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

    };

    fetchData();
  }, [genreSearch, storeSearch, priceSearch, lenguageSearch, pagesSearch, yearSearch]);


  const genre = (e) => {
    if (e != null) {
      setGenreSearch('/' + e);
      setRoutingSearch(0);
    }
    else
      setGenreSearch("")
  }

  const store = (e) => {
    if (e != null) {
      setStoreSearch("/" + e);
      setRoutingSearch(0);
    }
    else
      setStoreSearch("");
  }

  const price = (e) => {
    if (e != null) {
      setPriceSearch("/" + e);
      setRoutingSearch(0);
    }
    else
      setPriceSearch("");
  }

  const language = (e) => {
    if (e != null) {
      setLanguageSearch('/' + e);
      setRoutingSearch(1);
    }
    else
      setLanguageSearch("")
  }

  const pages = (e) => {
    if (e != null) {
      setPagesSearch("/" + e);
      setRoutingSearch(1);
    }
    else
      setPagesSearch("");
  }

  const year = (e) => {
    if (e != null) {
      setYearSearch("/" + e);
      setRoutingSearch(1);
    }
    else
      setYearSearch("");
  }

  return (
    <div>
      <Helmet>
        <title>Amazon best seller</title>
      </Helmet>
      <h1>Our Books</h1>
      <p>
        <label for="genre">Genre: </label>
        <select name="genre" id="genre" onChange={(event) => { genre(event.target.value); }}>
          <option value="all">all</option>
          <option value="fantasy">Fantasy</option>
          <option value="romantic">Romantic</option>
          <option value="action">Action</option>
        </select>

        <label for="store">Store: </label>
        <select name="store" id="store" onChange={(event) => { store(event.target.value); }}>
          <option value="all">all</option>
          <option value="stimatsky">Stimatsky</option>
          <option value="amazon">Amazon</option>
          <option value="zomet sfarim">Zomet Sfarim</option>
        </select>

        <label for="amount">Price: </label>
        <select name="amount" id="amount" onChange={(event) => { price(event.target.value); }}>
          <option value="all">all</option>
          <option value="9">9$</option>
          <option value="8">8$</option>
          <option value="10">10$</option>
          <option value="12">12$</option>
          <option value="14">14$</option>
        </select>
      </p>
      <p>
        <label for="language">Language: </label>
        <select name="language" id="language" onChange={(event) => { language(event.target.value); }}>
          <option value="all">all</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="German">German</option>
        </select>

        <label for="pages">Pages: </label>
        <select name="pages" id="pages" onChange={(event) => { pages(event.target.value); }}>
          <option value="all">all</option>
          <option value="335">335</option>
          <option value="500">500</option>
          <option value="384">384</option>
        </select>

        <label for="year">Year: </label>
        <select name="year" id="year" onChange={(event) => { year(event.target.value); }}>
          <option value="all">all</option>
          <option value="2016">2016</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </p>

      {/* <h4>Search:</h4>
      <input type="search" placeholder="name..." onChange={(event) => {genre(event.target.value);}}/>
      <br /> */}
      <br />
      <br />

      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.name} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;