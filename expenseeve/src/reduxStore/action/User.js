import axios from 'axios'
import omit from "lodash/omit"

export const startRegisterUser = (data, resetForm, redirect) => {
    return (dispatch) => {
        axios.post('http://localhost:3040/api/user/register', data)
             .then((res) => {
                const user = res.data
                dispatch(addUser(user))
                redirect(user._id)
                resetForm()
             })
             .catch((err) => {
                alert(err.message)
             })
    }
}

const addUser = (user) => {
    return {
        type: 'ADD_USER',
        payload: user
    }
}


export const startLoginUser = (data, resetForm, redirect) => {
    return (dispatch) => {
        axios.post('http://localhost:3040/api/user/login', data)
             .then((res) => {
                const token = res.data
                if(res.data.token){
                    localStorage.setItem('token', res.data.token)
                    resetForm()
                    redirect()
                }
                else{
                    alert('invalid email or password')
                }
             })
             .catch((err) => {
                alert(err.message)
             })
    }
}

export const startAccountUser = () => {
    return (dispatch) => {
        axios.get('http://localhost:3040/api/user/account', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
             .then((res) => {
                const user = res.data
                dispatch(accountUser(user))
             })
             .catch((err) => {
                alert(err.message)
             })
    }
}

const accountUser = (user) => {
    return {
        type:'ACCOUNT_USER',
        payload: user
    }
}


export const startUserUpdate = (id, reqData, redirect)=>{
    const data = omit(reqData, ["_id","password"])   
    return (dispatch)=>{
        axios.put(`http://localhost:3040/api/user/account/${id}`, data,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
            .then((response)=>{
                const user = response.data
                dispatch(updateUser(user))
                //resetForm()
                redirect()
            })
            .catch((err)=>{
                alert(err.message)
            })
    }
}
const updateUser = (data)=>{
    return {
        type:"USER_UPDATE",
        payload:data
    }
}

export const  startUserLogout = ()=>{
    return {
        type:"USER_LOGOUT"
    }
}
