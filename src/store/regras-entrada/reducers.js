const INITIAL_STATE = {
    response: {
        data: [],
        itemsPerPage: 0,
        page: 0,
        totalPages: 0
    },
    regraEntradaAtual: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "@regrasEntrada/fetch":
            return { ...state, response: action.payload }
        case "@regrasEntrada/fetch_deliveryRule":            
            return { ...state, regraEntradaAtual: action.payload }
        default:
            return state;
    }
}