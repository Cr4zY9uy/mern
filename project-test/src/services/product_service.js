import URL from "./url"
import api from "./api";
export const paginate_product = async (page) => {
    const url = URL.PRODUCT.PAGINATE + "?page=" + (page ? page : 1);
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return {};
    }
}
export const product_by_code = async (id) => {
    const url = URL.PRODUCT.BYCODEANDNAME + '?id=' + id;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return {};
    }
}
export const product_by_name = async (name) => {
    const url = URL.PRODUCT.BYCODEANDNAME + '?name=' + name;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return {};
    }
}
export const product_hot = async () => {
    const url = URL.PRODUCT.HOT
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return {};
    }
}
export const product_by_cate = async (name) => {
    const url = URL.PRODUCT.BYCATE + name
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return {};
    }
}