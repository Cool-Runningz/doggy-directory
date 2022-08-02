import { useEffect, useState, useReducer } from "react";

const initialReducerState = {
    data: [],
    loading: false,
    error: null
}

const ActionType = {
    FETCH: 'FETCH_INIT',
    SUCCESS: 'FETCH_SUCCESS',
    ERROR: 'FETCH_ERROR'
}

const reducerFunction = (state, action) => {
    switch (action.type) {
        case ActionType.FETCH:{
            return {
                ...state,
                loading: true,
            }
        }
        case ActionType.SUCCESS:{
            return {
                data: action.payload,
                loading: false,
                error: null
            }
        }
        case ActionType.ERROR: {
            return {
                ...state,
                loading: false,
                error: action.errorMessage
            }
        }
        default:
            return state
    }
}

const useFetchReducer = (initialUrl, options) => {
    const [url, setUrl] = useState(initialUrl);
    const [reducerState, dispatch] = useReducer(reducerFunction, initialReducerState);

    useEffect(() => {
       if(!url) return

        //Create async function
        const fetchData = async () => {
            dispatch({ type: ActionType.FETCH })
            try {
                const response = await fetch(url, options)
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
                const json = await response.json()
                dispatch({ type: ActionType.SUCCESS, payload: json})

            } catch (error) {
                //This catches the error if either of the promises fail
                dispatch({ type: ActionType.ERROR, errorMessage: error.message})
            }
        }

        fetchData()

    }, [url, options]);

    return [{ ...reducerState }, setUrl];
}

export default useFetchReducer
