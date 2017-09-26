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
var react_redux_1 = require("react-redux");
var SignAction = require("../../Actions/SignAction");
var react_select_1 = require("react-select");
var CreateSign = (function (_super) {
    __extends(CreateSign, _super);
    function CreateSign() {
        var _this = _super.call(this) || this;
        _this.state = {
            usersToSign: []
        };
        return _this;
    }
    CreateSign.prototype.uploadFile = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var formData = new FormData(event.currentTarget);
        formData.append("usersToSign", this.state.usersToSign.map(function (c) { return c.id; }));
        this.props.create(formData);
    };
    CreateSign.prototype.onChange = function (value) {
        this.setState({
            usersToSign: value,
        });
    };
    CreateSign.prototype.getUsers = function (input) {
        if (!input) {
            return Promise.resolve({ options: [] });
        }
        return fetch("http://" + window.location.host + "/api/user/" + input)
            .then(function (response) { return response.json(); })
            .then(function (json) {
            return { options: json };
        });
    };
    CreateSign.prototype.render = function () {
        return React.createElement("form", { onSubmit: this.uploadFile.bind(this), encType: "multipart/form-data" },
            React.createElement("input", { type: "file", name: "files" }),
            React.createElement(react_select_1.Async, { multi: true, value: this.state.usersToSign, onChange: this.onChange.bind(this), valueKey: "id", labelKey: "name", loadOptions: this.getUsers.bind(this) }),
            React.createElement("input", { type: "password", name: "password" }),
            React.createElement("button", { type: "submit" }, "Upload file"));
    };
    return CreateSign;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return {}; }, SignAction.SignAction)(CreateSign);
//# sourceMappingURL=CreateSign.js.map