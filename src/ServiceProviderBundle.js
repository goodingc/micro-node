"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceProviderBundle = /** @class */ (function () {
    function ServiceProviderBundle(globalServiceProviders, connectionServiceProviders, messageServiceProviders) {
        this.globalServiceProviders = globalServiceProviders;
        this.connectionServiceProviders = connectionServiceProviders;
        this.messageServiceProviders = messageServiceProviders;
    }
    ServiceProviderBundle.prototype.apply = function (globalServiceProviders, connectionServiceProviders, messageServiceProviders) {
        globalServiceProviders.push.apply(globalServiceProviders, this.globalServiceProviders);
        connectionServiceProviders.push.apply(connectionServiceProviders, this.connectionServiceProviders);
        messageServiceProviders.push.apply(messageServiceProviders, this.messageServiceProviders);
    };
    return ServiceProviderBundle;
}());
exports.ServiceProviderBundle = ServiceProviderBundle;
//# sourceMappingURL=ServiceProviderBundle.js.map