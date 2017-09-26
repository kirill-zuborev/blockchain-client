"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SignService = (function () {
    function SignService() {
    }
    SignService.prototype.create = function (form) {
        return fetch("http://" + window.location.host + "/api/sign/", {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            },
            method: 'PUT',
            body: form,
        });
    };
    SignService.prototype.getSign = function (manifest) {
        return fetch("http://" + window.location.host + "/api/sign/" + manifest, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            },
            method: 'GET',
        });
    };
    SignService.prototype.getSigns = function () {
        return fetch("http://" + window.location.host + "/api/sign/", {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            },
            method: 'GET',
        });
    };
    SignService.prototype.download = function (manifest) {
        return fetch("http://" + window.location.host + "/api/sign/download/" + manifest, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
            },
            method: 'GET',
        });
    };
    SignService.prototype.getToSign = function () {
    };
    return SignService;
}());
exports.SignApi = new SignService();
//# sourceMappingURL=SignApi.js.map