"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageService_1 = require("../service/MessageService");
var ServiceProviderBundle_1 = require("../ServiceProviderBundle");
var requireInputsServiceProvider = new MessageService_1.MessageServiceProvider("requireInputs", ["messagePayload"], function (getGlobalServicePayload, getConnectionServicePayload, getMessageServicePayload) {
    return Promise.resolve(function () {
        var requiredInputs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            requiredInputs[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var messagePayload = getMessageServicePayload("messagePayload");
            resolve(requiredInputs.map(function (requiredInput) {
                if (!messagePayload[requiredInput]) {
                    reject("Missing required input " + requiredInput);
                }
                return messagePayload[requiredInput];
            }));
        });
    });
});
var requireInputsServiceProviderBundle = new ServiceProviderBundle_1.ServiceProviderBundle([], [], [requireInputsServiceProvider]);
exports.requireInputsServiceProviderBundle = requireInputsServiceProviderBundle;
//# sourceMappingURL=requireInputsServiceProviderBundle.js.map