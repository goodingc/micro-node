"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Action_1 = require("./Action");
var GlobalService_1 = require("./service/GlobalService");
var ConnectionService_1 = require("./service/ConnectionService");
var Service_1 = require("./service/Service");
var MessageService_1 = require("./service/MessageService");
var Message = /** @class */ (function () {
    function Message(data, globalServices, connectionServices, messageServiceProviders, actions, logger) {
        var _this = this;
        this.globalServices = globalServices;
        this.connectionServices = connectionServices;
        this.messageServiceProviders = messageServiceProviders;
        this.actions = actions;
        this.logger = logger;
        if (data.action)
            this.actionName = data.action;
        else {
            logger.error("Message has no action:", data);
            return;
        }
        this.payload = data.payload;
        this.tag = data.tag;
        logger.info("Received message for action", this.actionName);
        this.messageServiceLogger = logger.tag("Message Services");
        this.exposeAsService("messagePayload", this.payload);
        this.exposeAsService("actionName", this.actionName);
        this.exposeAsService("tag", this.tag);
        this.exposeAsService("addAction", function (action) {
            _this.actions.push(action);
        });
        messageServiceProviders.push(new MessageService_1.MessageServiceProvider("query", ["addAction", "tag"], function (getGlobalServicePayload, getConnectionServicePayload, getMessageServicePayload) {
            return Promise.resolve(function (connection, action, payload) {
                return new Promise(function (resolve, reject) {
                    getMessageServicePayload("addAction")(new Action_1.Action(action + "/reply", function (getGlobalServicePayload, getConnectionServicePayload, getMessageServicePayload) {
                        var replyPayload = getMessageServicePayload("messagePayload");
                        if (replyPayload.success) {
                            resolve(replyPayload.data);
                        }
                        else if (replyPayload.success === false) {
                            reject(replyPayload.error);
                        }
                        resolve(replyPayload);
                    }));
                    getConnectionServicePayload("send")(action, payload, getMessageServicePayload("tag"), connection);
                });
            });
        }));
        messageServiceProviders.push(new MessageService_1.MessageServiceProvider("reply", ["actionName", "tag"], function (getGlobalServicePayload, getConnectionServicePayload, getMessageServicePayload) {
            return Promise.resolve(function (payload) {
                var reply = function (payload) {
                    getConnectionServicePayload("send")(getMessageServicePayload("actionName") +
                        "/reply", payload, getMessageServicePayload("tag"));
                };
                if (payload instanceof Promise) {
                    payload
                        .then(function (data) {
                        reply({
                            success: true,
                            data: data
                        });
                    })
                        .catch(function (error) {
                        reply({
                            success: false,
                            error: error
                        });
                    });
                }
                else {
                    reply(payload);
                }
            });
        }));
        Service_1.loadServiceScope(messageServiceProviders, this.messageServiceLogger, [globalServices, connectionServices]).then(function (messageServices) {
            _this.messageServices = messageServices;
            for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
                var action = actions_1[_i];
                if (action.name === _this.actionName) {
                    action.handle(GlobalService_1.GlobalServiceProvider.servicePayloadResolverFactory(globalServices), ConnectionService_1.ConnectionServiceProvider.servicePayloadResolverFactory(connectionServices), MessageService_1.MessageServiceProvider.servicePayloadResolverFactory(messageServices));
                }
            }
        });
    }
    Message.prototype.exposeAsService = function (name, payload) {
        this.messageServiceProviders.push(new MessageService_1.MessageServiceProvider(name, [], function () {
            return Promise.resolve(payload);
        }));
    };
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=Message.js.map