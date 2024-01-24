import axios from "axios";
const api = axios.create({
    baseURL: `http://localhost:5000/`
});
if (JSON.parse(localStorage?.getItem("user"))?.jwt?.access_token) {
    api.defaults.headers.common["x-authorization"] = `${JSON.parse(localStorage.getItem("user")).jwt.access_token}`;
}

export default api;
