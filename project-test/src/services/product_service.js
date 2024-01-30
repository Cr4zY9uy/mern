import URL from "./url"
import api from "./api";
export const paginate_product = async (page) => {
    const url = URL.PRODUCT.PAGINATE + "?page=" + (page ? page : 1);
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;

    }
}
export const product_detail = async (id) => {
    const url = URL.PRODUCT.DETAIL + id;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;

    }
}
export const product_by_code = async (id, page) => {
    const url = URL.PRODUCT.BYCODE + id + "?page=" + page;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;

    }
}
export const product_by_name = async (name, page) => {
    const url = URL.PRODUCT.BYNAME + name + "?page=" + page;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;
    }
}
export const product_hot = async () => {
    const url = URL.PRODUCT.HOT
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;
    }
}
export const product_by_cate = async (name, page) => {
    const url = URL.PRODUCT.BYCATE + name + "?page=" + page;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return error.response;
    }
}