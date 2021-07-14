import { SIGN_IN, SIGN_OUT } from "../action/types";

const INITAL_STATE = { 
    // capital letter = true constant object --> should never change it 
    isSignedIn: null,
    userId: null // will be updated when we sign in
}

export default (state = INITAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            // change the state , the userId is sourced from the payload of the action
            return {...state, isSignedIn: true, userId: action.payload};
        case SIGN_OUT:
            // clear the userId when people sign out
            return {...state, isSignedIn : false, userId: null};
            
        default:
            return state;
    }
};