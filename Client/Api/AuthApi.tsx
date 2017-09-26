import * as models from './models';
import * as superagent from 'superagent';

class AuthService {
    private apiPath: string;

    constructor() {
        this.apiPath = `http://${window.location.host}/api/auth`;
    }

    token(form: FormData): Promise<any> {
        return fetch(`${this.apiPath}/token`, {
            method: 'POST',
            body: form,
        });
    }

    register(form: FormData): Promise<any> {
        return fetch(`${this.apiPath}/register`, {
            method: 'POST',
            body: form,
        });
    }
}

export const AuthApi = new AuthService();