const initialState = {
    user: null,
    token: localStorage.getItem("TOKEN"),
    isAuthenticated() {
        return this.user !== null && this.token !== null;
    }
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
 
        case "LOGIN_REQUEST_START":
            return { ...state, isFetching: true };

        case "LOGIN_REQUEST_SUCCESS":
            localStorage.setItem("TOKEN", action.data.token)
            return { ...state, isFetching: false, token: action.data.token, user: action.data.user };

        case "LOGIN_REQUEST_FAILURE":
            return { ...state, isFetching: false, error: action.error };  

        case "REGISTER_USER_START":
            return { ...state, isFetching: true };

        case "REGISTER_USER_SUCCESS":
            localStorage.setItem("TOKEN", action.data.token);
            return { ...state, isFetching: false, user: action.data.user, token: action.data.token };

        case "REGISTER_USER_FAILURE":
            return { ...state, isFetching: false, error: action.error };

        case "ME_REQUEST_START":
            return { ...state, isFetching: true };

        case "ME_REQUEST_SUCCESS":
            return { ...state, isFetching: false, user: action.data };

        case "ME_REQUEST_FAILURE":
            return { ...state, isFetching: false, error: action.error };

        case "LOGOUT":
            localStorage.removeItem("TOKEN");
            return{ ...state, user: null, token: null };
        
        default:
            return state;
    }   
}