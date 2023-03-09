import React, { useEffect, useReducer, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../App.css'
import ListProduct from '../components/ListProduct';
import './AdminScreen.css';

const AdminScreen = () => {
 
    const [enterdName, setEnterdName] = useState("");
    const [enterdAmount, setEnterdAmount] = useState("");
    const [enterdImg, setEnterdImg] = useState("");
    const [enterdGenre, setEnterdGener] = useState("");
    const [enterdStore, setEnterdStore] = useState("");
    const [enterdLanguage, setEnterdLanguage] = useState("");
    const [enterdPages, setEnterdPages] = useState("");
    const [enterdYear, setEnterdYear] = useState("");

        async function addExpenseHendler(book) {
            console.log(book);
            const response = await fetch('http://localhost:5000/api/products/addProduct', {
                method: 'POST',
                body: JSON.stringify(book),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response;
            console.log(data);
        }

    const submitHendler = (event) => { 
        event.preventDefault();  //prevent from page reload
        const product = {
            amount: enterdAmount,
            img: enterdImg,
            name: enterdName,
            genre: enterdGenre,
            store: enterdStore,
            language: enterdLanguage,
            pages: enterdPages,
            year:enterdYear,

        }
        console.log(product);
        addExpenseHendler(product);
        setEnterdName("");
        setEnterdAmount("");
        setEnterdImg("");
        setEnterdStore("");
        setEnterdGener("");
        setEnterdLanguage("");
        setEnterdPages("");
        setEnterdYear("");

        
    }

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

    
    
    

    return (
        <div>
        <Row>
            <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                            <ListGroup.Item>
                                    <Container>

                        <form onSubmit={submitHendler}>
        
                            <div className='new-expense_controls'>      
                            <Row>                     
                            <Col md={3} className='new-expense_control'> 
                                <label>Name</label><br/>
                                <input type="text" value={enterdName} onChange={nameChangeHendler}/>
                            </Col>
                            <Col md={3} className='new-expense_control'>
                                <label>Amount</label><br/>
                                <input type="number" value={enterdAmount} onChange={amountChangeHendler} min="0.01" step="0.01" />
                            </Col>
                            <Col md={3} className='new-expense_control'>
                                <label>Img</label><br/>
                                <input type="text" value={enterdImg} onChange={imgChangeHendler}/>
                            </Col>
                            <Col md={3} className='new-expense_control'>
                                <label>Genre</label><br/>
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
                            </Col>
                            </Row>
                            <Row>
                            <Col md={3} className='new-expense_control'>
                                <label>Store</label><br/>
                                <input type="text" value={enterdStore} onChange={storeChangeHendler}/>
                            </Col>
                            <Col md={3} className='new-expense_control'>
                                <label>Language</label><br/>
                                <input type="text" value={enterdLanguage} onChange={languageChangeHendler}/>
                            </Col>
                            <Col md={3} className='new-expense_control'>
                                <label>Pages</label><br/>
                                <input type="text" value={enterdPages} onChange={pagesChangeHendler} min="1" step="1"/>
                            </Col>
                            <Col md={3} className='new-expense_control'>
                                <label>Year</label><br/>
                                <input type="text" value={enterdYear} onChange={yearChangeHendler} min="1900" max="2099"/>
                            </Col>
                            </Row>                             
                            </div>
                            
                                        <Button type="submit">add expense</Button> 
                                
                                    </form>   
                                        </Container>

                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                    </Card>

                </Row>
    <br></br>
    <ListProduct></ListProduct>
        </div>
        
    );
}


export default AdminScreen;