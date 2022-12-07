"use strict"

import { quais } from "quais";

// @TODO: Keep a per-NonceManager pool of sent but unmined transactions for
//        rebroadcasting, in case we overrun the transaction pool

export class NonceManager extends quais.Signer {
    readonly signer: quais.Signer;

    _initialPromise: Promise<number>;
    _deltaCount: number;

    constructor(signer: quais.Signer) {
        super();
        this._deltaCount = 0;
        quais.utils.defineReadOnly(this, "signer", signer);
        quais.utils.defineReadOnly(this, "provider", signer.provider || null);
    }

    connect(provider: quais.providers.Provider): NonceManager {
        return new NonceManager(this.signer.connect(provider));
    }

    getAddress(): Promise<string> {
        return this.signer.getAddress();
    }

    getTransactionCount(blockTag?: quais.providers.BlockTag): Promise<number> {
        if (blockTag === "pending") {
            if (!this._initialPromise) {
                this._initialPromise = this.signer.getTransactionCount("pending");
            }
            const deltaCount = this._deltaCount;
            return this._initialPromise.then((initial) => (initial + deltaCount));
        }

        return this.signer.getTransactionCount(blockTag);
    }

    setTransactionCount(transactionCount: quais.BigNumberish | Promise<quais.BigNumberish>): void {
        this._initialPromise = Promise.resolve(transactionCount).then((nonce) => {
            return quais.BigNumber.from(nonce).toNumber();
        });
        this._deltaCount = 0;
    }

    incrementTransactionCount(count?: number): void {
        this._deltaCount += ((count == null) ? 1: count);
    }

    signMessage(message: quais.Bytes | string): Promise<string> {
        return this.signer.signMessage(message);;
    }

    signTransaction(transaction: quais.utils.Deferrable<quais.providers.TransactionRequest>): Promise<string> {
        return this.signer.signTransaction(transaction);
    }

    sendTransaction(transaction: quais.utils.Deferrable<quais.providers.TransactionRequest>): Promise<quais.providers.TransactionResponse> {
        if (transaction.nonce == null) {
            transaction = quais.utils.shallowCopy(transaction);
            transaction.nonce = this.getTransactionCount("pending");
            this.incrementTransactionCount();
        } else {
            this.setTransactionCount(transaction.nonce);
            this._deltaCount++;
        }

        return this.signer.sendTransaction(transaction).then((tx) => {
            return tx;
        });
    }
}
