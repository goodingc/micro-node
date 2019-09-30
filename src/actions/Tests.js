"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("../Action");
var print = new Action_1.Action("test/print", function (getGlobalServicePayload, getConnectionServicePayload, getMessageServicePayload) {
    console.log(getMessageServicePayload("messagePayload"));
});
exports.print = print;
var reply = new Action_1.Action("test/reply", function (getGlobalServicePayload, getConnectionServicePayload, getMessageServicePayload) {
    getMessageServicePayload("reply")(getMessageServicePayload("messagePayload"));
});
exports.reply = reply;
//# sourceMappingURL=Tests.js.map