/// <reference types="node" />
import EventEmitter from "events";
import { quais } from "quais";
export declare class Eip1193Bridge extends EventEmitter {
    readonly signer: quais.Signer;
    readonly provider: quais.providers.Provider;
    constructor(signer: quais.Signer, provider?: quais.providers.Provider);
    request(request: {
        method: string;
        params?: Array<any>;
    }): Promise<any>;
    send(method: string, params?: Array<any>): Promise<any>;
}
//# sourceMappingURL=eip1193-bridge.d.ts.map