import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React,{ useContext , useState } from 'react';
import { Store } from '../Store';
import { remove } from 'firebase/database';


function Product(props) {
  const { product } = props;
      
    const [enterdName, setEnterdName] = useState(product.name);
    const [enterdAmount, setEnterdAmount] = useState(product.amount);
    const [enterdImg, setEnterdImg] = useState(product.img);
    const [enterdGenre, setEnterdGener] = useState(product.genre);
    const [enterdStore, setEnterdStore] = useState(product.store);
    const [enterdLanguage, setEnterdLanguage] = useState(product.language);
    const [enterdPages, setEnterdPages] = useState(product.pages);
  const [enterdYear, setEnterdYear] = useState(product.year);
  
  const nameChangeHendler = (event) => {
        console.log(event.target.value);
        setEnterdName(event.target.value);
    }

    const amountChangeHendler = (event) => {
        console.log(event.target.value);
        setEnterdAmount(event.target.value);
    }
    
    const imgChangeHendler = (event) => {
        console.log(event.target.value);
        setEnterdImg(event.target.value);
    }
    const genereChangeHendler = (event) => {
        console.log(event.target.value);
        setEnterdGener(event.target.value);
    }
    const storeChangeHendler = (event) => {
        console.log(event.target.value);
        setEnterdStore(event.target.value);
    }
    const languageChangeHendler = (event) => {
        console.log(event.target.value);
        setEnterdLanguage(event.target.value);
    }
    const pagesChangeHendler = (event) => {
        console.log(event.target.value);
        setEnterdPages(event.target.value);
    }

    const yearChangeHendler = (event) => {
        console.log(event.target.value);
        setEnterdYear(event.target.value);
    }
  const [error, setError] = useState('');
  
   const UpdateHandler = async (_id, name, amount, img, genre, store, language, pages, year) => {
        setError('');
        var productUpdate;
        productUpdate = {
            _id: product._id,
            name: enterdName,
            amount: enterdAmount,
            img: enterdImg,
            genre: enterdGenre,
            store: enterdStore,
            language: enterdLanguage,
            pages: enterdPages,
            year: enterdYear,
       };

       window.alert("Update Completed!");
        window.location.reload();
        await axios.post("http://localhost:5000/api/products/update", productUpdate);

    };

    async function removeBookHandler(bookId) {
        try {
            console.log(bookId);
        const response = await fetch(`http://localhost:5000/api/products/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
            
        });
            window.alert("Remove Completed!");
        window.location.reload();

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
    <Card className='details'>
      <Card.Body>
        <Card.Title className="card-title">{product.name}</Card.Title>
                <img src={product.img} className="card-img-top" alt={product.name} />
                <Card.Text className="card-text">
                    name:{" "}<br/>
                    <input type="text" value={enterdName} onChange={nameChangeHendler} />
                </Card.Text>
                <Card.Text className="card-text">
                    Amount:{" "}<br/>
                    <input type="number" value={enterdAmount} onChange={amountChangeHendler} min="0.01" step="0.01" />
        </Card.Text>
                        <Card.Text className="card-text">
                    Img:{" "}<br/>
                    <input type="url" value={enterdImg} onChange={imgChangeHendler} />
        </Card.Text>
                        <Card.Text className="card-text">
                    Genre:{" "}<br/>
                    <select type="text" value={enterdGenre} onChange={genereChangeHendler}>
                                                         <option value="action">Action</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="romantic">Romantic</option>
                                                        <option value="action">Action</option>
                                                        <option value="drama">Drama</option>
                                                        <option value="horror">Horror</option>
                                                        <option value="comedy">Comedy</option>
            <option value="adventure">Adventure</option>
          </select>
        </Card.Text>
                        <Card.Text className="card-text">
                    Store:{" "}<br/>
                    <input type="text" value={enterdStore} onChange={storeChangeHendler} />
        </Card.Text>
                        <Card.Text className="card-text">
                    Language:{" "}<br/>
                    <input type="text" value={enterdLanguage} onChange={languageChangeHendler} />
        </Card.Text>
                        <Card.Text className="card-text">
                    Pages:{""}<br/>
                    <input type="number" value={enterdPages} onChange={pagesChangeHendler} min="1" step="1"/>
                </Card.Text>
                        Year:{""}<br/>
        <input type="number" value={enterdYear} onChange={yearChangeHendler} min="1900" max="2099" />
        <br></br>
        <br></br>

        <Button onClick={() => UpdateHandler(product)}>Update</Button>
        <Button onClick={() => removeBookHandler(product._id)}>Remove</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
