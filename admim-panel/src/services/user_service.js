import URL from "./url"
import api from "./api";

export const login = async (user) => {
    const url = URL.USER.LOGIN;
    try {
        const rs = await api.post(url, user)
        return rs;
    }
    catch (error) {
        return {};
    }
}