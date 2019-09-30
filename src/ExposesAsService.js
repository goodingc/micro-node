"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExposesAsService = /** @class */ (function () {
    function ExposesAsService(exposingTo, serviceProvider) {
        this.exposingTo = exposingTo;
        this.serviceProvider = serviceProvider;
    }
    ExposesAsService.prototype.exposeAsService = function (name, payload) {
        this.exposingTo.push(new this.serviceProvider(name, [], function () { return Promise.resolve(payload); }));
    };
    return ExposesAsService;
}());
exports.ExposesAsService = ExposesAsService;
//# sourceMappingURL=ExposesAsService.js.map