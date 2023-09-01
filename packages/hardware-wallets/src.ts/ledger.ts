"use strict";

import { quais } from "quais";

import { version } from "./_version";
const logger = new quais.utils.Logger(version);

import Eth from "@ledgerhq/hw-app-eth";

// We store these in a separated import so it is easier to swap them out
// at bundle time; browsers do not get HID, for example. This maps a string
// "type" to a Transport with create.
import { transports } from "./ledger-transport";

const defaultPath = "m/44'/60'/0'/0/0";

function waiter(duration: number): Promise<void> {
   return new Promise((resolve) => {
       setTimeout(resolve, duration);
   });
}

export class LedgerSigner extends quais.Signer {
    readonly type: string;
    readonly path: string

    readonly _eth: Promise<Eth>;

    constructor(provider?: quais.providers.Provider, type?: string, path?: string) {
        super();
        if (path == null) { path = defaultPath; }
        if (type == null) { type = "default"; }

        quais.utils.defineReadOnly(this, "path", path);
        quais.utils.defineReadOnly(this, "type", type);
        quais.utils.defineReadOnly(this, "provider", provider || null);

        const transport = transports[type];
        if (!transport) { logger.throwArgumentError("unknown or unsupported type", "type", type); }

        quais.utils.defineReadOnly(this, "_eth", transport.create().then((transport) => {
            const eth = new Eth(transport);
            return eth.getAppConfiguration().then((config) => {
                return eth;
            }, (error) => {
                return Promise.reject(error);
            });
        }, (error) => {
            return Promise.reject(error);
        }));
    }

    _retry<T = any>(callback: (eth: Eth) => Promise<T>, timeout?: number): Promise<T> {
        return new Promise(async (resolve, reject) => {
            if (timeout && timeout > 0) {
                setTimeout(() => { reject(new Error("timeout")); }, timeout);
            }

            const eth = await this._eth;

            // Wait up to 5 seconds
            for (let i = 0; i < 50; i++) {
                try {
                    const result = await callback(eth);
                    return resolve(result);
                } catch (error) {
                    if (error.id !== "TransportLocked") {
                        return reject(error);
                    }
                }
                await waiter(100);
            }

            return reject(new Error("timeout"));
        });
    }

    async getAddress(): Promise<string> {
        const account = await this._retry((eth) => eth.getAddress(this.path));
        return quais.utils.getAddress(account.address);
    }

    async signMessage(message: quais.utils.Bytes | string): Promise<string> {
        if (typeof(message) === 'string') {
            message = quais.utils.toUtf8Bytes(message);
        }

        const messageHex = quais.utils.hexlify(message).substring(2);

        const sig = await this._retry((eth) => eth.signPersonalMessage(this.path, messageHex));
        sig.r = '0x' + sig.r;
        sig.s = '0x' + sig.s;
        return quais.utils.joinSignature(sig);
    }

    async signTransaction(transaction: quais.providers.TransactionRequest): Promise<string> {
        const tx = await quais.utils.resolveProperties(transaction);
        const baseTx: quais.utils.UnsignedTransaction = {
            chainId: (tx.chainId || undefined),
            data: (tx.data || undefined),
            gasLimit: (tx.gasLimit || undefined),
            gasPrice: (tx.gasPrice || undefined),
            nonce: (tx.nonce ? quais.BigNumber.from(tx.nonce).toNumber(): undefined),
            to: (tx.to || undefined),
            value: (tx.value || undefined),
        };

        const unsignedTx = quais.utils.serializeTransaction(baseTx).substring(2);
        const sig = await this._retry((eth) => eth.signTransaction(this.path, unsignedTx));

        return quais.utils.serializeTransaction(baseTx, {
            v: quais.BigNumber.from("0x" + sig.v).toNumber(),
            r: ("0x" + sig.r),
            s: ("0x" + sig.s),
        });
    }

    connect(provider: quais.providers.Provider): quais.Signer {
        return new LedgerSigner(provider, this.type, this.path);
    }
}
