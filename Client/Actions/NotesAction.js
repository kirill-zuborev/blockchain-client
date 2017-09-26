"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require("redux-actions");
var NotesApi_1 = require("../api/NotesApi");
exports.GET_NOTES_REQUEST = 'GET_NOTES_REQUEST';
exports.GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS';
exports.GET_NOTES_ERROR = 'GET_NOTES_ERROR';
var getNotesRequest = redux_actions_1.createAction(exports.GET_NOTES_REQUEST, function (filter) { return filter; });
var getNotesSuccess = redux_actions_1.createAction(exports.GET_NOTES_SUCCESS, function (response, filter) { return ({ response: response, filter: filter }); });
var getNotesError = redux_actions_1.createAction(exports.GET_NOTES_ERROR, function (e) { return ({ e: e }); });
var getNotes = function (filter) { return function (dispatch, getState) {
    var oldState = getState();
    if (JSON.stringify(filter) !== JSON.stringify(oldState.notes.filter)) {
        dispatch(getNotesRequest(filter));
        NotesApi_1.NotesApi.getNotes(filter)
            .then(function (response) { return dispatch(getNotesSuccess(response, filter)); })
            .catch(function (e) { return dispatch(getNotesError(e)); });
    }
}; };
exports.notesAction = {
    getNotes: getNotes
};
//# sourceMappingURL=NotesAction.js.map