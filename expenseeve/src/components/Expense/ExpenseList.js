import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import ReadOnly from './ReadOnly';
import Editable from './Editable';
// import { startDeleteExpense } from './action/Expense';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from'react-router-dom';
import { startListExpense } from '../../reduxStore/action/Expense';

const ExpenseList = (props) => {
    const history = useHistory()
    const dispatch =useDispatch()
    const [ editExpenseId, setEditExpenseId ] = useState(null);

    useEffect(() => {
        dispatch(startListExpense())
    },[])

    const Expenses1 = useSelector((state) => {
        return state.Expenses
    })

    const Expenses = Expenses1.filter((exp) => {
        return exp.isDeleted !== true
    })

    const handleEditClick = (e, expense) => {
        e.preventDefault()
        setEditExpenseId(expense._id)
    }

    const handleCancelClick = () => {
        setEditExpenseId(null)
    }

    const handleDeleteClick = (e, expense) => {
        e.preventDefault()
        let confirm = window.confirm('are you sure?')
        if (confirm) {
            expense.isDeleted = true
            axios.put(`http://localhost:3040/api/user/expense/${expense._id}`, expense, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
                .then((res) => {
                    history.go(0)
                    })
                .catch((err) => {
                    alert(err.message)
                    })
        }
        else{
            history.go(0)
        }
    }

    return (
        <div className='expenselist'>
            <h1>Expense List</h1>
            <div>
                <form>
                    <div className='container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Edit</th>
                                    <th>Category</th>
                                    <th>Item Name</th>
                                    <th>Amount</th>
                                    <th>Expense Date</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Expenses && Expenses.map((expense) => {
                                    return (
                                        <Fragment>
                                            { editExpenseId === expense._id ? (
                                                <Editable 
                                                    expense={expense}
                                                    handleCancelClick={handleCancelClick}
                                                />
                                            ) : (
                                                <ReadOnly
                                                    expense={expense}
                                                    handleEditClick={handleEditClick}
                                                    handleDeleteClick={handleDeleteClick}
                                                />
                                            )}
                                        </Fragment>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ExpenseList;