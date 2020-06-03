import api from "../../services/api";

export function fetchUsers() {
    return async (dispatch) => {
        
        dispatch({ type: "FETCH_USERS_START" });

        try {
            const { data } = await api.get("/users");
            dispatch({ type: "FETCH_USERS_SUCCESS", users: data.users });
        } catch (error) {
            dispatch({ type: "FETCH_USERS_FAILURE", error: "There was an error loading the users" });
            throw error;
        }

    }
}
