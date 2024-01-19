import URL from "./url"
import api from "./api";

export const add_order = async (order) => {
    const url = URL.ORDER.ADD
    try {
        const rs = await api.post(url, order)
        return rs.data;
    }
    catch (error) {
        return error.message;
    }
}

