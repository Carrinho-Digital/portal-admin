import { FetchUtil } from "../../util/fetch"
import CookieUtil from "../../util/cookie"

export const getPerfil = () => async () => {
    var http = new FetchUtil()

    const userInfoResponse = await http.get(`api/v1/users/current`)

    if (!userInfoResponse.ok) {
        alert("Ocorreu um erro ao obter os dados do usuário!")
        return
    }

    const payload = await userInfoResponse.text()
    CookieUtil.set("UserInfo", payload, 3.5)
}

export const updatePerfil = e => async () => {
    var http = new FetchUtil()

    const { isDeleted, createdAt, updatedAt, type, online, favorites, freeDelivery, addresses, __v, deliveryAvailabilities, _id, deliveryRules, paymentMethods, ...payload } = e

    const response = await http.put(`api/v1/users`, payload)

    if (!response.ok) {
        alert("Ocorreu um erro ao obter os dados do usuário!")
        return
    }
    getPerfil()
}