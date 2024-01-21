import PRODUCT_ACTION from "./product_action";
const updateLocalStorage = (state) => {
    localStorage.setItem("product", JSON.stringify(state));
    return state;
}
const STATE = {
    product: []
}
const initData = localStorage.getItem("product") ? JSON.parse(localStorage.getItem("product")) : STATE;


const product_reducer = (state = initData, action) => {
    switch (action.type) {
        case PRODUCT_ACTION.ADD_PRODUCT: return updateLocalStorage({ ...state, product: action.payload });
        default: return state;
    }
}
export default product_reducer;