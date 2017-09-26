"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require("redux-actions");
var SignApi_1 = require("../api/SignApi");
var CREATE_REQUEST = 'CREATE_REQUEST';
var CREATE_SUCCESS = 'CREATE_SUCCESS';
var CREATE_ERROR = 'CREATE_ERROR';
var GET_SIGNS_REQUEST = 'GET_SIGNS_REQUEST';
var GET_SIGNS_SUCCESS = 'GET_SIGNS_SUCCESS';
var GET_SIGNS_ERROR = 'GET_SIGNS_ERROR';
var GET_SIGN_REQUEST = 'GET_SIGN_REQUEST';
var GET_SIGN_SUCCESS = 'GET_SIGN_SUCCESS';
var GET_SIGN_ERROR = 'GET_SIGN_ERROR';
var DOWNLOAD_DOCUMENT = 'DOWNLOAD_DOCUMENT';
var createRequest = redux_actions_1.createAction(CREATE_REQUEST, function (form) { return form; });
var createSuccess = redux_actions_1.createAction(CREATE_SUCCESS, function (manifest) { return manifest; });
var createError = redux_actions_1.createAction(CREATE_ERROR, function () { });
var getSignsRequest = redux_actions_1.createAction(GET_SIGNS_REQUEST, function () { });
var getSignsSuccess = redux_actions_1.createAction(GET_SIGNS_SUCCESS, function (signs) { return signs; });
var getSignsError = redux_actions_1.createAction(GET_SIGNS_ERROR, function () { });
var getSignRequest = redux_actions_1.createAction(GET_SIGN_REQUEST, function () { });
var getSignSuccess = redux_actions_1.createAction(GET_SIGN_SUCCESS, function (signState) { return signState; });
var getSignError = redux_actions_1.createAction(GET_SIGN_ERROR, function () { });
var downloadDocument = redux_actions_1.createAction(DOWNLOAD_DOCUMENT, function (manifest) { return manifest; });
var create = function (form) { return function (dispatch) {
    dispatch(createRequest(form));
    SignApi_1.SignApi.create(form)
        .then(function (response) {
        if (response.status == 200) {
            response.json().then(function (val) {
                console.log(val, "create Action");
                dispatch(createSuccess(val));
            });
        }
        else if (response.status == 400) {
            dispatch(createError());
        }
    })
        .catch(function (e) { return console.log(e); });
}; };
var getSigns = function (isMySign) { return function (dispatch) {
    dispatch(getSignsRequest());
    SignApi_1.SignApi.getSigns()
        .then(function (response) {
        if (response.status == 200) {
            response.json().then(function (val) {
                console.log(val, "getSigns Action");
                dispatch(getSignsSuccess(val));
            });
        }
        else if (response.status == 400) {
            dispatch(getSignsError());
        }
    })
        .catch(function (e) { return console.log(e); });
}; };
var getSign = function (manifest) { return function (dispatch) {
    dispatch(getSignRequest());
    SignApi_1.SignApi.getSign(manifest)
        .then(function (response) {
        if (response.status == 200) {
            response.json().then(function (val) {
                console.log(val, "getSign Action");
                dispatch(getSignSuccess(val));
            });
        }
        else if (response.status == 400) {
            dispatch(getSignError());
        }
    })
        .catch(function (e) { return console.log(e); });
}; };
var download = function (manifest) { return function (dispatch) {
    SignApi_1.SignApi.download(manifest)
        .then(function (response) {
        if (response.status == 200) {
            dispatch(downloadDocument(manifest));
        }
    })
        .catch(function (e) { return console.log(e); });
}; };
exports.SignActionTypes = {
    CREATE_REQUEST: CREATE_REQUEST,
    CREATE_SUCCESS: CREATE_SUCCESS,
    CREATE_ERROR: CREATE_ERROR,
    GET_SIGNS_REQUEST: GET_SIGNS_REQUEST,
    GET_SIGNS_SUCCESS: GET_SIGNS_SUCCESS,
    GET_SIGNS_ERROR: GET_SIGNS_ERROR,
    GET_SIGN_REQUEST: GET_SIGN_REQUEST,
    GET_SIGN_SUCCESS: GET_SIGN_SUCCESS,
    GET_SIGN_ERROR: GET_SIGN_ERROR,
    DOWNLOAD_DOCUMENT: DOWNLOAD_DOCUMENT
};
exports.SignAction = {
    create: create,
    getSigns: getSigns,
    getSign: getSign,
    download: download
};
//# sourceMappingURL=SignAction.js.map