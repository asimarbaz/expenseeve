import './App.css';
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import Home from './components/Home/Home'
import Settings from './components/Settings/Settings'
import Profile from './components/User/Profile'
import Register from './components/User/register'
import Login from './components/User/login';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { startAccountUser } from './reduxStore/action/User'
import { startBudgetList } from './reduxStore/action/Budget'
import { startCategoriesList } from './reduxStore/action/Category';
import { startListExpense } from './reduxStore/action/Expense';
import { startUserLogout } from './reduxStore/action/User';
import { startBudgetLogout } from './reduxStore/action/Budget';
import { startCategoryLogout } from './reduxStore/action/Category';
import { startLogoutExpense } from './reduxStore/action/Expense';
import DashBoard from './components/DashBoard';


function App() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [ isLoggedIn, setIsloggedIn ] = useState(false)
  const handleLoggedIn = () => { 
    setIsloggedIn(!isLoggedIn) 
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      handleLoggedIn()
      dispatch(startAccountUser())
      dispatch(startBudgetList())
      dispatch(startCategoriesList())
      dispatch(startListExpense())
    }
  }, [])


  return (
    <div className="App">
      <div className="app-name">
        <h2>expenseeve</h2>
      </div>
    { isLoggedIn ? (
      <BrowserRouter>
        <div className="navbar">
          <Link to="/">dashboard</Link>
          <Link to="/Home">Home</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/profile">Profile</Link>
          <Link to={""} 
            onClick={() => {
              let confirm = window.confirm('Are you sure ?')
              if(confirm){
                localStorage.clear()
                handleLoggedIn()
                dispatch(startUserLogout())
                dispatch(startBudgetLogout())
                dispatch(startCategoryLogout())
                dispatch(startLogoutExpense())
                history.push("/")
              }
          }}>logout</Link>
        </div>
        <div className="routes">
          <Route exact path='/' component={DashBoard}></Route>
          <Route path="/Home" component={Home}></Route>
          <Route path="/settings" component={Settings}></Route>
          <Route path="/profile" component={Profile}></Route>
        </div>
      </BrowserRouter>

    ) : (
      <BrowserRouter>
        <div className="navbar">
          <Link to="/login">login</Link>
          <Link to ="/register">register</Link>
        </div>
        <div className="routes">
          <Route exact path='/' component={DashBoard}></Route>
          <Route path="/login" component={Login }></Route>
          <Route path="/register" component={Register}></Route>
        </div>
      </BrowserRouter>
    )}
    </div>
  );
}

export default App;
