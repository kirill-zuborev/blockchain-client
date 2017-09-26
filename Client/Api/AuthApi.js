"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthService = (function () {
    function AuthService() {
        this.apiPath = "http://" + window.location.host + "/api/auth";
    }
    AuthService.prototype.token = function (form) {
        return fetch(this.apiPath + "/token", {
            method: 'POST',
            body: form,
        });
    };
    AuthService.prototype.register = function (form) {
        return fetch(this.apiPath + "/register", {
            method: 'POST',
            body: form,
        });
    };
    return AuthService;
}());
exports.AuthApi = new AuthService();
//# sourceMappingURL=AuthApi.js.map