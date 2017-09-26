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
var debounce = require("lodash/debounce");
var SandBox = (function (_super) {
    __extends(SandBox, _super);
    function SandBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delayCallback = debounce(function (e) {
            console.log(e.target);
        }, 1000);
        return _this;
    }
    SandBox.prototype.onKeyDown = function (e) {
        e.persist();
        console.log(e.target);
        this.delayCallback(e);
    };
    SandBox.prototype.componentWillMount = function () {
    };
    SandBox.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement("input", { type: "text", value: this.props.name, onKeyDown: this.onKeyDown.bind(this) }));
    };
    return SandBox;
}(React.Component));
exports.SandBox = SandBox;
//# sourceMappingURL=SandBox.js.map