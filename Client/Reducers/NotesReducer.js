"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require("redux-actions");
var NotesAction_1 = require("../Actions/NotesAction");
exports.notesReducer = function (initialState) {
    var reducerMap = (_a = {},
        _a[NotesAction_1.GET_NOTES_REQUEST] = function (state, action) {
            return Object.assign({}, state, {
                isLoading: true,
                filter: action.payload
            });
        },
        _a[NotesAction_1.GET_NOTES_ERROR] = function (state, action) {
            return Object.assign({}, state, {
                isLoading: false
            });
        },
        _a[NotesAction_1.GET_NOTES_SUCCESS] = function (state, action) {
            return Object.assign({}, state, {
                isLoading: false,
                notes: action.payload.response,
                filter: action.payload.filter
            });
        },
        _a);
    return redux_actions_1.handleActions(reducerMap, initialState);
    var _a;
};
//# sourceMappingURL=NotesReducer.js.map