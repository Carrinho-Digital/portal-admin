const INITIAL_STATE = {
    logged : false
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "@conta/login":
            return { ...state, logged: true }
        default:
            return state;
    }
}