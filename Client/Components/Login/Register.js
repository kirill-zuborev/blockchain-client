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
var Register = (function (_super) {
    __extends(Register, _super);
    function Register() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Register.prototype.onRegister = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var formData = new FormData(event.currentTarget);
        this.props.register(formData);
    };
    Register.prototype.render = function () {
        var _this = this;
        return this.props.isLogged
            ? React.createElement(react_router_dom_1.Redirect, { to: { pathname: '/' } })
            : React.createElement("form", { onSubmit: function (e) { return _this.onRegister(e); } },
                React.createElement("input", { type: "email", name: "email", placeholder: "Email" }),
                React.createElement("input", { type: "text", name: "ethereumAddress", placeholder: "Ethereum Address" }),
                React.createElement("input", { type: "password", name: "password", placeholder: "Password" }),
                React.createElement("input", { type: "password", name: "rePassword", placeholder: "Repeat password" }),
                React.createElement("input", { type: "submit", name: "submit", value: "Register" }));
    };
    return Register;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return state.user; }, { register: AuthAction_1.register })(Register);
//# sourceMappingURL=Register.js.map