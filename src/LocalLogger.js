"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var LocalLogger = /** @class */ (function () {
    function LocalLogger(statusChars) {
        if (statusChars === void 0) { statusChars = {
            success: "+",
            info: "?",
            warning: "!",
            error: "-"
        }; }
        this.tags = [];
        this.statusChars = statusChars;
    }
    LocalLogger.prototype.log = function (statusChar, message) {
        console.log.apply(console, __spreadArrays(["[" + statusChar + "]"], this.tags.map(function (tag) { return "[" + tag + "]"; }), message));
    };
    LocalLogger.prototype.tag = function (tag) {
        var child = new LocalLogger(__assign({}, this.statusChars));
        child.tags = __spreadArrays(this.tags, [tag]);
        return child;
    };
    LocalLogger.prototype.success = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.log(chalk_1.default.green(this.statusChars.success), message);
    };
    LocalLogger.prototype.info = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.log(chalk_1.default.blue(this.statusChars.info), message);
    };
    LocalLogger.prototype.warning = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.log(chalk_1.default.yellow(this.statusChars.warning), message);
    };
    LocalLogger.prototype.error = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        this.log(chalk_1.default.red(this.statusChars.error), message);
    };
    return LocalLogger;
}());
exports.LocalLogger = LocalLogger;
//# sourceMappingURL=LocalLogger.js.map