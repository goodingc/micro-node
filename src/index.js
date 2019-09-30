"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
var MicroNode_1 = require("./MicroNode");
var testActions = require("./actions/Tests");
var GlobalService_1 = require("./service/GlobalService");
var constantsService = new GlobalService_1.GlobalServiceProvider("constants", ["localLogger"], function (getGlobalServicePayload) {
    getGlobalServicePayload("localLogger").info("test");
    return Promise.resolve({
        test: "Hello, World!"
    });
});
var microNode = new MicroNode_1.MicroNode(8000, [testActions.print, testActions.reply], [constantsService], [], []);
//# sourceMappingURL=index.js.map