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

        default:
            return state;
    }
}