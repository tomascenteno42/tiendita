import api from "../../services/api";

export function fetchProducts() {
    return async (dispatch) => {
        dispatch({ type: "FETCH_PRODUCTS_START" });
        try {
            const { data } = await api.get("/products");
            dispatch({ type: "FETCH_PRODUCTS_SUCCESS", products: data });
    
        } catch (error) {
            dispatch({ type: "FETCH_PRODUCTS_FAILURE", error: "There was an error loading the products" });
            throw error;
        }
    }
}

export function newProduct(data) {
    return async (dispatch) => {
        
        dispatch({ type: "NEW_PRODUCT_START" });
        try {
            const res = await api.post("/products", data);
            dispatch({ type: "NEW_PRODUCT_SUCCESS", product: res.data });
            
        } catch (error) {
            dispatch({ type: "NEW_PRODUCT_FAILURE", error });
            throw error;
        }

    }
}

export function fetchProductById(product_id) {
    return async (dispatch) => {
        dispatch({ type: "FETCH_PRODUCT_START" });
        try {
            const res = await api.get(`/products/${product_id}`);
            dispatch({ type: "FETCH_PRODUCT_SUCCESS", product: res.data });
        } catch (error) {
            dispatch({ type: "FETCH_PRODUCT_FAILURE", error });
            throw error;
        }
    }
}
