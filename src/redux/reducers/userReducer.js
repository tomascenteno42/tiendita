const initialState = {
    data: []
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_USERS_START":
            return {...state, isFetching: true};
        case "FETCH_USERS_SUCCESS":
            return { ...state, isFetching: false, data: action.users };
        case "FETCH_USERS_FAILURE":
            return {...state, isFetching: false, error: action.error };
        default:
            return state;
    }
}