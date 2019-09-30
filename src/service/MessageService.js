"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Service_1 = require("./Service");
var ConnectionService_1 = require("./ConnectionService");
var GlobalService_1 = require("./GlobalService");
var MessageServiceProvider = /** @class */ (function (_super) {
    __extends(MessageServiceProvider, _super);
    function MessageServiceProvider(name, requiredPeerServices, generator) {
        if (requiredPeerServices === void 0) { requiredPeerServices = []; }
        return _super.call(this, name, requiredPeerServices, generator) || this;
    }
    MessageServiceProvider.prototype.generate = function (messageServices, _a) {
        var _this = this;
        var globalServices = _a[0], connectionServices = _a[1];
        return this.generator(GlobalService_1.GlobalServiceProvider.servicePayloadResolverFactory(globalServices), ConnectionService_1.ConnectionServiceProvider.servicePayloadResolverFactory(connectionServices), MessageServiceProvider.servicePayloadResolverFactory(messageServices)).then(function (payload) {
            return {
                name: _this.name,
                payload: payload
            };
        });
    };
    MessageServiceProvider.servicePayloadResolverFactory = function (scopedServices) {
        return Service_1.ServiceProvider.servicePayloadResolverFactory(scopedServices);
    };
    return MessageServiceProvider;
}(Service_1.ServiceProvider));
exports.MessageServiceProvider = MessageServiceProvider;
//# sourceMappingURL=MessageService.js.map