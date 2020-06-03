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

        case "NEW_PRODUCT_START":
            return { ...state, isFetching: true };

        case "NEW_PRODUCT_SUCCESS":
            return { ...state, isFetching: false, data: [...state.data, action.product] };

        case "NEW_PRODUCT_FAILURE":
            return { ...state, isFetching: false, errorMessage: action.error.message }
    
        default:
            return state;
    }
}