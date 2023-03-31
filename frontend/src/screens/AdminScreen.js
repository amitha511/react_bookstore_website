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
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MenuAdmi from '../components/MenuAdmi';
import io from 'socket.io-client';

const AdminScreen = () => {
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
    const [enterdName, setEnterdName] = useState("");
    const [enterdAmount, setEnterdAmount] = useState("");
    const [enterdImg, setEnterdImg] = useState("");
    const [enterdGenre, setEnterdGener] = useState("");
    const [enterdStore, setEnterdStore] = useState("");
    const [enterdLanguage, setEnterdLanguage] = useState("");
    const [enterdPages, setEnterdPages] = useState("");
    const [enterdYear, setEnterdYear] = useState("");
    const [List, setList] = useState(<ListProduct></ListProduct>);

    
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

            setList(<ListProduct></ListProduct>)
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
        window.location.reload();


        
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
        <div className='screenAdmin'>
            <MenuAdmi></MenuAdmi>
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
                                <TextField required type="text" label="Name" value={enterdName} onChange={nameChangeHendler}/>
                            </Col>
                            <Col md={3} className='new-expense_control'>
                                <TextField required type="number" label="Amount" value={enterdAmount} onChange={amountChangeHendler} min="0.01" step="0.01" />
                            </Col>
                            <Col md={3} className='new-expense_control'>
                                <TextField type="text" label="Image" value={enterdImg} onChange={imgChangeHendler}/>
                            </Col>
                            <Col md={3} className='new-expense_control'>
                                <label>Genre</label><br/>
                                                    <Select  type="text" value={enterdGenre} onChange={genereChangeHendler} label="Genre">
                                                        <MenuItem value="action">Action</MenuItem >
                                <MenuItem  value="fantasy">Fantasy</MenuItem >
                                <MenuItem  value="romantic">Romantic</MenuItem >
                                                        <MenuItem  value="action">Action</MenuItem >
                                                        <MenuItem  value="drama">Drama</MenuItem >
                                                        <MenuItem  value="horror">Horror</MenuItem >
                                                        <MenuItem  value="comedy">Comedy</MenuItem >
                                                          <MenuItem  value="adventure">Adventure</MenuItem >
                                </Select >
                            </Col>
                            </Row>
                            <Row>
                            <Col md={3} className='new-expense_control'><br/>
                                <TextField type="text"  label="Store" value={enterdStore} onChange={storeChangeHendler}/>
                            </Col>
                            <Col md={3} className='new-expense_control'>
                                <br/>

                                <TextField type="text"  label="Language" value={enterdLanguage} onChange={languageChangeHendler}/>
                            </Col>
                            <Col md={3} className='new-expense_control'>
                               <br/>
                                <TextField type="number"  label="Pages" value={enterdPages} onChange={pagesChangeHendler} min="1" step="1"/>
                            </Col>
                            <Col md={3} className='new-expense_control'>
                                <br/>
                                <TextField type="number" label="Year" value={enterdYear} onChange={yearChangeHendler} min="1900" max="2099"/>
                            </Col>
                            </Row>                             
                            </div>
                            <br/>
                                <Button type="submit">add expense</Button>
                                </form>   
                            </Container>

                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                    </Card>

                </Row>
            <br></br>
            <section>{List}</section>
        </div>
        
    );
}


export default AdminScreen;