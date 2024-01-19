import USER_ACTION from "./user_action";
const updateLocalStorage = (state) => {
    localStorage.setItem("user", JSON.stringify(state));
    return state;
}
const STATE = {
    currentUser: {},
    jwt: {}
}
const initData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : STATE;

const user_reducer = (state = initData, action) => {
    switch (action.type) {
        case USER_ACTION.LOGIN: return updateLocalStorage({ ...state, currentUser: action.payload.user, jwt: action.payload.jwt });
        case USER_ACTION.REGISTER: return updateLocalStorage({ ...state, currentUser: action.payload, jwt: {} });
        case USER_ACTION.LOGOUT: return updateLocalStorage({ ...state, currentUser: {}, jwt: {} })
        default: return state;
    }
}
export default user_reducer;