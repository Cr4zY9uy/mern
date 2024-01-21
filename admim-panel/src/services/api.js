import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:5000/`
});
api.defaults.headers.common["x_authorization"] = `${JSON.parse(localStorage.getItem("user")).jwt.access_token}`;

export default api;
