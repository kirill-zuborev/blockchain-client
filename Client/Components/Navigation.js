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
var AuthAction_1 = require("../Actions/AuthAction");
var react_redux_1 = require("react-redux");
var Navigation = (function (_super) {
    __extends(Navigation, _super);
    function Navigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Navigation.prototype.onLogout = function () {
        this.props.logout();
    };
    Navigation.prototype.renderLogged = function () {
        return React.createElement("li", null,
            React.createElement("label", null,
                "Hello ",
                this.props.user.email),
            React.createElement(react_router_dom_1.Link, { to: '/', onClick: this.onLogout.bind(this) }, "Logout"));
    };
    Navigation.prototype.renderUnlogged = function () {
        return [
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: '/login' }, "Login")),
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: '/register' }, "Register"))
        ];
    };
    Navigation.prototype.renderAuth = function () {
        return this.props.isLogged ? this.renderLogged() : this.renderUnlogged();
    };
    Navigation.prototype.render = function () {
        return React.createElement("ul", { className: 'nav navbar-nav' },
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: '/' }, "Home")),
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: '/notes' }, "Notes")),
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: '/sign' }, "Sign")),
            React.createElement("li", null,
                React.createElement(react_router_dom_1.Link, { to: '/dev' }, "SandBox")),
            this.renderAuth());
    };
    return Navigation;
}(React.Component));
exports.Navigation = Navigation;
exports.default = react_redux_1.connect(function (state) { return state.user; }, { logout: AuthAction_1.logout })(Navigation);
//# sourceMappingURL=Navigation.js.map