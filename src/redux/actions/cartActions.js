import api from "../../services/api";

export function fetchCartProducts(user_id) {
    return async (dispatch) => {
        dispatch({ type: "FETCH_CART_START" });
        try {
            const { data } = await api.get(`/auth/${user_id}/cart`);
            dispatch({ type: "FETCH_CART_SUCCESS", products: data });
            
    
        } catch (error) {
            dispatch({ type: "FETCH_CART_FAILURE", error: "There was an error loading the cart" });
            throw error;
        }
    }
}

export function addProductToCart(user_id, data) {
    return async (dispatch) => {
        dispatch({ type: "ADD_TO_CART_START" });

        try {
            const res = api.post(`/auth/${user_id}/cart`, data);
            dispatch({ type: "ADD_TO_CART_SUCCESS", product: res.data });
        } catch (error) {
            dispatch({ type: "ADD_TO_CART_FAILURE" });
        }
    }
}

export function updateProduct(user_id, product_id, quantity) {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_PRODUCT_START" });

        try {
            const res = await api.patch(`/auth/${user_id}/cart/${product_id}`, {quantity});
            dispatch({ type: "UPDATE_PRODUCT_SUCCESS", res});

        } catch (error) {
            dispatch({ type: "UPDATE_PRODUCT_FAILURE", error });
        }
    }
}
