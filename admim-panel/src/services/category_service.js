import URL from "./url"
import api from "./api";
export const list_category = async () => {
    const url = URL.CATEGORY.ALL;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        return error.message;
    }
}
export const detail_category = async (id) => {
    const url = URL.CATEGORY.DETAIL + id;
    try {
        const rs = await api.get(url);
        return rs.data.products;
    }
    catch (error) {
        return error.message;
    }
}

export const add_category = async (category) => {
    const url = URL.CATEGORY.ADD;
    try {
        const rs = await api.post(url, category)
        return rs.data;
    }
    catch (error) {
        return error.message;
    }
}
export const edit_category = async (id, category) => {
    const url = URL.CATEGORY.EDIT + id;
    try {
        const rs = await api.put(url, category)
        return rs.data;
    }
    catch (error) {
        return error.message;
    }
}
export const delete_category = async (id) => {
    const url = URL.CATEGORY.DELETE + id;
    try {
        const rs = await api.delete(url)
        return rs.data;
    }
    catch (error) {
        return error.message;
    }
}
