"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var react_router_redux_1 = require("react-router-redux");
var react_redux_1 = require("react-redux");
var history_1 = require("history");
var Router = require("./Routes");
var ConfigureStore_1 = require("./Store/ConfigureStore");
var history = history_1.createBrowserHistory();
var reducer = function (state, action) { return state; };
var defaultStore = {
    notes: {
        notes: [],
        isLoading: false,
    },
    user: {
        user: null,
        isLogged: false
    },
    sign: {
        isMySignSelected: true,
        signs: [],
        selectedSign: null
    }
};
var store = ConfigureStore_1.default(defaultStore, history);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(react_router_redux_1.ConnectedRouter, { history: history, children: Router.routes })), document.getElementById("app"));
//# sourceMappingURL=index.js.map