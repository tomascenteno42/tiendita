import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
    products: productsReducer,
    users: userReducer,
    auth: authReducer
});