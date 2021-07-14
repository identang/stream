import { combineReducers } from "redux";
// rename the reducer to formReducer
import { reducer as formReducer} from "redux-form";
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
    auth: authReducer,
    form : formReducer, 
    streams: streamReducer
});