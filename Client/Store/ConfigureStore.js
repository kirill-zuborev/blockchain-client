"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var Reducers_1 = require("../reducers/Reducers");
var redux_thunk_1 = require("redux-thunk");
var react_router_redux_1 = require("react-router-redux");
var configuredStore = function (initialState, history) {
    var configuredReducers = Reducers_1.reducers(initialState, history);
    var middleware = redux_1.applyMiddleware(react_router_redux_1.routerMiddleware(history), redux_thunk_1.default);
    return redux_1.createStore(configuredReducers, initialState, middleware);
};
exports.default = configuredStore;
//# sourceMappingURL=ConfigureStore.js.map