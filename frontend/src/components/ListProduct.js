import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductAdmin from './ProductAdmin';
import { Helmet } from 'react-helmet-async';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import '../App.css'



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

const ListProduct = () => {
 
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  const list = products
  const [genreSearch, setGenreSearch] = useState("/all");
  const [storeSearch, setStoreSearch] = useState("/all");
  const [priceSearch, setPriceSearch] = useState("/all");
  const [lenguageSearch, setLanguageSearch] = useState("/all");
  const [pagesSearch, setPagesSearch] = useState("/all");
  const [yearSearch, setYearSearch] = useState("/all");
  const [routingSearch, setRoutingSearch] = useState(0);
    useEffect(() => {

    const fetchData = async () => {
      try {
        let result
        
        result = await axios.get('/api/products/search' + genreSearch + storeSearch + priceSearch);
        
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

    };

    fetchData();
  },);

    
    
  return (
    <div>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.name} sm={6} md={4} lg={3} className="mb-3">
                <ProductAdmin product={product}></ProductAdmin>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
export default ListProduct;