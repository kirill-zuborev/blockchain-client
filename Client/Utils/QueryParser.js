"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_string_1 = require("query-string");
function parse(str, queryShema, options) {
    var parsedQuery = query_string_1.parse(str, options);
    var parser = new FilterParser(parsedQuery, queryShema);
    return parser.getFilter();
}
exports.parse = parse;
function stringify(obj, options) {
    var queryParser = new QueryParser(obj);
    var inlineObject = queryParser.parseToInlineObject();
    return query_string_1.stringify(inlineObject, options);
}
exports.stringify = stringify;
var FilterParser = (function () {
    function FilterParser(parsedQuery, queryShema) {
        this.parsedQuery = parsedQuery;
        this.queryShema = queryShema;
    }
    FilterParser.prototype.getFilter = function () {
        var _this = this;
        var props = Reflect.ownKeys(this.parsedQuery);
        var filter = {};
        props.map(function (prop) { return _this.parsePropertyToFilter(prop, filter); });
        return filter;
    };
    FilterParser.prototype.parsePropertyToFilter = function (prop, filter) {
        var path = prop.toString().split(".");
        var obj = filter;
        for (var i = 0; i < path.length; i++) {
            var stepName = path[i];
            var isLastStep = i == path.length - 1;
            var nextStep = Reflect.get(obj, stepName);
            if (nextStep && isLastStep) {
                break;
            }
            else if (nextStep) {
                obj = nextStep;
                continue;
            }
            Reflect.set(obj, stepName, this.getValue(isLastStep, stepName, prop));
            obj = Reflect.get(obj, stepName);
        }
    };
    FilterParser.prototype.getValue = function (isLastStep, stepName, propertyKey) {
        if (isLastStep) {
            if (this.queryShema && this.queryShema.some(function (c) { return c.name == stepName; })) {
                return this.convert(Reflect.get(this.parsedQuery, propertyKey), this.queryShema.find(function (c) { return c.name == stepName; }).type);
            }
            else {
                return this.convert(Reflect.get(this.parsedQuery, propertyKey));
            }
        }
        else {
            return {};
        }
    };
    FilterParser.prototype.convert = function (val, type) {
        if (type === void 0) { type = 'string'; }
        switch (type) {
            case "string":
                return val;
            case "number":
                return parseFloat(val);
            case "boolean":
                return val == "true";
            default:
                return val;
        }
    };
    return FilterParser;
}());
var QueryParser = (function () {
    function QueryParser(filter) {
        this.filter = filter;
    }
    QueryParser.prototype.parseToInlineObject = function () {
        var result = {};
        var props = [];
        this.parseProp("", this.filter, props);
        props.forEach(function (prop) {
            Reflect.set(result, prop.name, prop.value);
        });
        return result;
    };
    QueryParser.prototype.parseProp = function (name, value, res) {
        var _this = this;
        if (typeof value == 'object') {
            var props = Reflect.ownKeys(value);
            props.forEach(function (prop) {
                var fullName = name ? name + "." + prop.toString() : prop.toString();
                _this.parseProp(fullName, Reflect.get(value, prop), res);
            });
        }
        else {
            res.push({ name: name, value: value });
        }
    };
    return QueryParser;
}());
//# sourceMappingURL=QueryParser.js.map