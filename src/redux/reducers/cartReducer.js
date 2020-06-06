const initialState = {
    data: []
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_CART_START":
            return { ...state, isFetching: true };

        case "FETCH_CART_SUCCESS":
            return { ...state, isFetching: false, data: action.products };

        case "FETCH_CART_FAILURE":
            return { ...state, isFetching: false, errorMessage: action.error.message }
        case "ADD_TO_CART_START":
            return { ...state, isFetching: true };

        case "ADD_TO_CART_SUCCESS":
            return { ...state, isFetching: false, data: action.product };

        case "ADD_TO_CART_FAILURE":
            return { ...state, isFetching: false, error: action.error };
            
        default:
            return state;
    }
}