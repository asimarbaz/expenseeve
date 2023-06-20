import axios from "axios"
import omit from "lodash/omit"

export const startCreateCategories = (data, redirect) => {
    return (dispatch) => {
        axios.post("http://localhost:3040/api/user/category", data, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((res) => {
                const category = res.data           
                dispatch(createCategories(category))
                redirect()            
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const createCategories = (data) => {
    return {
        type: "CREATE_CATEGORY",
        payload: data
    }
}


export const startCategoriesList = () => {
    return (dispatch) => {
        axios.get("http://localhost:3040/api/user/category", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const categories = response.data
                dispatch(listCategories(categories))               
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
const listCategories = (data) => {
    return {
        type: "LIST_CATEGORY",
        payload: data
    }
}

export const startUpdateCategories = (requestData) => {
    const data = omit(requestData, ["id"])
    return (dispatch) => {
        axios.put(`http://localhost:3040/api/user/category/${requestData.id}`, data, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const categories = response.data
                dispatch(updateCategories(categories))
                //requestData.resolve && requestData.resolve()
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const updateCategories = (data) => {
    return {
        type: "UPDATE_CATEGORY",
        payload: data
    }
}

export const startShowCategories = (id, CategoryDataReq)=>{
    return (dispatch)=>{
        axios.get(`http://localhost:3040/api/user/category/${id}`,{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        })
            .then((response)=>{
                const Data = response.data
                CategoryDataReq(Data)
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}


export const startDestroyCategies = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3040/api/user/category/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((res) => {
                const category = res.data
                dispatch(destroyCategies(category))
            })
            .catch((err) => {
                alert(err.message)
            })

    }
}
const destroyCategies = (data)=>{
    return {
        type:"DESTROY_CATEGORY",
        payload:data
    }
}

export const startCategoryLogout = ()=>{
    return {
        type : "LOGOUT_CATEGORY"
    }
}