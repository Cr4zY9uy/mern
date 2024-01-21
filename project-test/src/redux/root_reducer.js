import { combineReducers } from "redux";
import cart_reducer from "./cart/cart_reducer";
import order_reducer from "./order/order_reducer";
import product_reducer from "./product/product_reducer";
const root_reducer = combineReducers({
    cart_reducer,
    order_reducer,
    product_reducer
})

export default root_reducer;