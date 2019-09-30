"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LocalLogger_1 = require("./LocalLogger");
var websocket_1 = require("websocket");
var http_1 = require("http");
var Connection_1 = require("./Connection");
var GlobalService_1 = require("./service/GlobalService");
var Service_1 = require("./service/Service");
var MicroNode = /** @class */ (function () {
    function MicroNode(port, actions, globalServiceProviders, connectionServiceProviders, messageServiceProviders) {
        var _this = this;
        if (port === void 0) { port = 8000; }
        this.port = port;
        this.actions = actions;
        this.globalServiceProviders = globalServiceProviders;
        this.connectionServiceProviders = connectionServiceProviders;
        this.messageServiceProviders = messageServiceProviders;
        this.connections = [];
        //Setting up loggers
        this.rootLogger = new LocalLogger_1.LocalLogger();
        this.globalServiceLogger = this.rootLogger.tag("Global Services");
        this.serverLogger = this.rootLogger.tag("Server");
        //Add logger as global service
        globalServiceProviders.push(new GlobalService_1.GlobalServiceProvider("localLogger", [], function () {
            return Promise.resolve(_this.globalServiceLogger);
        }));
        this.globalServiceLogger.info("Loading");
        Service_1.loadServiceScope(globalServiceProviders, this.globalServiceLogger).then(function (globalServices) {
            _this.globalServices = globalServices;
            _this.serverLogger.info("Starting");
            var httpServer = new http_1.Server(function (req, res) {
                _this.serverLogger.info("Received HTTP request from " + req.headers.host);
                res.writeHead(404);
                res.end();
            });
            httpServer.listen(port, function () {
                _this.serverLogger.success("Server listening on port " + port);
            });
            _this.webSocketServer = new websocket_1.server({
                httpServer: httpServer
            });
            _this.webSocketServer.on("request", function (request) {
                var webSocketConnection = request.accept();
                _this.connections.push(new Connection_1.Connection(webSocketConnection, globalServices, __spreadArrays(connectionServiceProviders), messageServiceProviders, actions, _this.rootLogger.tag("Connection")));
            });
        });
    }
    return MicroNode;
}());
exports.MicroNode = MicroNode;
//# sourceMappingURL=MicroNode.js.map