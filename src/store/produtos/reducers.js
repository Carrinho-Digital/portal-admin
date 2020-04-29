const INITIAL_STATE = {
    response: {
        data: [],
        itemsPerPage: 0,
        page: 0,
        totalPages: 0
    },
    produtoAtual: null,
    tags:[]
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "@produtos/fetch":
            return { ...state, response: action.payload }
        case "@produtos/fetch_product":            
            return { ...state, produtoAtual: action.payload }
        case "@produtos/fetch_tags":            
            return { ...state, tags: action.payload }
        case "@produtos/create_tag":            
            return { ...state, tags: [...state.tags, action.payload] }
        default:
            return state;
    }
}