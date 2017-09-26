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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var App_1 = require("./Components/App");
var Home_1 = require("./Components/Home");
var Notes_1 = require("./Components/Notes/Notes");
var SandBox_1 = require("./Components/SandBox/SandBox");
var Sign_1 = require("./Components/Sign/Sign");
var CreateSign_1 = require("./Components/Sign/CreateSign");
var Register_1 = require("./Components/Login/Register");
var Login_1 = require("./Components/Login/Login");
var react_redux_1 = require("react-redux");
var PrivateRouteClass = (function (_super) {
    __extends(PrivateRouteClass, _super);
    function PrivateRouteClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrivateRouteClass.prototype.render = function () {
        var _this = this;
        var _a = this.props, Component = _a.component, rest = __rest(_a, ["component"]);
        return (React.createElement(react_router_dom_1.Route, __assign({}, rest, { render: function (props) { return (_this.props.isAuthenticated ? (React.createElement(Component, __assign({}, props))) : (React.createElement(react_router_dom_1.Redirect, { to: {
                    pathname: '/login',
                    state: { from: props.location }
                } }))); } })));
    };
    return PrivateRouteClass;
}(React.Component));
function mapStateToProps(state) {
    return { isAuthenticated: state.user.isLogged };
}
var PrivateRoute = react_redux_1.connect(mapStateToProps, null, null, {
    pure: false
})(PrivateRouteClass);
exports.routes = (React.createElement("switch", null,
    React.createElement(App_1.App, null,
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/', component: Home_1.Home }),
        React.createElement(PrivateRoute, { path: '/notes', component: Notes_1.default }),
        React.createElement(PrivateRoute, { exact: true, path: '/sign', component: Sign_1.default }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/dev', component: SandBox_1.SandBox }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/createSign', component: CreateSign_1.default }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/register', component: Register_1.default }),
        React.createElement(react_router_dom_1.Route, { exact: true, path: '/login', component: Login_1.default }))));
//# sourceMappingURL=Routes.js.map