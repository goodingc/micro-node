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
var GlobalServiceProvider = /** @class */ (function (_super) {
    __extends(GlobalServiceProvider, _super);
    function GlobalServiceProvider(name, requiredPeerServices, generator) {
        if (requiredPeerServices === void 0) { requiredPeerServices = []; }
        return _super.call(this, name, requiredPeerServices, generator) || this;
    }
    GlobalServiceProvider.prototype.generate = function (globalServices) {
        var _this = this;
        return this.generator(GlobalServiceProvider.servicePayloadResolverFactory(globalServices)).then(function (payload) {
            return {
                name: _this.name,
                payload: payload
            };
        });
    };
    GlobalServiceProvider.servicePayloadResolverFactory = function (scopedServices) {
        return Service_1.ServiceProvider.servicePayloadResolverFactory(scopedServices);
    };
    return GlobalServiceProvider;
}(Service_1.ServiceProvider));
exports.GlobalServiceProvider = GlobalServiceProvider;
//# sourceMappingURL=GlobalService.js.map