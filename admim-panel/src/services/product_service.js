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
export const add_product = async (product) => {
    const url = URL.PRODUCT.ADD;
    try {
        const rs = await api.post(url, product)
        return rs.data;
    }
    catch (error) {
        return error.message;
    }
}
export const edit_product = async (id, product) => {
    const url = URL.PRODUCT.EDIT + id;
    try {
        const rs = await api.put(url, product)
        return rs.data;
    }
    catch (error) {
        return error.message;
    }
}
export const delete_product = async (id) => {
    const url = URL.PRODUCT.DELETE + id;
    try {
        const rs = await api.delete(url)
        return rs.data;
    }
    catch (error) {
        return error.message;
    }
}