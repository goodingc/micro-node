import "source-map-support/register";

import { MicroNode } from "./MicroNode";
import * as testActions from "./actions/Tests";
import { LocalLogger } from "./LocalLogger";
import { GlobalServiceProvider } from "./service/GlobalService";

interface Constants {
    test: string;
}

const constantsService = new GlobalServiceProvider<Constants>(
    "constants",
    ["localLogger"],
    (getGlobalServicePayload): Promise<Constants> => {
        getGlobalServicePayload<LocalLogger>("localLogger").info("test");
        return Promise.resolve({
            test: "Hello, World!"
        });
    }
);

const microNode = new MicroNode(
    8000,
    [testActions.print, testActions.echo],
    [constantsService],
    [],
    []
);
