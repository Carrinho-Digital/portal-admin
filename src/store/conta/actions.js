import { FetchUtil } from "../../util/fetch"
import CookieUtil from "../../util/cookie"

export const login = user => async () => {
    debugger
    const http = new FetchUtil()

    const response = await http.post('api/v1/auth/login', user)
    const payload = await response.json()

    CookieUtil.set("Authorization", payload.token, 3)
}