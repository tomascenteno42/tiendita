import Axios from 'axios';

const api = Axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("TOKEN");
    return {
        ...config,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }
});

export default api;