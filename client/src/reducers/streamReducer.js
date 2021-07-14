import _ from "lodash";

import {
    FETCH_STREAMS,
    FETCH_STREAM,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from "../action/types";

export default (state = {}, action) => {
    // Getting a single record from the api and add it into the state object
    switch (action.type) {
        case FETCH_STREAMS:
            // the state is an object, we cannot pass the array into the object
            // mapKeys can turn the arrays into a list of objects with the key of the second argument
            // We turn the array into objects with the key of id
            // Add the key value pairs into the state
            return { ...state, ..._.mapKeys(action.payload, "id")}
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        // the action.payload here is the id itself
        // no ... to quote the entire state when we are using lodash
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default:
            return state
    }
};
