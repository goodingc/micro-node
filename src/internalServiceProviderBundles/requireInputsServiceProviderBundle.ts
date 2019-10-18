import { MessageServiceProvider } from "../service/MessageService";
import { ServiceProviderBundle } from "../ServiceProviderBundle";

type RequireInputsFunction = (...requiredInputs: string[]) => Promise<any>;

const requireInputsServiceProvider = new MessageServiceProvider<
    RequireInputsFunction
    >(
    "requireInputs",
    ["messagePayload"],
    (
        getGlobalServicePayload,
        getConnectionServicePayload,
        getMessageServicePayload
    ) => {
        return Promise.resolve(
            (...requiredInputs: string[]): Promise<any> =>
                new Promise((resolve, reject) => {
                    const messagePayload = getMessageServicePayload<any>(
                        "messagePayload"
                    );
                    resolve(
                        requiredInputs.map(requiredInput => {
                            if (!messagePayload[requiredInput]) {
                                reject(
                                    `Missing required input ${requiredInput}`
                                );
                            }
                            return messagePayload[requiredInput];
                        })
                    );
                })
        );
    }
);

const requireInputsServiceProviderBundle = new ServiceProviderBundle([], [], [requireInputsServiceProvider]);

export {requireInputsServiceProviderBundle, RequireInputsFunction}