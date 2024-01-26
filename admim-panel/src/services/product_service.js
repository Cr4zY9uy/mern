import URL from "./url"
import api from "./api";
export const paginate_product = async (page) => {
    const url = URL.PRODUCT.PAGINATE + "?page=" + page;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return {};
    }
}
export const detail_product_code = async (id) => {
    const url = URL.PRODUCT.DETAIL + id;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return {};

    }
}
export const detail_product_name = async (name) => {
    const url = URL.PRODUCT.DETAIL + "?name=" + name;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return {};

    }
}
export const add_product = async (product) => {
    const url = URL.PRODUCT.ADD;
    try {
        const rs = await api.post(url, product)
        return rs;
    }
    catch (error) {
        return {};
    }
}
export const edit_product = async (id, product) => {
    const url = URL.PRODUCT.EDIT + id;
    try {
        const rs = await api.put(url, product)
        return rs;
    }
    catch (error) {
        return {};
    }
}
export const delete_product_id = async (id) => {
    const url = URL.PRODUCT.DELETE_ID + id;
    try {
        const rs = await api.delete(url)
        return rs;
    }
    catch (error) {
        return {};

    }
}
export const delete_product_all = async () => {
    const url = URL.PRODUCT.DELETE_ALL;
    try {
        const rs = await api.delete(url)
        return rs;
    }
    catch (error) {
        return {};

    }
}
export const delete_product_list = async () => {
    const url = URL.PRODUCT.DELETE_LIST;
    try {
        const rs = await api.delete(url)
        return rs;
    }
    catch (error) {
        return {};

    }
}