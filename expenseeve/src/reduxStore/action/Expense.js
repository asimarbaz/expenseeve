import axios from 'axios'
import omit from "lodash/omit"

export const startCreateExpense = (data, resetForm, redirect) => {
    return (dispatch) => {
        axios.post('http://localhost:3040/api/user/expense', data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
             .then((res) => {
                const expense = res.data
                dispatch(createExpense(expense))
                resetForm()
                redirect()
             })
             .catch((err) => {
                alert(err.message)
             })
    }
}

const createExpense = (data) => {
    return {
        type:'ADD_EXPENSE',
        payload: data
    }
}


export const startListExpense = () => {
    return (dispatch) => {
        axios.get("http://localhost:3040/api/user/expense", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((res) => {
                const data = res.data
                dispatch(listExpense(data))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const listExpense = (data) => {
    return {
        type: "LIST_EXPENSE" ,
        payload: data
    }
}


export const startUpdateExpense = (id, reqData) => {
    const data = omit(reqData,["_id"])
    return (dispatch) => {
        axios.put(`http://localhost:3040/api/user/expense/${id}`, data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
             .then((res) => {
                const expense = res.data
                dispatch(updateExpense(expense))
             })
             .catch((err) => {
                alert(err.message)
             })
    }
}

const updateExpense = (data) => {
    return {
        type:'EDIT_EXPENSE',
        payload: data
    }
}



export const startDeleteExpense = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3040/api/expense/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
             .then((res) => {
                const Expense = res.data
                dispatch(deleteExpense(Expense))
             })
             .catch((err) => {
                alert(err.message)
             })
    }
}

const deleteExpense = (data) => {
    return {
        type:'CLEAR_EXPENSE',
        payload: data
    }
}

export const startLogoutExpense = () => {
    return {
        type: "LOGOUT_EXPENSE"
    }
}


