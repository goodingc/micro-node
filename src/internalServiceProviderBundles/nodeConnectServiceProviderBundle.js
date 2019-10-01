"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var websocket_1 = require("websocket");
var __1 = require("..");
var __2 = require("..");
var ServiceProviderBundle_1 = require("../ServiceProviderBundle");
var NodeConnector = /** @class */ (function () {
    function NodeConnector(address, port, onConnect, onConnectFail) {
        var _this = this;
        this.tagFilters = [];
        this.webSocketClient = new websocket_1.client();
        this.webSocketClient.on("connect", function (connection) {
            _this.webSocketConnection = connection;
            connection.on("message", function (message) {
                var data = JSON.parse(message.utf8Data);
                for (var _i = 0, _a = _this.tagFilters; _i < _a.length; _i++) {
                    var tagFilter = _a[_i];
                    if (tagFilter.tag === data.tag) {
                        for (var _b = 0, _c = tagFilter.handlers; _b < _c.length; _b++) {
                            var handler = _c[_b];
                            if (handler.action === data.action) {
                                handler.handler(data.payload);
                                break;
                            }
                        }
                        break;
                    }
                }
            });
            console.log("connected");
            onConnect();
        });
        this.webSocketClient.on("connectFailed", onConnectFail);
        this.webSocketClient.connect("ws://" + address + ":" + port + "/");
    }
    NodeConnector.connect = function (address, port) {
        return new Promise(function (resolve, reject) {
            var nodeConnector = new NodeConnector(address, port, function () {
                resolve(nodeConnector);
            }, reject);
        });
    };
    NodeConnector.prototype.send = function (action, payload, tag) {
        console.log("sending");
        this.webSocketConnection.send(JSON.stringify({
            action: action,
            payload: payload,
            tag: tag
        }));
    };
    return NodeConnector;
}());
var sendToNodeServiceProvider = new __2.MessageServiceProvider("sendToNode", ["tag"], function (getGlobalServicePayload, getConnectionServicePayload, getMessageServicePayload) {
    return Promise.resolve(function (nodeConnector, action, payload, handlers) {
        var tag = getMessageServicePayload("tag");
        console.log("in service");
        nodeConnector.tagFilters.push({
            tag: tag,
            handlers: handlers
        });
        nodeConnector.send(action, payload, tag);
    });
});
var connectToNodeServiceProvider = new __1.GlobalServiceProvider("connectToNode", [], function () {
    return Promise.resolve(NodeConnector.connect);
});
var nodeConnectServiceProviderBundle = new ServiceProviderBundle_1.ServiceProviderBundle([connectToNodeServiceProvider], [], [sendToNodeServiceProvider]);
exports.nodeConnectServiceProviderBundle = nodeConnectServiceProviderBundle;
//# sourceMappingURL=nodeConnectServiceProviderBundle.js.map