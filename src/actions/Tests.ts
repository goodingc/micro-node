import { Action } from "../Action";
import { ReplyFunction } from "../Utils";

const print: Action = new Action(
    "test/print",
    (
        getGlobalServicePayload,
        getConnectionServicePayload,
        getMessageServicePayload
    ) => {
        console.log(getMessageServicePayload("messagePayload"));
    }
);

const echo: Action = new Action(
    "test/echo",
    (
        getGlobalServicePayload,
        getConnectionServicePayload,
        getMessageServicePayload
    ) => {
        getMessageServicePayload<ReplyFunction>("reply")(
            getMessageServicePayload("messagePayload")
        );
    }
);

export { print, echo };
