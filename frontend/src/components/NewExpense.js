import React from "react";
// import './NewExpense.css';
import ExpenseForm from "./ExpenseForm";
import Product from "./Product"



const NewExpense = (props) => {

    const saveExpenseDataHandler = (enteredExpenseData) => {
    
        const ExpenseData = {
            ...enteredExpenseData,
            id: Math.random().toString()
        };

        console.log(Product);
        props.onAddExpense(Product);
    }

    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData = {saveExpenseDataHandler} ></ExpenseForm>
        </div>
    );
}

export default NewExpense;