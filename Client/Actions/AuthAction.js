"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require("redux-actions");
var AuthApi_1 = require("../api/AuthApi");
var LOGIN_REQUEST = 'LOGIN_REQUEST';
var LOGIN_SUCCESS = 'LOGIN_SUCCESS';
var LOGIN_ERROR = 'LOGIN_ERROR';
var REGISTER_REQUEST = 'REGISTER_REQUEST';
var REGISTER_SUCCESS = 'REGISTER_SUCCESS';
var REGISTER_ERROR = 'REGISTER_ERROR';
var LOGOUT = 'LOGOUT';
var loginRequest = redux_actions_1.createAction(LOGIN_REQUEST, function (form) { return form; });
var loginSuccess = redux_actions_1.createAction(LOGIN_SUCCESS, function (email) { return email; });
var loginError = redux_actions_1.createAction(LOGIN_ERROR, function (e) { return e; });
var registerRequest = redux_actions_1.createAction(REGISTER_REQUEST, function (form) { return form; });
var registerSuccess = redux_actions_1.createAction(REGISTER_SUCCESS, function (email) { return email; });
var registerError = redux_actions_1.createAction(REGISTER_ERROR, function (e) { return e; });
var logoutAction = redux_actions_1.createAction(LOGOUT, function () { });
exports.login = function (form) { return function (dispatch, getState) {
    var oldState = getState();
    if (!oldState.isLogged) {
        dispatch(loginRequest(form));
        AuthApi_1.AuthApi.token(form)
            .then(function (response) {
            if (response.status == 200) {
                response.json().then(function (val) {
                    sessionStorage.setItem("accessToken", val.access_token);
                    dispatch(loginSuccess(val.username));
                });
            }
            else if (response.status != 200) {
                dispatch(loginError(response));
            }
            return response;
        })
            .catch(function (e) {
            console.log(e);
        });
    }
}; };
exports.register = function (form) { return function (dispatch, getState) {
    var oldState = getState();
    if (!oldState.user.isLogged) {
        dispatch(registerRequest(form));
        AuthApi_1.AuthApi.register(form)
            .then(function (response) {
            if (response.status == 200) {
                response.json().then(function (val) {
                    sessionStorage.setItem("accessToken", val.access_token);
                    dispatch(registerSuccess(val.username));
                });
            }
            else if (response.status != 200) {
                dispatch(registerError(response));
            }
            return response;
        })
            .catch(function (e) {
            console.log(e, 'register Error');
        });
    }
}; };
exports.logout = function () { return function (dispatch, getState) {
    var oldState = getState();
    console.log(oldState, "logout");
    if (oldState.user.isLogged) {
        dispatch(logoutAction());
    }
}; };
exports.AuthTypes = {
    LOGIN_REQUEST: LOGIN_REQUEST,
    LOGIN_SUCCESS: LOGIN_SUCCESS,
    LOGIN_ERROR: LOGIN_ERROR,
    REGISTER_REQUEST: REGISTER_REQUEST,
    REGISTER_SUCCESS: REGISTER_SUCCESS,
    REGISTER_ERROR: REGISTER_ERROR,
    LOGOUT: LOGOUT
};
//# sourceMappingURL=AuthAction.js.map