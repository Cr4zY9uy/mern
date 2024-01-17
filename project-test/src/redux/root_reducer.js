import { combineReducers } from "redux";
import cart_reducer from "./cart/cart_reducer";
import order_reducer from "./order/order_reducer";

const root_reducer = combineReducers({
    cart_reducer,
    order_reducer
})

export default root_reducer;