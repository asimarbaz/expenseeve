import axios from 'axios'


export const startBudgetCreate = (id) => {
    return (dispatch) => {
        axios.post('http://localhost:3040/api/user/budget', {user:id}, {
            headers:{
                Authorization: localStorage.getItem('token')
            }
        })
             .then((res) => {
                const budgetData = res.data
                dispatch(budgetCreate(budgetData))
             })
             .catch((err) => {
                alert(err.message)
             })
    }
}

const budgetCreate = (data)=>{
    return {
        type:"BUDGET_CREATE",
        payload:data
    }
}


export const startBudgetList = () => {
    return (dispatch) => {
        axios.get('http://localhost:3040/api/user/budget', {
            headers:{
                Authorization: localStorage.getItem('token')
            }
        })
             .then((res) => {
                const budgetData = res.data
                dispatch(budgetList(budgetData))
             })
             .catch((err) => {
                alert(err.message)
             })
    }
}

const budgetList = (data)=>{
    return {
        type:"BUDGET_LIST",
        payload:data
    }
}


export const startBudgetUpdate = (requestData, Redirect) => {
    return (dispatch) => {
        axios.put('http://localhost:3040/api/user/budget', requestData, {
            headers:{
                Authorization: localStorage.getItem('token')
            }
        })
             .then((res) => {
                const budgetData = res.data
                dispatch(budgetUpdate(budgetData))
                Redirect()
             })
             .catch((err) => {
                alert(err.message)
             })
    }
}

const budgetUpdate = (data) => {
    return {
        type:"BUDGET_UPDATE",
        payload:data
    }
}


export const startBudgetDestroy = ()=>{
    return (dispatch)=>{
        axios.delete("http://localhost:3040/api/user/budget",{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
            .then((response)=>{
                const budgetData = response.data
                dispatch(budgetDestroy(budgetData))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const budgetDestroy = (data)=>{
    return {
        type:"BUDGET_DESTROY",
        payload:data
    }
}

export const startBudgetLogout = ()=>{
    return {
        type:"BUDGET_LOGOUT"
    }
}