import { EOL } from 'os';

import CookieManager from './cookie';

export class FetchUtil {

    authorized = true;
    baseURL = process.env.REACT_APP_API_URL;
    headers = new Headers();

    getRequestAtual(url, method, body) {
        if (this.authorized && !this.headers.get("Authorization")) {
            this.headers.append("Authorization", CookieManager.get("Authorization"));
        }
        if (!this.headers.get("Content-Type")) {
            this.headers.append("Content-Type", 'application/json');
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

    static async tratarBodyResponse(response, body) {
        debugger
        let mensagemErro = null;

        switch (response.status) {
            case 400:
                if (!body) {
                    alert("Ocorreu um erro!")
                    return;
                }

                const { errors, message } = body;

                if (errors) {
                    const keys = Object.keys(errors);

                    mensagemErro = (keys || []).map(key => {
                        const prop = body[key];

                        if (!prop) return undefined

                        return prop.message;
                    }).join(EOL);
                } else {
                    if (message) {
                        mensagemErro = message;
                    }
                }
                break;
            case 404:
                mensagemErro = "Erro 404, recurso não encontrado!";
                break;
            case 500:
                mensagemErro = "Ocorreu um erro interno no servidor!"
                break
            default:
                if (body && body.message) {
                    mensagemErro = body.message;
                }
        }

        if (mensagemErro) {
            alert(mensagemErro);
        }
    }
}