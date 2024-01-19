import URL from "./url"
import api from "./api";
export const paginate_product = async (page) => {
    const url = URL.PRODUCT.PAGINATE + "?_page=" + page;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        return error.message;
    }
}
export const detail_product = async (id) => {
    const url = URL.PRODUCT.DETAIL + id;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        return error.message;
    }
}