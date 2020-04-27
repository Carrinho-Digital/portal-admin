import { FetchUtil } from "../../util/fetch"
import CookieUtil from "../../util/cookie"

export const login = user => async () => {
    
    var http = new FetchUtil()
    http.authorized = false;

    const response = await http.post('api/v1/auth/login/market', user)
    const payload = await response.json()

    if(response.status === 404){
        alert("Login inválido!")
        return
    }

    if(response.status !== 200){
        alert("Ocorreu um erro ao fazer login!")
        return
    }

    CookieUtil.set("Authorization", payload.token, 3.5)
}