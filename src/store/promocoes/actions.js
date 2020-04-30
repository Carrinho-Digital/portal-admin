import { FetchUtil } from "../../util/fetch"

export const fetchPromocoes = (query) => async dispatch => {

    const http = new FetchUtil()

    const response = await http.get(`api/v1/promotions?${query}`)
    const payload = await response.json()

    return dispatch({
        type: "@promocoes/fetch",
        payload
    })
}

export const getPromocaoById = _id => async dispatch => {

    const http = new FetchUtil()

    const response = await http.get(`api/v1/promotions/${_id}`)

    if (!response.ok) {
        alert("Ocorreu um erro ao buscar a promoção selecionada")
        return
    }

    const payload = await response.json()

    return dispatch({
        type: "@promocoes/fetch_promotion",
        payload
    })
}

export const deletePromocao = id => async () => {
    const http = new FetchUtil()
    return await http.delete(`api/v1/promotions/${id}`)
}

export const insertPromocao = obj => async () => {
    const http = new FetchUtil()

    var { startDate, endDate, ...payload } = obj

    if (!payload.undefinedTime) {
        payload = { ...payload, startDate, endDate }
    }

    const response = await http.post('api/v1/promotions/', payload)

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

export const updatePromocao = obj => async () => {
    const http = new FetchUtil()

    var { startDate, endDate, _id, product, createdAt, updatedAt, market, __v, discountInPrice, ...payload } = obj

    if (!payload.undefinedTime) {
        payload = { ...payload, startDate, endDate }
    }

    const response = await http.put(`api/v1/promotions/${_id}`, payload)

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

export const searchTags = () => async dispatch => {
    const http = new FetchUtil()

    const response = await http.get(`api/v1/markets/tags`)

    if (!response.ok) {
        alert("Ocorreu um erro ao buscar as tags!")
        return
    }

    const obj = await response.json()
    return dispatch({ type: "@promocoes/fetch_tags", payload: obj.data })
}

export const createTag = name => async dispatch => dispatch({ type: "@promocoes/create_tag", payload: name })