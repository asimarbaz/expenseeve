import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { startUpdateExpense } from "../../reduxStore/action/Expense";
import { startCategoriesList, startShowCategories } from "../../reduxStore/action/Category";


const Editable = ({
    expense,
    handleCancelClick
    }) => {
        const history = useHistory()
        const dispatch = useDispatch()
        const [ title, setTitle ] = useState(expense.title)
        const [ amount, setAmount ] = useState(expense.amount)
        const [ date, setDate ] = useState(expense.date.slice(0,10))
        const [ category, setCategory ] = useState(expense.category)

        useEffect(() => {
          dispatch(startShowCategories())
          dispatch(startCategoriesList())
        },[])

        const categories = useSelector((state) => {
          return state.Category
        })

        const handleSubmit = (e) => {
            e.preventDefault()
            const updatedData = {
                title: title,
                amount: amount,
                date: date,
                category:category
            }
            dispatch(startUpdateExpense(expense._id, updatedData))
            history.go(0)
        }
    return (
      <tr>
        <td></td>
        <td>
          <select
            required="required"
            placeholder="Enter a category..."
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">select</option>
            {categories && categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
          </select>
        </td>
        <td>
          <input
            type="text"
            required="required"
            placeholder="Enter an item name..."
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            
          ></input>
        </td>
        <td>
          <input
            type="number"
            required="required"
            placeholder="Enter an amount..."
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </td>
        <td>
          <input
            type="date"
            required="required"
            placeholder="Enter a date..."
            name="date"
            value = {date}
            onChange = {(e) => setDate(e.target.value)}
          ></input>
        </td>
        <td>
          <button type="submit" onClick={handleSubmit}>Save</button>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </td>
      </tr>
    );
  };

  export default Editable;