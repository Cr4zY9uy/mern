import URL from "./url"
import api from "./api";

export const list_order = async (page) => {
    const url = URL.ORDER.PAGINATE + "?_page=" + page;
    try {
        const rs = await api.get(url)
        return rs.data;
    }
    catch (error) {
        return error.message;

    }
}
export const detail_order = async (id) => {
    const url = URL.ORDER.DETAIL + id;
    try {
        const rs = await api.get(url);
        return rs.data;
    }
    catch (error) {
        return error.message;

    }
}

export const edit_order = async (id, order) => {
    const url = URL.ORDER.EDIT + id;
    try {
        const rs = await api.put(url, order)
        return rs.data;
    }
    catch (error) {
        return error.message;
    }
}
export const delete_order = async (id) => {
    const url = URL.ORDER.DELETE + id;
    try {
        const rs = await api.delete(url)
        return rs.data;
    }
    catch (error) {
        return error.message;
    }
}