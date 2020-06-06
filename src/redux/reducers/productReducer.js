const initialState = {
    data: {}
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_PRODUCT_START":
            return { ...state, isFetching: true };

        case "NEW_PRODUCT_SUCCESS":
            return { ...state, isFetching: false, data: action.product };

        case "NEW_PRODUCT_FAILURE":
            return { ...state, isFetching: false, errorMessage: action.error.message };

        case "FETCH_PRODUCT_START":
            return { ...state, isFetching: true };

        case "FETCH_PRODUCT_SUCCESS":
            return { ...state, isFetching: false, data: action.product };

        case "FETCH_PRODUCT_FAILURE":
            return { ...state, isFetching: false, error: action.error };
            
        default:
            return state;
    }
}