"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceProvider = /** @class */ (function () {
    function ServiceProvider(name, requiredPeerServices, generator) {
        if (requiredPeerServices === void 0) { requiredPeerServices = []; }
        this.name = name;
        this.requiredPeerServices = requiredPeerServices;
        this.generator = generator;
    }
    ServiceProvider.prototype.generate = function (peerServices, outOfScopeServices) {
        return Promise.reject("I shouldn't be here");
    };
    ServiceProvider.servicePayloadResolverFactory = function (scopedServices) {
        return function (name) {
            for (var _i = 0, scopedServices_1 = scopedServices; _i < scopedServices_1.length; _i++) {
                var service = scopedServices_1[_i];
                if (service.name === name) {
                    return service.payload;
                }
            }
            return null;
        };
    };
    return ServiceProvider;
}());
exports.ServiceProvider = ServiceProvider;
var loadServiceScope = function (scopedServiceProviders, logger, outOfScopeServices) {
    var loadedServices = [];
    var loadServiceLayer = function (layerIndex) {
        if (layerIndex === void 0) { layerIndex = 0; }
        return Promise.all(scopedServiceProviders
            .filter(function (serviceProvider) {
            for (var _i = 0, loadedServices_1 = loadedServices; _i < loadedServices_1.length; _i++) {
                var loadedService = loadedServices_1[_i];
                if (loadedService.name === serviceProvider.name)
                    return false;
            }
            for (var _a = 0, _b = serviceProvider.requiredPeerServices; _a < _b.length; _a++) {
                var requiredPeerService = _b[_a];
                var peerServiceIsLoaded = false;
                for (var _c = 0, loadedServices_2 = loadedServices; _c < loadedServices_2.length; _c++) {
                    var loadedService = loadedServices_2[_c];
                    if (loadedService.name === requiredPeerService) {
                        peerServiceIsLoaded = true;
                        break;
                    }
                }
                if (!peerServiceIsLoaded)
                    return false;
            }
            return true;
        })
            .map(function (serviceProviderToLoad) {
            return serviceProviderToLoad
                .generate(loadedServices, outOfScopeServices)
                .then(function (loadedService) {
                loadedServices.push(loadedService);
            })
                .catch(function (error) {
                logger.error("Failed to load", serviceProviderToLoad.name, error);
            });
        }))
            .then(function () {
            logger.success("Loaded service layer", layerIndex);
            if (loadedServices.length < scopedServiceProviders.length) {
                return loadServiceLayer(++layerIndex);
            }
        })
            .catch(function (error) {
            logger.error("Failed to load service layer", layerIndex, error);
        });
    };
    return loadServiceLayer()
        .then(function () {
        logger.success("Loaded services");
        return loadedServices;
    })
        .catch(function (error) {
        logger.error("Failed to load services", error);
    });
};
exports.loadServiceScope = loadServiceScope;
//# sourceMappingURL=Service.js.map