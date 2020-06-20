export const actionTypes = {
  FETCH_VENDAS: '@vendas/fetch',
  FETCH_VENDA_DETALHES: '@vendas/fetch_detalhes'
};

const INITIAL_STATE = {
  vendas: {
    data: [],
    page: 0,
    totalPages: 0,
    itemsPerPage: 0,
  },
  venda: null
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionTypes.FETCH_VENDAS: {
      return {
        ...state,
        vendas: action.vendas,
      }
    }
    case actionTypes.FETCH_VENDA_DETALHES: {
      return {
        ...state, 
        venda: action.venda,
      }
    }
    default:
      return state;
  }
}