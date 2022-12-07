import { quais } from "quais";
export declare class NonceManager extends quais.Signer {
    readonly signer: quais.Signer;
    _initialPromise: Promise<number>;
    _deltaCount: number;
    constructor(signer: quais.Signer);
    connect(provider: quais.providers.Provider): NonceManager;
    getAddress(): Promise<string>;
    getTransactionCount(blockTag?: quais.providers.BlockTag): Promise<number>;
    setTransactionCount(transactionCount: quais.BigNumberish | Promise<quais.BigNumberish>): void;
    incrementTransactionCount(count?: number): void;
    signMessage(message: quais.Bytes | string): Promise<string>;
    signTransaction(transaction: quais.utils.Deferrable<quais.providers.TransactionRequest>): Promise<string>;
    sendTransaction(transaction: quais.utils.Deferrable<quais.providers.TransactionRequest>): Promise<quais.providers.TransactionResponse>;
}
//# sourceMappingURL=nonce-manager.d.ts.map