import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';
import { UserState, IdAndName, ApplicationState } from '../Store/ApplicationStore';
import { AuthApi } from '../api/AuthApi';
import { push } from 'react-router-redux';
import * as models from '../Api/models';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_ERROR = 'REGISTER_ERROR';

const LOGOUT = 'LOGOUT';

const loginRequest = createAction(LOGIN_REQUEST, (form: FormData) => form);
const loginSuccess = createAction(LOGIN_SUCCESS, (email: string) => email);
const loginError = createAction(LOGIN_ERROR, (e: Response) => e);

const registerRequest = createAction(REGISTER_REQUEST, (form: FormData) => form);
const registerSuccess = createAction(REGISTER_SUCCESS, (email: string) => email);
const registerError = createAction(REGISTER_ERROR, (e: Response) => e);

const logoutAction = createAction(LOGOUT, () => { });

export const login = (form: FormData) => (dispatch: Dispatch<UserState>, getState) => {
    let oldState: UserState = getState();

    if (!oldState.isLogged) {
        dispatch(loginRequest(form));

        AuthApi.token(form)
            .then((response: Response) => {
                if (response.status == 200) {
                    response.json().then(val => {
                        sessionStorage.setItem("accessToken", val.access_token);

                        dispatch(loginSuccess(val.username));
                    });
                } else if (response.status != 200) {
                    dispatch(loginError(response));
                }

                return response;
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
};

export const register = (form: FormData) => (dispatch: Dispatch<UserState>, getState) => {
    var oldState: ApplicationState = getState();

    if (!oldState.user.isLogged) {
        dispatch(registerRequest(form));

        AuthApi.register(form)
            .then((response: Response) => {
                if (response.status == 200) {
                    response.json().then(val => {
                        sessionStorage.setItem("accessToken", val.access_token);

                        dispatch(registerSuccess(val.username));
                    });
                    
                } else if (response.status != 200) {
                    dispatch(registerError(response));
                }

                return response;
            })
            .catch((e: Error) => {
                console.log(e, 'register Error');
            });
    }
};

export const logout = () => (dispatch: Dispatch<UserState>, getState) => {
    var oldState: ApplicationState = getState();

    console.log(oldState, "logout");

    if (oldState.user.isLogged) {
        dispatch(logoutAction());
    }
};

export const AuthTypes = {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGOUT
}
