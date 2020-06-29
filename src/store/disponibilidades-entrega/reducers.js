const INITIAL_STATE = {
    response: {
        data: [],
        itemsPerPage: 0,
        page: 0,
        totalPages: 0
    },
    disponibilidadeEntregaAtual: null

}

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case "@disponibilidadesEntrega/fetch":
            return { ...state, response: { ...INITIAL_STATE.response, data: action.payload }, disponibilidadeEntregaAtual: null }
        case "@disponibilidadesEntrega/fetch_availabilitiesRule":
            return { ...state, disponibilidadeEntregaAtual: action.payload }
        default:
            return state;
    }
}