import { useState } from "react"
import { useSelector } from "react-redux"
import DeletedExpense from "./DeletedExpense"
import {Button} from 'antd'

const DeletedExpenseList = (props) => {
    const Expenses = useSelector((state) => {
        return state.Expenses
    })
    const deletedExpenses = Expenses.filter((exp) => {
        return exp.isDeleted
    })
    const [toggle, setToggle] = useState(false)
    const handleClick = () => {
        setToggle(!toggle)
    }
    return (
        <div>
            <Button
                type="primary"
                onClick={handleClick}
                style={{margin:"20px"}}
            >{!toggle ? "Show Deleted Expenses": "Hide Deleted Expenses"}</Button>
            <div className={toggle ? "deleted":""}>
                <table
                    style={{marginBottom:"20px"}}
                >
                    {toggle &&
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Item Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>}
                    <tbody>
                        {toggle && deletedExpenses.length > 0 && deletedExpenses.map((exp) => {
                            return  <DeletedExpense {...exp} key={exp._id}/>        
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
} 

export default DeletedExpenseList