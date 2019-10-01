"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("./Message");
var ConnectionService_1 = require("./service/ConnectionService");
var Service_1 = require("./service/Service");
var Connection = /** @class */ (function () {
    function Connection(webSocketConnection, globalServices, connectionServiceProviders, messageServiceProviders, actions, logger) {
        var _this = this;
        this.webSocketConnection = webSocketConnection;
        this.globalServices = globalServices;
        this.connectionServiceProviders = connectionServiceProviders;
        this.actions = actions;
        this.logger = logger;
        this.connectionServiceLogger = logger.tag("Connection Services");
        this.exposeAsService("localLogger", this.connectionServiceLogger);
        this.exposeAsService("send", function (action, payload, tag, altConnection) {
            (altConnection || webSocketConnection).send(JSON.stringify({
                action: action,
                payload: payload,
                tag: tag
            }));
        });
        this.exposeAsService("addAction", function (action) {
            _this.actions.push(action);
        });
        this.connectionServiceLogger.info("Loading");
        Service_1.loadServiceScope(connectionServiceProviders, this.connectionServiceLogger, [
            globalServices
        ]).then(function (connectionServices) {
            _this.connectionServices = connectionServices;
            webSocketConnection.on("message", function (data) {
                new Message_1.Message(JSON.parse(data.utf8Data), globalServices, connectionServices, __spreadArrays(messageServiceProviders), actions, logger.tag("Message"));
            });
        });
    }
    Connection.prototype.exposeAsService = function (name, payload) {
        this.connectionServiceProviders.push(new ConnectionService_1.ConnectionServiceProvider(name, [], function () {
            return Promise.resolve(payload);
        }));
    };
    return Connection;
}());
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map