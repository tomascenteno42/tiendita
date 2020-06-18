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
            return { ...state, isFetching: false, error: action.error };

        case "ADD_TO_CART_START":
            return { ...state, isFetching: true };

        case "ADD_TO_CART_SUCCESS":
            return { ...state, isFetching: false, data: action.product };

        case "ADD_TO_CART_FAILURE":
            return { ...state, isFetching: false, error: action.error };
            
        case "UPDATE_PRODUCT_START":
            return { ...state, isFetching: true };
        
        case "UPDATE_PRODUCT_SUCCESS":
            return { ...state, isFetching: false };
    
        case "UPDATE_PRODUCT_FAILURE":
            return { ...state, isFetching: false, error: action.error };
        
        case "DELETE_CART_PRODUCT_START":
            return {...state, isFetching: true};
        
        case "DELETE_CART_PRODUCT_SUCCESS":
            const data = state.data.filter(product => product.id !== action.product_id);
            return {...state, isFetching: false, data };
        
        case "DELETE_CART_PRODUCT_FAILURE":
            return {...state, isFetching: false, error: action.error};
        
        default:
            return state;
    }
}