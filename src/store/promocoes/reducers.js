const INITIAL_STATE = {
    response: {
        data: [],
        itemsPerPage: 0,
        page: 0,
        totalPages: 0
    },
    promocaoAtual: null,
    tags:[],
    produtos:[]
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case "@promocoes/fetch":
            return { ...state, response: action.payload }
        case "@promocoes/fetch_promotion":            
            return { ...state, promocaoAtual: action.payload }
        case "@promocoes/fetch_tags":            
            return { ...state, tags: action.payload }
        case "@promocoes/fetch_products":            
            return { ...state, produtos: action.payload }
        case "@promocoes/create_tag":            
            return { ...state, tags: [...state.tags, action.payload] }
        default:
            return state;
    }
}