import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";
import { cartReducer } from "./cartReducer";

export const rootReducer = combineReducers({
    products: productsReducer,
    users: userReducer,
    auth: authReducer,
    cart: cartReducer
});