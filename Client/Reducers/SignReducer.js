"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require("redux-actions");
var SignAction_1 = require("../Actions/SignAction");
exports.signReducer = function (initialState) {
    var reducerMap = (_a = {},
        _a[SignAction_1.SignActionTypes.CREATE_REQUEST] = function (state, action) {
            return state;
        },
        _a[SignAction_1.SignActionTypes.CREATE_SUCCESS] = function (state, action) {
            return state;
        },
        _a[SignAction_1.SignActionTypes.CREATE_ERROR] = function (state, action) {
            return state;
        },
        _a[SignAction_1.SignActionTypes.GET_SIGNS_REQUEST] = function (state, action) {
            return state;
        },
        _a[SignAction_1.SignActionTypes.GET_SIGNS_SUCCESS] = function (state, action) {
            return state;
        },
        _a[SignAction_1.SignActionTypes.GET_SIGNS_ERROR] = function (state, action) {
            return state;
        },
        _a[SignAction_1.SignActionTypes.GET_SIGN_REQUEST] = function (state, action) {
            return state;
        },
        _a[SignAction_1.SignActionTypes.GET_SIGN_SUCCESS] = function (state, action) {
            return state;
        },
        _a[SignAction_1.SignActionTypes.GET_SIGN_ERROR] = function (state, action) {
            return state;
        },
        _a[SignAction_1.SignActionTypes.DOWNLOAD_DOCUMENT] = function (state, action) {
            return state;
        },
        _a);
    return redux_actions_1.handleActions(reducerMap, initialState);
    var _a;
};
//# sourceMappingURL=SignReducer.js.map