import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:5000/`
});
export const updateJWT = (accessToken) => {  // lần sau sử dụng api sẽ được đính kèm token vào sẵn
    api.defaults.headers.common["x_authorization"] = accessToken;
}
export default api;
