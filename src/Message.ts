import { LocalLogger } from "./LocalLogger";

import { Action } from "./Action";
import { GlobalService, GlobalServiceProvider } from "./service/GlobalService";
import {
    ConnectionService,
    ConnectionServiceProvider
} from "./service/ConnectionService";
import { loadServiceScope } from "./service/Service";
import {
    MessageService,
    MessageServiceProvider
} from "./service/MessageService";
import { ReplyFunction, SendFunction } from "./Utils";

class Message {
    actionName: string;
    payload: any;
    tag: string;

    messageServices: MessageService<any>[];

    messageServiceLogger: LocalLogger;

    constructor(
        data: any,
        public globalServices: GlobalService<any>[],
        public connectionServices: ConnectionService<any>[],
        public messageServiceProviders: MessageServiceProvider<any>[],
        public actions: Action[],
        public logger: LocalLogger
    ) {
        if (data.action) this.actionName = data.action;
        else {
            logger.error("Message has no action:", data);
            return;
        }
        this.payload = data.payload;
        this.tag = data.tag;
        logger.info("Received message for action", this.actionName);

        this.messageServiceLogger = logger.tag("Message Services");

        this.exposeAsService<any>("messagePayload", this.payload);
        this.exposeAsService<string>("actionName", this.actionName);
        this.exposeAsService<string>("tag", this.tag);

        messageServiceProviders.push(
            new MessageServiceProvider<ReplyFunction>(
                "reply",
                ["actionName", "tag"],
                (
                    getGlobalServicePayload,
                    getConnectionServicePayload,
                    getMessageServicePayload
                ) => {
                    return Promise.resolve((payload: any) => {
                        getConnectionServicePayload<SendFunction>("send")(
                            getMessageServicePayload<string>("actionName") +
                                "/reply",
                            payload,
                            getMessageServicePayload<string>("tag")
                        );
                    });
                }
            )
        );

        loadServiceScope<MessageService<any>, MessageServiceProvider<any>>(
            messageServiceProviders,
            this.messageServiceLogger,
            [globalServices, connectionServices]
        ).then(messageServices => {
            this.messageServices = messageServices;
            for (const action of actions) {
                if (action.name === this.actionName) {
                    action.handle(
                        GlobalServiceProvider.servicePayloadResolverFactory(
                            globalServices
                        ),
                        ConnectionServiceProvider.servicePayloadResolverFactory(
                            connectionServices
                        ),
                        MessageServiceProvider.servicePayloadResolverFactory(
                            messageServices
                        )
                    );
                }
            }
        });
    }

    exposeAsService<P>(name: string, payload: P): void {
        this.messageServiceProviders.push(
            new MessageServiceProvider<P>(name, [], () =>
                Promise.resolve(payload)
            )
        );
    }
}

export { Message };
