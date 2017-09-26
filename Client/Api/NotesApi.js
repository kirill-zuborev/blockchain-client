"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NotesService = (function () {
    function NotesService() {
    }
    NotesService.prototype.getNotes = function (filter) {
        return fetch("http://" + window.location.host + "/api/notes/", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filter)
        })
            .then(function (response) { return response.json(); });
    };
    return NotesService;
}());
exports.NotesApi = new NotesService();
//# sourceMappingURL=NotesApi.js.map