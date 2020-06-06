import { FetchUtil } from "../../util/fetch"

export const fetchRegrasEntrega = (query) => async dispatch => {

    const http = new FetchUtil()

    const response = await http.get(`api/v1/markets/rules?${query}`)
    const payload = await response.json()

    return dispatch({
        type: "@regrasEntrega/fetch",
        payload
    })
}

export const getRegraEntregaById = _id => async dispatch => {

    const http = new FetchUtil()

    const response = await http.get(`api/v1/markets/rules/${_id}`)

    if (!response.ok) {
        alert("Ocorreu um erro ao buscar o regra de entrega selecionado")
        return
    }

    const deliveryRulePayload = await response.json();

    if (!deliveryRulePayload) {
      dispatch({
          type: "@regrasEntrega/fetch_deliveryRule",
          payload: null
      })

      return null;
    }

    const { createdAt, updatedAt, __v, market, ...payload } = deliveryRulePayload

    return dispatch({
        type: "@regrasEntrega/fetch_deliveryRule",
        payload
    })
}

export const deleteRegraEntrega = id => async () => {
    const http = new FetchUtil()
    return await http.delete(`api/v1/markets/rules/${id}`)
}

export const insertRegraEntrega = obj => async () => {
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

export const updateRegraEntrega = obj => async () => {
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
