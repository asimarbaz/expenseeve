const initialState = []

const CategoriesReducer = (state=initialState,action)=>{
    switch(action.type){
        case "CREATE_CATEGORY": {
            return [...state,action.payload]
        }
        case "LIST_CATEGORY" : {
            return [...action.payload]
        }
        case "UPDATE_CATEGORY" :{
            return state.map((category)=>{
                if(category._id===action.payload._id){
                    return {...category,...action.payload}
                }else{
                    return {...category}
                }
            })
        }
        case "DESTROY_CATEGORY" : {
            return state.filter((category)=>{
                return category._id !== action.payload._id
            })
        }
        case "LOGOUT_CATEGORY":{
            return []
        }
        default :{
            return [...state]
        }
    }
}

export default CategoriesReducer