import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import ExpenseReducer from '../reducer/Expense'
import UserReducer from '../reducer/User'
import CategoriesReducer from '../reducer/Category'
import BudgetReducer from '../reducer/Budget'

const configureStore = () => {
    const store = createStore(combineReducers({
        Expenses: ExpenseReducer,
        User: UserReducer,
        Category: CategoriesReducer,
        Budget: BudgetReducer
    }), applyMiddleware(thunk))
    return store
}

export default configureStore