/// <reference path="../thirdparty.d.ts" />
import { quais } from "quais";
import Eth from "@ledgerhq/hw-app-eth";
export declare class LedgerSigner extends quais.Signer {
    readonly type: string;
    readonly path: string;
    readonly _eth: Promise<Eth>;
    constructor(provider?: quais.providers.Provider, type?: string, path?: string);
    _retry<T = any>(callback: (eth: Eth) => Promise<T>, timeout?: number): Promise<T>;
    getAddress(): Promise<string>;
    signMessage(message: quais.utils.Bytes | string): Promise<string>;
    signTransaction(transaction: quais.providers.TransactionRequest): Promise<string>;
    connect(provider: quais.providers.Provider): quais.Signer;
}
//# sourceMappingURL=ledger.d.ts.map