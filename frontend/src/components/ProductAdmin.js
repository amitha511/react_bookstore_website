import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React,{ useContext } from 'react';
import { Store } from '../Store';
import { remove } from 'firebase/database';

function Product(props) {
  const { product } = props;
      
    const edit = async (item) => {

    }

    async function removeBookHandler(bookId) {
        try {
            console.log(bookId);
        const response = await fetch(`http://localhost:5000/api/products/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}


  return (
    <Card>
      <Link to={`/product/${product.name}`}>
        <img src={product.img} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.name}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>${product.amount}</Card.Text>
        <Button onClick={() => edit(product)}>Edit</Button>
        <Button onClick={() => removeBookHandler(product._id)}>Remove</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
