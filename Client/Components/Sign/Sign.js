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
var Sign = (function (_super) {
    __extends(Sign, _super);
    function Sign() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sign.prototype.uploadFile = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var formData = new FormData(event.currentTarget);
        this.props.create(formData);
    };
    Sign.prototype.componentWillMount = function () {
        this.props.getSigns(this.props.isMySignSelected);
    };
    Sign.prototype.componentWillReceiveProps = function (nextProps) {
        this.props.getSigns(this.props.isMySignSelected);
    };
    Sign.prototype.handleSignLoad = function (isMySign) {
        this.props.getSigns(isMySign);
    };
    Sign.prototype.renderList = function () {
        return React.createElement("ul", null, this.props.signs.map(function (val, index) {
            return React.createElement("li", { key: index }, "val");
        }));
    };
    Sign.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("input", { name: "createSign", value: "Create Sign", onClick: function (e) { _this.props.history.push("/createSign"); } })),
            React.createElement("div", null,
                React.createElement("input", { name: "mySign", value: "My Sign", onClick: function (e) { _this.handleSignLoad(true); } }),
                React.createElement("button", { name: "toSign", value: "To Sign", onClick: function (e) { _this.handleSignLoad(false); } })),
            this.renderList());
    };
    return Sign;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return state.sign; }, SignAction.SignAction)(Sign);
//# sourceMappingURL=Sign.js.map