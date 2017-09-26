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
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var AuthAction_1 = require("../../Actions/AuthAction");
var Auth = (function (_super) {
    __extends(Auth, _super);
    function Auth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Auth.prototype.onLogout = function () {
        this.props.logout();
    };
    Auth.prototype.renderLogged = function () {
        return React.createElement("li", null,
            React.createElement("label", null,
                "Hello ",
                this.props.user.email),
            React.createElement(react_router_dom_1.Link, { to: '/', onClick: this.onLogout.bind(this) }, "Logout"));
    };
    Auth.prototype.renderLogin = function () {
        return React.createElement("li", null,
            React.createElement(react_router_dom_1.Link, { to: '/login' }, "Login"));
    };
    Auth.prototype.renderRegister = function () {
        return React.createElement("li", null,
            React.createElement(react_router_dom_1.Link, { to: '/register' }, "Register"));
    };
    Auth.prototype.renderUnlogged = function () {
        return (this.renderLogin(),
            this.renderRegister());
    };
    Auth.prototype.render = function () {
        return this.props.isLogged ? this.renderLogged() : this.renderUnlogged();
    };
    return Auth;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return state.user; }, { logout: AuthAction_1.logout })(Auth);
//# sourceMappingURL=Auth.js.map