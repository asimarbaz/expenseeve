import { useSelector, useDispatch } from "react-redux";
import AddExpense from "../Expense/AddExpense";
import BudgetOverview from "./BudgetOverview";
import CategoryWise from "./CategoryWise";
import ExpenseList from "../Expense/ExpenseList";
import { useEffect } from "react";
import { startAccountUser } from "../../reduxStore/action/User";
import DeletedExpenseList from './DeletedExpenseList'


const Home = (props) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(startAccountUser())
    },[])

    const user = useSelector((state)=>{
        return state.User
    })

    //console.log(users)
    return (
        <div>
            <div className="home-page">
                
                <div className="budget-overview">
                    <BudgetOverview  user={user}/>
                </div>
                <div className="category-wise">
                    <CategoryWise />
                </div>
            </div>
            <div>
                <AddExpense />
            </div>
            <div>
                <ExpenseList />
            </div>
            <div>
                <DeletedExpenseList />
            </div>
        </div>
    )
}

export default Home;