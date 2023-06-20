import { useState, useEffect } from 'react'
import { startBudgetUpdate, startBudgetList } from '../../reduxStore/action/Budget'
import { useDispatch, useSelector } from 'react-redux'
import { startCategoriesList, startCreateCategories } from '../../reduxStore/action/Category'
import { useHistory } from 'react-router-dom'



const Settings = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [ amount, setAmount ] = useState()

    useEffect(()=>{
        dispatch(startBudgetList())
        dispatch(startCategoriesList())
    }, [])
    const budget = useSelector((state) => {
        return state.Budget
    })

    const [ category, setCategory ] = useState()
    const categories = useSelector((state) => {
        return state.Category
    })
    
    const handleCancel = () => {
        props.history.push('/Home')
    }

    const handleUpdateCategory = (e) => {
        e.preventDefault()
        const data = {
            name: category
        }
        let has = false
        categories.forEach((ele) => {
            if(ele.name === category){
                has = true
            }
        })

        if(has){
            alert('category already exists')
        }
        else{
            const redirect = () => {
                alert('category successfully added')
                history.go(0)
            }
            dispatch(startCreateCategories(data, redirect))
        } 
    }


    const handleUpdate = (e) => {
        e.preventDefault()
        const budgetData = {
            amount: amount
        }
        const Redirect = () => {
            alert('Budget Updated')
            history.go(0)
        }
        dispatch(startBudgetUpdate(budgetData, Redirect))
    }


    return (
        <div>
            <h1>Settings</h1>
            <form className="form">
                <label>Total Budget:</label>
                <br/>
                <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button
                    onClick= {handleUpdate}
                >update</button>
                <button
                    onClick={handleCancel}
                >cancel</button>

                <br /><br />

                <label>Add a category:</label><br />
                <input
                    type="text" 
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button
                    onClick={handleUpdateCategory}
                >Add</button>
                <button
                    onClick={handleCancel}
                >cancel</button>

            </form>
        </div>
    )
}

export default Settings