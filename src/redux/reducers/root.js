import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";
import { productReducer } from "./productReducer";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";

export const rootReducer = combineReducers({
    products: productsReducer,
    product: productReducer,
    users: userReducer,
    auth: authReducer,
    cart: cartReducer
});