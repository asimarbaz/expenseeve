const initialState = []

const BudgetReducer = (state=initialState,action)=>{
    switch(action.type){
        case "BUDGET_CREATE":{
            return {...action.payload}
        }
        case "BUDGET_LIST":{
            return {...action.payload}
        }
        case "BUDGET_UPDATE" :{
            return { ...state,...action.payload }
        }
        case "BUDGET_LOGOUT" :{
            return {}
        }
        default :{
            return state
        }
    }
}

export default BudgetReducer