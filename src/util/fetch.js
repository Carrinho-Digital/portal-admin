import CookieManager from './cookie';

export class FetchUtil {

    authorized = true;
    baseURL = process.env.REACT_APP_API_URL;
    headers = new Headers();

    getRequestAtual(url, method, body) {
        if (this.authorized && !this.headers.has("Authorization")) {
            this.headers.set("Authorization", `Bearer ${CookieManager.get("Authorization")}`);
        }
        if (!this.headers.has("Content-Type")) {
            this.headers.set("Content-Type", 'application/json');
        }

        const headers = this.headers;

        return new Request(`${this.baseURL}/${url}`, {
            method,
            body: JSON.stringify(body),
            headers
        })
    }

    async post(url, body) {
        let response = await fetch(this.getRequestAtual(url, 'POST', body));

        this.tratarResponse(response)

        return response;
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

    async put(url, body) {
        let response = await fetch(this.getRequestAtual(url, 'PUT', body));

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
