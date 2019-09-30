import { Service, ServiceProvider } from "./service/Service";
import { MessageServiceProvider } from "./service/MessageService";
import { GlobalServiceProvider } from "./service/GlobalService";

class ExposesAsService<S extends Service<any>> {
    constructor(public exposingTo: ServiceProvider<any, S>[], public serviceProvider: typeof ServiceProvider) {}



    exposeAsService<P>(name: string, payload: P): void {
        this.exposingTo.push(
            new this.serviceProvider<P, S>(name, [], () => Promise.resolve(payload))
        );
    }
}

export { ExposesAsService };
