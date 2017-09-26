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
var react_datepicker_1 = require("react-datepicker");
require("react-datepicker/dist/react-datepicker.css");
var Moment = require("moment");
var DateRangePicker = (function (_super) {
    __extends(DateRangePicker, _super);
    function DateRangePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateRangePicker.prototype.onMinDateChanged = function (date) {
        this.props.onMinDateChanged && this.props.onMinDateChanged(date.toISOString());
    };
    DateRangePicker.prototype.onMaxDateChanged = function (date) {
        this.props.onMaxDateChanged && this.props.onMaxDateChanged(date.toISOString());
    };
    DateRangePicker.prototype.render = function () {
        var minDate = this.props.minDate && Moment(this.props.minDate);
        var maxDate = this.props.maxDate && Moment(this.props.maxDate);
        return React.createElement("div", null,
            React.createElement(react_datepicker_1.default, { selected: minDate, onChange: this.onMinDateChanged.bind(this) }),
            React.createElement(react_datepicker_1.default, { selected: maxDate, onChange: this.onMaxDateChanged.bind(this) }));
    };
    return DateRangePicker;
}(React.Component));
exports.DateRangePicker = DateRangePicker;
//# sourceMappingURL=DateRangePicker.js.map