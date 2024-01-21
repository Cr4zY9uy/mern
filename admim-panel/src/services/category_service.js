import URL from "./url"
import api from "./api";
export const list_category = async () => {
    const url = URL.CATEGORY.ALL;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return {};
    }
}
export const list_category_paginate = async (page) => {
    const url = URL.CATEGORY.PAGINATE + '?page=' + page;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return {};
    }
}
export const detail_category = async (id) => {
    const url = URL.CATEGORY.DETAIL + id;
    try {
        const rs = await api.get(url);
        return rs;
    }
    catch (error) {
        return {};
    }
}

export const add_category = async (category) => {
    const url = URL.CATEGORY.ADD;
    try {
        const rs = await api.post(url, category)
        return rs;
    }
    catch (error) {
        return {};
    }
}
export const edit_category = async (id, category) => {
    const url = URL.CATEGORY.EDIT + id;
    try {
        const rs = await api.put(url, category)
        return rs;
    }
    catch (error) {
        return {};
    }
}
export const delete_category = async (id) => {
    const url = URL.CATEGORY.DELETE + id;
    try {
        const rs = await api.delete(url)
        return rs;
    }
    catch (error) {
        return {};
    }
}
export const delete_category_all = async () => {
    const url = URL.CATEGORY.DELETE_ALL
    try {
        const rs = await api.delete(url)
        return rs;
    }
    catch (error) {
        return {};
    }
}
