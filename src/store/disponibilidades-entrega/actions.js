import { FetchUtil } from "../../util/fetch"

export const fetchDisponibilidadesEntrega = (query) => async dispatch => {
    debugger
    const http = new FetchUtil()

    const response = await http.get(`api/v1/markets/availabilities?${query}`)
    const payload = await response.json()

    return dispatch({
        type: "@disponibilidadesEntrega/fetch",
        payload
    })
}

export const getDisponibilidadeEntregaById = _id => async dispatch => {

    const http = new FetchUtil()

    const response = await http.get(`api/v1/markets/availabilities/get/${_id}`)

    if (!response.ok) {
        alert("Ocorreu um erro ao buscar o regra de entrega selecionado")
        return
    }

    const deliveryRulePayload = await response.json();

    if (!deliveryRulePayload) {
      dispatch({
          type: "@disponibilidadesEntrega/fetch_availabilitiesRule",
          payload: null
      })

      return null;
    }

    const { createdAt, updatedAt, __v, market, ...payload } = deliveryRulePayload.data

    return dispatch({
        type: "@disponibilidadesEntrega/fetch_availabilitiesRule",
        payload
    })
}

export const deleteDisponibilidadeEntrega = id => async () => {
    const http = new FetchUtil()
    return await http.delete(`api/v1/markets/availability/${id}`)
}

const formatDate = (data) => {
    return `${data}:00-${(new Date().getTimezoneOffset() / 60).toString().padStart(2,'0')}00`
}

export const insertDisponibilidadeEntrega = obj => async dispatch => {
    const http = new FetchUtil()
    // debugger
    obj.availabilities = obj.availabilities.map(item =>({

        to: formatDate(item.to),
        from: formatDate(item.from),

    }))
    const response = await http.post('api/v1/markets/availabilities', obj)
 

    if (response.ok) {
        return
    }
    console.log(await response.json())

    if (response.status === 500) {
        alert("Ocorreu um erro interno no servidor")
    }

    if (response.status === 400) {
        alert("Requisição mal formada")
    }
}

export const updateDisponibilidadeEntrega = obj => async dispatch => {
    const http = new FetchUtil()

    const { _id, market, images, ...payload } = obj

    debugger
    payload.availabilities = payload.availabilities.map(item =>({

        to: formatDate(item.to),
        from: formatDate(item.from),

    }))

    // debugger
    const response = await http.put(`api/v1/markets/availabilities/${_id}`, payload)
 

    if (response.ok) {
        return
    }

    if (response.status === 500) {
        alert("Ocorreu um erro interno no servidor")
    }

    if (response.status === 400) {
        alert("Requisição mal formada")
    }
}


export const limparForm = () => async dispatch => {
    return await dispatch({
        type: "@disponibilidadesEntrega/fetch_availabilitiesRule",
        payload: null
    })
}

