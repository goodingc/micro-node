"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action = /** @class */ (function () {
    function Action(name, handler) {
        this.name = name;
        this.handler = handler;
    }
    Action.prototype.handle = function (getGlobalServicePayload, getConnectionServicePayload, getMessageServicePayload) {
        this.handler(getGlobalServicePayload, getConnectionServicePayload, getMessageServicePayload);
    };
    return Action;
}());
exports.Action = Action;
//# sourceMappingURL=Action.js.map