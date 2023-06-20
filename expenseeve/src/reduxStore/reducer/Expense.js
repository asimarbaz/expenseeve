const initialState = []

const ExpenseReducer = (state=initialState,action)=>{
    switch(action.type){
        case "ADD_EXPENSE":{
            return [...state,action.payload]
        }
        case "LIST_EXPENSE" : {
            return [...action.payload]
        }
        case "EDIT_EXPENSE" : {
            return state.map((expense)=>{
                if(expense._id===action.payload._id){
                    return {...expense,...action.payload}
                }else{
                    return {...expense}
                }
            })
        }
        case "CLEAR_EXPENSE" :{
            return state.filter((expense)=>{
                return expense._id !== action.payload
            })
        }
        case "LOGOUT_EXPENSE" : {
            return []
        }
        default : {
            return [...state]
        }
    }
}

export default ExpenseReducer