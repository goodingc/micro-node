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
var GlobalService_1 = require("./GlobalService");
var ConnectionServiceProvider = /** @class */ (function (_super) {
    __extends(ConnectionServiceProvider, _super);
    function ConnectionServiceProvider(name, requiredPeerServices, generator) {
        if (requiredPeerServices === void 0) { requiredPeerServices = []; }
        return _super.call(this, name, requiredPeerServices, generator) || this;
    }
    ConnectionServiceProvider.prototype.generate = function (connectionServices, _a) {
        var _this = this;
        var globalServices = _a[0];
        return this.generator(GlobalService_1.GlobalServiceProvider.servicePayloadResolverFactory(globalServices), ConnectionServiceProvider.servicePayloadResolverFactory(connectionServices)).then(function (payload) {
            return {
                name: _this.name,
                payload: payload
            };
        });
    };
    ConnectionServiceProvider.servicePayloadResolverFactory = function (scopedServices) {
        return Service_1.ServiceProvider.servicePayloadResolverFactory(scopedServices);
    };
    return ConnectionServiceProvider;
}(Service_1.ServiceProvider));
exports.ConnectionServiceProvider = ConnectionServiceProvider;
//# sourceMappingURL=ConnectionService.js.map