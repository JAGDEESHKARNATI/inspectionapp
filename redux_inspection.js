import {
    createStore,
    applyMiddleware
} from 'redux'

import thunk from 'redux-thunk'

//Actions
const SAVE_INSPECTION_RESULT_STARTED='SAVE_INSPECTION_RESULT_STARTED'
const SAVE_INSPECTION_RESULT_SUCCESS='SAVE_INSPECTION_RESULT_SUCCESS'
const SAVE_INSPECTION_RESULT_FAIL='SAVE_INSPECTION_RESULT_FAIL'

//Action creators
export const saveInspectionResultStarted=()=>{
    return {
        type:SAVE_INSPECTION_RESULT_STARTED
    }
}

export const saveInspectionResultSuccess=(inspectionResults)=>{
    return {
        type:SAVE_INSPECTION_RESULT_SUCCESS,
        inspectionResults
    }
}

export const saveInspectionResultFail=(error)=>{
    return {
        type:SAVE_INSPECTION_RESULT_FAIL,
        error
    }
}

//Async thunk action
export function saveInspection(inspectionResult){
    return function(dispatch){
        dispatch(saveInspectionResultStarted())
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method:"POST",
            body:inspectionResult
        })
        .then((response)=>response.json())
        .then((users)=>{
            dispatch(saveInspectionResultSuccess(users))
        })
        .catch((err)=>{
            dispatch(saveInspectionResultFail(err))
        })
    }
}

//Reducer
var inspections=(state={},action)=>{
    switch(action.type){
        case SAVE_INSPECTION_RESULT_STARTED:
            return {
                inspections:[],
                loading:true,
                error:null
            }
        case SAVE_INSPECTION_RESULT_SUCCESS:
            return {
                inspections:action.inspections,
                loading:false,
                error:null
            }
        case SAVE_INSPECTION_RESULT_FAIL:
            return {
                inspections:[],
                loading:false,
                error:action.error
            }
        default:
            return state;
    }
}

//Store
export const store=createStore(inspections,applyMiddleware(thunk))