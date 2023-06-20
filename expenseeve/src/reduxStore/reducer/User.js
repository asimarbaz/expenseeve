const initialState = []

const UserReducer = (state=initialState,action)=>{
    switch(action.type){
        case "ADD_USER":{
            return {}
        }
        case "ACCOUNT_USER":{
            return {...action.payload}
        }
        case "USER_UPDATE":{
            return {...state,...action.payload}
        }
        case "USER_LOGOUT":{
            return {}
        }
        default : {
            return state
        }
    }
}

export default UserReducer