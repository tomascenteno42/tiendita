const initialState = {
    data: []
}

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PRODUCTS_START":
            return { ...state, isFetching: true };

        case "FETCH_PRODUCTS_SUCCESS":
            return { ...state, isFetching: false, data: action.products };

        case "FETCH_PRODUCTS_FAILURE":
            return { ...state, isFetching: false, errorMessage: action.error.message }

        default:
            return state;
    }
}