const URL = {
    PRODUCT: {
        PAGINATE: 'product_paginate',
        DETAIL: 'product',
        ADD: 'product/add',
        DELETE: 'product/delete/',
        EDIT: 'product/edit/',
        DELETE_ALL: 'product/delete_all'

    },
    CATEGORY: {
        ALL: 'category',
        PAGINATE: 'category_paginate',
        DETAIL: 'category/',
        ADD: 'category/add',
        DELETE: 'category/delete/',
        EDIT: 'category/edit/',
        DELETE_ALL: 'category/delete_all'
    },
    USER: {
        LOGIN: 'login',
        REGISTER: 'register',
        REFRESH_TOKEN: 'refresh_token'
    },
    ORDER: {
        PAGINATE: 'order_paginate',
        DETAIL: 'order/',
        EDIT: 'order/edit/',
        DELETE: 'order/delete/',
        DELETE_ALL: 'order/delete_all'
    }
}
export default URL;