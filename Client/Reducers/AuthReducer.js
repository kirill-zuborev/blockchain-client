"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require("redux-actions");
var AuthAction_1 = require("../Actions/AuthAction");
exports.authReducer = function (initialState) {
    var reducerMap = (_a = {},
        _a[AuthAction_1.AuthTypes.LOGIN_SUCCESS] = function (state, action) {
            //history.pushState(state, 'LOGIN_SUCCESS', '/');
            return Object.assign({}, state, {
                isLogged: true,
                user: {
                    email: action.payload
                }
            });
        },
        _a[AuthAction_1.AuthTypes.LOGIN_ERROR] = function (state, action) {
            return Object.assign({}, state, {});
        },
        _a[AuthAction_1.AuthTypes.LOGIN_REQUEST] = function (state, action) {
            return state;
        },
        _a[AuthAction_1.AuthTypes.REGISTER_SUCCESS] = function (state, action) {
            return Object.assign({}, state, {
                isLogged: true,
                user: {
                    email: action.payload
                }
            });
        },
        _a[AuthAction_1.AuthTypes.REGISTER_ERROR] = function (state, action) {
            return state;
        },
        _a[AuthAction_1.AuthTypes.REGISTER_REQUEST] = function (state, action) {
            return state;
        },
        _a[AuthAction_1.AuthTypes.LOGOUT] = function (state, action) {
            //history.pushState(state, 'LOGOUT', '/');
            sessionStorage.removeItem("accessToken");
            return Object.assign({}, state, {
                isLogged: false,
                user: null
            });
        },
        _a);
    return redux_actions_1.handleActions(reducerMap, initialState);
    var _a;
};
//# sourceMappingURL=AuthReducer.js.map