import URL from "./url"
import api from "./api";
export const list_category = async () => {
    const url = URL.CATEGORY.ALL;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;

    }
}
export const detail_category = async (id) => {
    const url = URL.CATEGORY.DETAIL + id;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;

    }
}

