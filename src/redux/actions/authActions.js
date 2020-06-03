import api from "../../services/api";

export const loginAction = (credentials) => {
    return async (dispatch) => {
        dispatch({ type: "LOGIN_REQUEST_START" })
        
        try {
            const res = api.post("/auth/login", credentials);
            dispatch({ type: "LOGIN_REQUEST_SUCCESS", data: res.data });

        } catch (error) {
            dispatch({ type: "LOGIN_REQUEST_FAILURE", error });
            console.log(error);
            throw error;
        }
    }
}

export const registerAction = (credentials) => {
    return async (dispatch) => {

        dispatch({ type: "REGISTER_USER_START" })


        try {
            const res = await api.post("/auth/register", credentials);
            dispatch({ type: "REGISTER_USER_SUCCESS", data: res.data });
            return res.data;
            
        } catch (error) {
            dispatch({ type: "REGISTER_USER_FAILURE", error });
            throw error;
        }

    }
}


export const getAuthenticatedUserAction = () => {
    return async (dispatch) => {

        dispatch({ type: "ME_REQUEST_START" });

        try {
            const res = await api.get("/auth/me");
            dispatch({ type: "ME_REQUEST_SUCCESS" });
            console.log(res);
            return res.data.user;

        } catch (error) {
            dispatch({ type: "ME_REQUEST_FAILURE" });
            throw error;
        }

    }
}

export const logout = () => ({
    type: "LOGOUT"
})
