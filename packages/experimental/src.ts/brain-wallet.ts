"use strict";

import { quais } from "quais";

import scrypt from "scrypt-js";

import { version } from "./_version";

const logger = new quais.utils.Logger(version);

let warned = false;

export class BrainWallet extends quais.Wallet {

    static _generate(username: quais.Bytes | string, password: quais.Bytes | string, legacy: boolean, progressCallback?: quais.utils.ProgressCallback): Promise<BrainWallet> {
        if (!warned) {
            logger.warn("Warning: using Brain Wallets should be considered insecure (this warning will not be repeated)");
            warned = true;
        }
        let usernameBytes: Uint8Array = null;
        let passwordBytes: Uint8Array = null;

        if (typeof(username) === 'string') {
            logger.checkNormalize();
            usernameBytes = quais.utils.toUtf8Bytes(username.normalize('NFKC'));
        } else {
            usernameBytes = quais.utils.arrayify(username);
        }

        if (typeof(password) === 'string') {
            logger.checkNormalize();
            passwordBytes = quais.utils.toUtf8Bytes(password.normalize('NFKC'));
        } else {
            passwordBytes = quais.utils.arrayify(password);
        }

        return scrypt.scrypt(passwordBytes, usernameBytes, (1 << 18), 8, 1, 32, progressCallback).then((key: Uint8Array) => {
            if (legacy) {
                return new BrainWallet(key);

            }
            const mnemonic = quais.utils.entropyToMnemonic(quais.utils.arrayify(key).slice(0, 16));
            return new BrainWallet(quais.Wallet.fromMnemonic(mnemonic));
        });
    }

    static generate(username: quais.Bytes | string, password: quais.Bytes | string, progressCallback?: quais.utils.ProgressCallback): Promise<BrainWallet> {
        return BrainWallet._generate(username, password, false, progressCallback);
    }

    static generateLegacy(username: quais.Bytes | string, password: quais.Bytes | string, progressCallback?: quais.utils.ProgressCallback): Promise<BrainWallet> {
        return BrainWallet._generate(username, password, true, progressCallback);
    }
}

/*
// Test Legacy correctly matches our old test-vector:
// See: https://github.com/quais-io/quais.js/blob/3bf39b3bee0834566243211783ed8ec052c2f950/tests/test-wallet.js#L13
BrainWallet.generateLegacy("ricmoo", "password").then((wallet) => {
    console.log("Expected:", "0xbed9d2E41BdD066f702C4bDB86eB3A3740101acC");
    console.log(wallet);
});


BrainWallet.generate("ricmoo", "password").then((wallet) => {
    console.log("Expected:", "0xbed9d2E41BdD066f702C4bDB86eB3A3740101acC");
    console.log(wallet);
});
*/
