import Axios from 'axios';

const api = Axios.create({
    baseURL: 'http://localhost:8080/api/v1'
})

export default api;