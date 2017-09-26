"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var AuthAction_1 = require("../../Actions/AuthAction");
var react_router_1 = require("react-router");
var Login = (function (_super) {
    __extends(Login, _super);
    function Login() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Login.prototype.onLogin = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var formData = new FormData(event.currentTarget);
        this.props.login(formData);
    };
    Login.prototype.render = function () {
        var _this = this;
        var from = (this.props.location.state || { from: { pathname: '/' } }).from;
        return this.props.isLogged
            ? React.createElement(react_router_1.Redirect, { to: from })
            : React.createElement("form", { onSubmit: function (e) { return _this.onLogin(e); } },
                React.createElement("input", { type: "email", name: "email", placeholder: "Email" }),
                React.createElement("input", { type: "password", name: "password", placeholder: "Password" }),
                React.createElement("input", { type: "submit", name: "submit", value: "Login" }));
    };
    return Login;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return state.user; }, { login: AuthAction_1.login })(Login);
//# sourceMappingURL=Login.js.map