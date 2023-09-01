"use strict";
import { quais } from "quais";
import scrypt from "scrypt-js";
import { version } from "./_version";
const logger = new quais.utils.Logger(version);
let warned = false;
export class BrainWallet extends quais.Wallet {
    static _generate(username, password, legacy, progressCallback) {
        if (!warned) {
            logger.warn("Warning: using Brain Wallets should be considered insecure (this warning will not be repeated)");
            warned = true;
        }
        let usernameBytes = null;
        let passwordBytes = null;
        if (typeof (username) === 'string') {
            logger.checkNormalize();
            usernameBytes = quais.utils.toUtf8Bytes(username.normalize('NFKC'));
        }
        else {
            usernameBytes = quais.utils.arrayify(username);
        }
        if (typeof (password) === 'string') {
            logger.checkNormalize();
            passwordBytes = quais.utils.toUtf8Bytes(password.normalize('NFKC'));
        }
        else {
            passwordBytes = quais.utils.arrayify(password);
        }
        return scrypt.scrypt(passwordBytes, usernameBytes, (1 << 18), 8, 1, 32, progressCallback).then((key) => {
            if (legacy) {
                return new BrainWallet(key);
            }
            const mnemonic = quais.utils.entropyToMnemonic(quais.utils.arrayify(key).slice(0, 16));
            return new BrainWallet(quais.Wallet.fromMnemonic(mnemonic));
        });
    }
    static generate(username, password, progressCallback) {
        return BrainWallet._generate(username, password, false, progressCallback);
    }
    static generateLegacy(username, password, progressCallback) {
        return BrainWallet._generate(username, password, true, progressCallback);
    }
}
//# sourceMappingURL=brain-wallet.js.map