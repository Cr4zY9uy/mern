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
export const logout = async () => {
    const url = URL.USER.LOGOUT;
    try {
        const rs = await api.post(url)
        return rs;
    }
    catch (error) {
        return {};
    }
}
export const refreshToken = async () => {
    const url = URL.USER.REFRESH_TOKEN;
    try {
        const rs = await api.post(url, {
            refreshToken: JSON.parse(localStorage.getItem("user")).jwt.refresh_token
        });
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        currentUser.jwt.access_token = rs.data.accessToken;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } catch (error) {
        console.error('Refresh token failed:', error.message);
    }
}
function scheduleTokenRefresh() {
    const refreshInterval = 5 * 60 * 1000;
    refreshToken();
    setInterval(refreshToken, refreshInterval);
}
if (JSON.parse(localStorage?.getItem("user"))?.jwt?.access_token) {
    scheduleTokenRefresh();
}