import React, { useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase/Firebase";
function AdminScreen() {


//   async function addExpenseHendler(newbook) {  
//     console.log(newbook);
//     const response = await fetch('http://localhost:5000/addProduct', {
//       method: 'POST',
//       body: JSON.stringify(newbook),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     const data = await response;
//     console.log(data);           
//   }

  return (
    <div>
          <p>hi</p>
    </div>       
  );
}

export default AdminScreen;