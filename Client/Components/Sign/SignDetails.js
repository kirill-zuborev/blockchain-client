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
var SignDetails = (function (_super) {
    __extends(SignDetails, _super);
    function SignDetails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignDetails.prototype.onChange = function (value) {
        this.setState({
            usersToSign: value,
        });
    };
    SignDetails.prototype.componentWillMount = function () {
        this.props.getSigns(this.props.isMySignSelected);
    };
    SignDetails.prototype.componentWillReceiveProps = function (nextProps) {
        this.props.getSigns(this.props.isMySignSelected);
    };
    SignDetails.prototype.render = function () {
        var _this = this;
        var sign = this.props.selectedSign;
        return (React.createElement("div", null,
            React.createElement("ul", null, sign.toSign.map(function (val, index) {
                return React.createElement("li", { key: val.id },
                    React.createElement("div", null,
                        "Name: ",
                        val.name,
                        ", Is signed: ",
                        sign.signed.some(function (c) { return c.id == val.id; })));
            })),
            React.createElement("input", { type: "button", name: "download", onClick: function () { _this.props.download(sign.manifest); } })));
    };
    return SignDetails;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return state.sign; }, SignAction.SignAction)(SignDetails);
//# sourceMappingURL=SignDetails.js.map