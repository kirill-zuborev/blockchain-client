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
var NotesActions = require("../../Actions/NotesAction");
var Note_1 = require("./Note");
var QueryParser_1 = require("../../Utils/QueryParser");
var debounce = require("lodash/debounce");
var DateRangePicker_1 = require("../Shared/DateRangePicker");
function getQueryShema() {
    return [
        { name: 'onlyWithComments', type: 'boolean' },
        { name: 'page', type: 'number' },
        { name: 'count', type: 'number' }
    ];
}
var Notes = (function (_super) {
    __extends(Notes, _super);
    function Notes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.debounceNameFilter = debounce(function (event) {
            _this.updateQuery(function (c) {
                c.nameFilter = event.target.value;
            });
        }, 1000);
        return _this;
        // #endregion
    }
    Notes.prototype.getFilter = function (queryString) {
        var query = QueryParser_1.parse(queryString, getQueryShema());
        query = {
            dateRange: {
                maxDate: query.dateRange && query.dateRange.maxDate,
                minDate: query.dateRange && query.dateRange.minDate
            },
            pager: {
                count: query.pager ? query.pager.count : 10,
                page: query.pager ? query.pager.page : 0,
            },
            nameFilter: query.nameFilter,
            onlyWithComments: query.onlyWithComments
        };
        return query;
    };
    Notes.prototype.updateQuery = function (callback) {
        var query = JSON.parse(JSON.stringify(this.props.filter));
        callback(query);
        this.props.history.push({ pathname: '/notes', search: QueryParser_1.stringify(query) });
    };
    // #region Overrided methods
    Notes.prototype.componentWillMount = function () {
        var filter = this.getFilter(this.props.location.search);
        this.props.getNotes(filter);
    };
    Notes.prototype.componentWillReceiveProps = function (nextProps) {
        var filter = this.getFilter(nextProps.location.search);
        this.props.getNotes(filter);
    };
    // #endregion
    // #region Handlers
    Notes.prototype.onInputChanged = function (event) {
        this.updateQuery(function (c) {
            c.onlyWithComments = event.target.checked;
        });
    };
    ;
    Notes.prototype.onNameFilterChanged = function (event) {
        event.persist();
        this.debounceNameFilter(event);
    };
    ;
    Notes.prototype.onMinDateChanged = function (date) {
        this.updateQuery(function (c) {
            c.dateRange.minDate = date;
        });
    };
    Notes.prototype.onMaxDateChanged = function (date) {
        this.updateQuery(function (c) {
            c.dateRange.maxDate = date;
        });
    };
    Notes.prototype.onNextClick = function () {
        this.updateQuery(function (c) {
            c.pager.page = c.pager.page + 1;
        });
    };
    Notes.prototype.onPrevClick = function () {
        this.updateQuery(function (c) {
            if (c.pager.page > 0) {
                c.pager.page = c.pager.page - 1;
            }
        });
    };
    Notes.prototype.onStartClick = function () {
        this.updateQuery(function (c) {
            c.pager.page = 0;
        });
    };
    // #endregion
    // #region RenderSection
    Notes.prototype.renderFilters = function () {
        var onlyWithComments = this.props.filter && React.createElement("div", null,
            React.createElement("input", { name: "onlyWithComments", type: "checkbox", checked: this.props.filter.onlyWithComments, onChange: this.onInputChanged.bind(this) }),
            React.createElement("label", null, "Only with comments"));
        var nameFilter = this.props.filter && React.createElement("input", { type: "text", label: "NameFilter", defaultValue: this.props.filter.nameFilter, onChange: this.onNameFilterChanged.bind(this) });
        var dateRangePicker = this.props.filter && React.createElement(DateRangePicker_1.DateRangePicker, { minDate: this.props.filter.dateRange && this.props.filter.dateRange.minDate, maxDate: this.props.filter.dateRange && this.props.filter.dateRange.maxDate, onMinDateChanged: this.onMinDateChanged.bind(this), onMaxDateChanged: this.onMaxDateChanged.bind(this) });
        return React.createElement("div", null,
            onlyWithComments,
            nameFilter,
            dateRangePicker);
    };
    Notes.prototype.render = function () {
        return React.createElement("div", null,
            this.renderFilters(),
            this.props.notes.map(function (c) { return React.createElement(Note_1.Note, { data: c.name, key: c.id }); }),
            this.props.isLoading ? "Loading" : "Loading complete",
            React.createElement("button", { onClick: this.onPrevClick.bind(this) }, "Prev"),
            React.createElement("button", { onClick: this.onStartClick.bind(this) }, "Start"),
            React.createElement("button", { onClick: this.onNextClick.bind(this) }, "Next"));
    };
    return Notes;
}(React.Component));
exports.default = react_redux_1.connect(function (state) { return state.notes; }, NotesActions.notesAction)(Notes);
//# sourceMappingURL=Notes.js.map