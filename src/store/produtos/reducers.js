const INITIAL_STATE = {
    response: {
        data: [],
        itemsPerPage: 0,
        currentPage: 0,
        totalPages: 0
    },
    produtoAtual: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "@produtos/fetch":
            return { ...state, response: action.payload }
        case "@produtos/fetch_product":
            debugger
            return { ...state, produtoAtual: action.payload }
        default:
            return state;
    }
}