import { FetchUtil } from "../../util/fetch"

export const fetchProdutos = (query) => async dispatch => {

    const http = new FetchUtil()

    const response = await http.get(`api/v1/products?${query}`)
    const payload = await response.json()

    dispatch({
        type: "@produtos/fetch",
        payload
    })
}

export const getProdutoById = _id => async dispatch => {

    const http = new FetchUtil()

    const response = await http.get(`api/v1/products/market/${_id}`)

    if (!response.ok) {
        alert("Ocorreu um erro ao buscar o produto selecionado")
        return
    }

    const { createdAt, updatedAt, __v, market, ...payload } = await response.json()



    dispatch({
        type: "@produtos/fetch_product",
        payload
    })
}

export const deleteProduto = id => async () => {
    const http = new FetchUtil()
    await http.delete(`api/v1/products/${id}`)
}

export const insertProduto = obj => async () => {
    const http = new FetchUtil()
    const response = await http.post('api/v1/products/', obj)

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

export const updateProduto = obj => async () => {
    const http = new FetchUtil()

    const { _id, market, ...payload } = obj

    const response = await http.put(`api/v1/products/${_id}`, payload)

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

export const changeInactive = (productId, inactive = false) => async () => {
    const http = new FetchUtil()

    const inactiveBody = {
        inactive,
    };

    await http.patch(`api/v1/products/inactive/${productId}`, inactiveBody);
}

export const searchTags = () => async dispatch => {
    const http = new FetchUtil()

    const response = await http.get(`api/v1/markets/tags`)

    if (!response.ok) {
        alert("Ocorreu um erro ao buscar as tags!")
        return
    }

    const obj = await response.json()
    return dispatch({ type: "@produtos/fetch_tags", payload: obj.data })
}

export const createTag = name => async dispatch => dispatch({ type: "@produtos/create_tag", payload: name })