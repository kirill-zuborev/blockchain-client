"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var NotesReducer_1 = require("./NotesReducer");
var SignReducer_1 = require("./SignReducer");
var AuthReducer_1 = require("./AuthReducer");
var react_router_redux_1 = require("react-router-redux");
exports.reducers = function (initialState, history) {
    var notes = NotesReducer_1.notesReducer(initialState.notes);
    var sign = SignReducer_1.signReducer(initialState.sign);
    var auth = AuthReducer_1.authReducer(initialState.user);
    var router = react_router_redux_1.routerReducer;
    return redux_1.combineReducers({
        notes: notes,
        sign: sign,
        user: auth,
        router: router
    });
};
//# sourceMappingURL=Reducers.js.map