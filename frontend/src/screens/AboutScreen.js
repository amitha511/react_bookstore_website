import { useState,useEffect } from "react";
import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: 200
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 2,
  },
}));
function AboutScreen() {
  const [result, setResult] = useState();
    let data = [];

    async function groupby(book) {
        
            try{
            const response = await fetch('/api/products/grouped-by-category')
            data = await response.json();
            console.log(data);
                setResult(<div>
                    <br></br>
                    <br></br>

        <TableContainer align='center'>
      <Table sx={{ maxWidth: 50 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="laft">Category</StyledTableCell>
            <StyledTableCell align="laft">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,index) => (
             <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">{row.category}</StyledTableCell>
              <StyledTableCell align="right">{row.count}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></div>);
        } catch (error) {
        console.error(error);
        }
    }


  return (
      <div className="screen">
          <div align='center'>
           <h4 className="primary-text">
            About us:
              </h4>
                            </div>

          <p className="primary-text">
                  Bookshop.org began as an idea to help support bookstores and their communities as
                  more and more people are buying their books online.
                  We saw an opportunity to create an alternative to Amazon for socially-conscious online
                  shoppers. Amazon sells over 60% of all books in the US and is growing.
                  That shift threatens the future of bookstores and will hurt
                  readers, authors, and publishers who rely on a diverse, healthy ecosystem for books.
                  

          </p>
          <div align='center'>
          <button className="primary-button"  onClick={groupby}>Groupby genre</button>
              </div>

    {result}

          
    </div>
    );
  
}

export default AboutScreen;