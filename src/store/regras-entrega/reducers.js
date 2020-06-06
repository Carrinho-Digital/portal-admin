const INITIAL_STATE = {
    response: {
        data: [],
        itemsPerPage: 0,
        page: 0,
        totalPages: 0
    },
    regraEntregaAtual: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "@regrasEntrega/fetch":
            return { ...state, response: action.payload }
        case "@regrasEntrega/fetch_deliveryRule":            
            return { ...state, regraEntregaAtual: action.payload }
        default:
            return state;
    }
}