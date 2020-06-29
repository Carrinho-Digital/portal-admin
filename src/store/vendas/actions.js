import { actionTypes } from "./reducers";
import { FetchUtil } from "../../util/fetch";

export const fetchVendas = (query) => async dispatch => {
  const url = !query 
    ? `api/v1/markets/sales` 
    : `api/v1/markets/sales?${query}`;

  const http = new FetchUtil();

  const response = await http.get(url);
  const vendas = await response.json();

  return dispatch({
    type: actionTypes.FETCH_VENDAS,
    vendas,
  })
}

export const fetchVendaById = (vendaId) => async dispatch => {
  const url = `api/v1/markets/sales/${vendaId}`;
  const http = new FetchUtil();

  const response = await http.get(url);
  const venda = await response.json();

  return dispatch({
    type: actionTypes.FETCH_VENDA_DETALHES,
    venda,
  })
}