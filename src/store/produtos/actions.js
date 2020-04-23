import { FetchUtil } from "../../util/fetch"
import CookieUtil from "../../util/cookie"

export const fetchProdutos = (page = 0, limit) => async dispatch => {

    const http = new FetchUtil()

    const userDataJson = CookieUtil.get("UserData");

    if (!userDataJson) {
        alert("Erro ao buscar produtos!")
        return
    }

    const { _id } = JSON.parse(userDataJson)

    const response = await http.get(`api/v1/products/market/${_id}?page=${page}&limit=${limit}`)
    const payload = await response.json()

    dispatch({
        type: "@produtos/fetch",
        payload
    })
}

export const getProdutoById = _id => async dispatch => {
    debugger
    const http = new FetchUtil()

    const response = await http.get(`api/v1/products/${_id}`)

    if (!response.ok) {
        alert("Ocorreu um erro ao buscar o produto selecionado")
        return
    }

    const payload = await response.json()

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