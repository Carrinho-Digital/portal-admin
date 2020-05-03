import CookieManager from './cookie';

export class FetchUtil {

    authorized = true;
    baseURL = process.env.REACT_APP_API_URL;
    headers = new Headers();

    getRequestAtual(url, method, body, isFormData = false) {
        if (this.authorized && !this.headers.has("Authorization")) {
            this.headers.set("Authorization", `Bearer ${CookieManager.get("Authorization")}`);
        }

        if (!isFormData && !this.headers.has("Content-Type")) {
            this.headers.set("Content-Type", 'application/json');
        }

        const headers = this.headers;

        return new Request(`${this.baseURL}/${url}`, {
            method,
            body: isFormData ? body :JSON.stringify(body),
            headers
        })
    }

    async post(url, body, isFormData = false) {

        let response = await fetch(this.getRequestAtual(url, 'POST', body, isFormData));

        this.tratarResponse(response)

        return response;
    }

    setHeader(headerName, headerValue) {
      this.headers.set(headerName, headerValue);
    }

    tratarResponse(response) {
        if (response.status === 401) {
            alert("Não autorizado!");
            CookieManager.remove("Authorization");
            window.location.href = '/login'
        }

        if (response.status === 500) {
            alert("Ocorreu um erro interno no servidor!")
        }
    }

    async put(url, body, isFormData = false) {
        let response = await fetch(this.getRequestAtual(url, 'PUT', body, isFormData));

        this.tratarResponse(response);

        return response;
    }

    async patch(url, body) {
        let response = await fetch(this.getRequestAtual(url, 'PATCH', body));

        this.tratarResponse(response);

        return response;
    }

    async get(url) {
        let response = await fetch(this.getRequestAtual(url, 'GET'));

        this.tratarResponse(response);

        return response;
    }

    async delete(url) {
        let response = await fetch(this.getRequestAtual(url, 'DELETE'));

        this.tratarResponse(response);

        return response;
    }

    if(mensagemErro) {
        alert(mensagemErro);
    }
}
