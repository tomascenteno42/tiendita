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
