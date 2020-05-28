import { FetchUtil } from "../../util/fetch"

export const fetchRegrasEntrada = (query) => async dispatch => {

    const http = new FetchUtil()

    const response = await http.get(`api/v1/deliveryRules?${query}`)
    const payload = await response.json()

    return dispatch({
        type: "@regrasEntrada/fetch",
        payload
    })
}

export const getRegraEntradaById = _id => async dispatch => {

    const http = new FetchUtil()

    const response = await http.get(`api/v1/deliveryRules/market/${_id}`)

    if (!response.ok) {
        alert("Ocorreu um erro ao buscar o regra de entrada selecionado")
        return
    }

    const deliveryRulePayload = await response.json();

    if (!deliveryRulePayload) {
      dispatch({
          type: "@regrasEntrada/fetch_deliveryRule",
          payload: null
      })

      return null;
    }

    const { createdAt, updatedAt, __v, market, ...payload } = deliveryRulePayload

    return dispatch({
        type: "@regrasEntrada/fetch_deliveryRule",
        payload
    })
}

export const deleteRegraEntrada = id => async () => {
    const http = new FetchUtil()
    return await http.delete(`api/v1/markets/rules/${id}`)
}

export const insertRegraEntrada = obj => async () => {
    const http = new FetchUtil()
    const response = await http.post('api/v1/markets/rules', obj)

    if (response.ok) {
        return
    }

    if (response.status == 500) {
        alert("Ocorreu um erro interno no servidor")
    }

    if (response.status == 400) {
        alert("Requisição mal formada")
    }
}

export const updateRegraEntrada = obj => async () => {
    const http = new FetchUtil()

    const { _id, market, images, ...payload } = obj

    const response = await http.put(`api/v1/markets/rules/${_id}`, payload)

    if (response.ok) {
        return
    }

    if (response.status == 500) {
        alert("Ocorreu um erro interno no servidor")
    }

    if (response.status == 400) {
        alert("Requisição mal formada")
    }
}
