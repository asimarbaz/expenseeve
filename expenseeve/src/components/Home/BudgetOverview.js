import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startListExpense } from "../../reduxStore/action/Expense"
import { startBudgetList } from "../../reduxStore/action/Budget"

const BudgetOverview = (props) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startBudgetList())
        dispatch(startListExpense())
    },[])
    const Expenses = useSelector((state) => {
        return state.Expenses
    })
    const NotDeletedExpenses = Expenses.filter((exp) => {
        return !exp.isDeleted
    })

    const budget = useSelector((state) => {
        return state.Budget
    })

    let TotalBudget
    let MoneySpent
    let percentage
    if(budget && NotDeletedExpenses){
        TotalBudget = budget.amount
        MoneySpent = NotDeletedExpenses.reduce((pv,cv)=> {
            return  pv + cv.amount
        },0)
        percentage = ((MoneySpent/TotalBudget)*100).toFixed(2)
    }
    const data = [
        { name:'remaining budget', value:(TotalBudget-MoneySpent)},
        { name:'expense', value:MoneySpent}
    ]
    return (    
        <div>
            <h3>Budget Overview</h3>
            {budget.amount ? <h4>Total Budget: Rs {TotalBudget}/- </h4>:<h3>Add Budget</h3>}
            {MoneySpent && <h4>Total Expenses: Rs {MoneySpent}/- </h4>}<br/>
            {percentage ? <h4>{ percentage } % money spent</h4> : <h4>Add budget to calculate the percentage</h4>}

        </div>
    )
}

export default BudgetOverview