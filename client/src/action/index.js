import streams from "../apis/streams"
import history from "../history";
import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from "./types";


export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

//create a new stream following the RESTful convention
// we can create all the action creator at one time
export const createStream = formValues => async (dispatch, getState) => {
    // get the state from the auth, plug out the userId
    const { userId } = getState().auth;
    // the type of response from the api follows the REST convention
    const response = await streams.post("/streams",{ ...formValues, userId});
    // Only care abou the data inside the response
    dispatch({ type:CREATE_STREAM, payload: response.data });
    // Do some programmatic navigation to get the user back to the root route
    // Pushes a new entry onto the history stack
    // The user will go to the path passed into push()
    history.push("/")
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get("/streams");

    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });   
};

// Put request: replace ALL properties of a record
// Patch request: Update SOME propeties of a record
export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({ type:EDIT_STREAM, payload: response.data })
    // push the user back to the navigation page
    history.push("/")
};

export const deleteStream =  (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({type: DELETE_STREAM, payload: id });
    history.push("/")
}