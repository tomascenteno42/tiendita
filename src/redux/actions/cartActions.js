import api from "../../services/api";

export function fetchCartProducts() {
    return async (dispatch) => {
        dispatch({ type: "FETCH_CART_START" });
        try {
            const { data } = await api.get("/cart");
            dispatch({ type: "FETCH_CART_SUCCESS", products: data });
            
    
        } catch (error) {
            dispatch({ type: "FETCH_CART_FAILURE", error: "There was an error loading the cart" });
            throw error;
        }
    }
}

export function addProductToCart(data, product_id) {
    return async (dispatch) => {
        dispatch({ type: "ADD_TO_CART_START" });

        try {
            const res = api.post(`/cart/${product_id}`, data);
            dispatch({ type: "ADD_TO_CART_SUCCESS", product: res.data });
        } catch (error) {
            dispatch({ type: "ADD_TO_CART_FAILURE" });
        }
    }
}

export function updateProduct(product_id, quantity) {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_PRODUCT_START" });

        try {
            const res = await api.patch(`/cart/${product_id}`, {quantity});
            dispatch({ type: "UPDATE_PRODUCT_SUCCESS", res});

        } catch (error) {
            dispatch({ type: "UPDATE_PRODUCT_FAILURE", error });
        }
    }
}
