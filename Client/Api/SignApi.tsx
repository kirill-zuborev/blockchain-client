import * as models from './models';
import * as superagent from 'superagent';

class SignService {
    create(form: FormData): Promise<Response> {
        return fetch(`http://${window.location.host}/api/sign/`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            },
            method: 'PUT',
            body: form,
        });
    }

    getSign(manifest: string): Promise<Response> {
        return fetch(`http://${window.location.host}/api/sign/${manifest}`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            },
            method: 'GET',
        });
    }

    getSigns(): Promise<Response> {
        return fetch(`http://${window.location.host}/api/sign/`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            },
            method: 'GET',
        });
    }

    download(manifest: string) {
        return fetch(`http://${window.location.host}/api/sign/download/${manifest}`, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            },
            method: 'GET',
        });
    }

    getToSign() {

    }
}

export const SignApi = new SignService();