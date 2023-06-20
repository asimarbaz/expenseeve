import { startShowCategories } from "../../reduxStore/action/Category"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { startUpdateExpense } from "../../reduxStore/action/Expense"

const DeletedExpense = (props) => {
    const {_id, title, amount, date, category } = props
    const dispatch = useDispatch()
    const [categoryData, setCategoryData] = useState("")
    useEffect(() => {
        const categoryDataReq = (data) => {
            setCategoryData(data)
        }
        dispatch(startShowCategories(category, categoryDataReq))
    }, [])
    const handleClick = (e ,id) =>{
        e.preventDefault()
        const data = {
            isDeleted:false
        }
        dispatch(startUpdateExpense(id, data))
    }
    return (
        <tr>
            <td>
                {
                    <span>{categoryData.name}</span>
                }
            </td>
            <td>{title}</td>
            <td>{amount}</td>
            <td>{date.slice(0,10)}</td>
            <td>
                <button
                    onClick={(e) => handleClick(e,_id)}
                >restore</button>
            </td>
        </tr>
    )
}

export default DeletedExpense