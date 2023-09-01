"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrainWallet = void 0;
var quais_1 = require("quais");
var scrypt_js_1 = __importDefault(require("scrypt-js"));
var _version_1 = require("./_version");
var logger = new quais_1.quais.utils.Logger(_version_1.version);
var warned = false;
var BrainWallet = /** @class */ (function (_super) {
    __extends(BrainWallet, _super);
    function BrainWallet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrainWallet._generate = function (username, password, legacy, progressCallback) {
        if (!warned) {
            logger.warn("Warning: using Brain Wallets should be considered insecure (this warning will not be repeated)");
            warned = true;
        }
        var usernameBytes = null;
        var passwordBytes = null;
        if (typeof (username) === 'string') {
            logger.checkNormalize();
            usernameBytes = quais_1.quais.utils.toUtf8Bytes(username.normalize('NFKC'));
        }
        else {
            usernameBytes = quais_1.quais.utils.arrayify(username);
        }
        if (typeof (password) === 'string') {
            logger.checkNormalize();
            passwordBytes = quais_1.quais.utils.toUtf8Bytes(password.normalize('NFKC'));
        }
        else {
            passwordBytes = quais_1.quais.utils.arrayify(password);
        }
        return scrypt_js_1.default.scrypt(passwordBytes, usernameBytes, (1 << 18), 8, 1, 32, progressCallback).then(function (key) {
            if (legacy) {
                return new BrainWallet(key);
            }
            var mnemonic = quais_1.quais.utils.entropyToMnemonic(quais_1.quais.utils.arrayify(key).slice(0, 16));
            return new BrainWallet(quais_1.quais.Wallet.fromMnemonic(mnemonic));
        });
    };
    BrainWallet.generate = function (username, password, progressCallback) {
        return BrainWallet._generate(username, password, false, progressCallback);
    };
    BrainWallet.generateLegacy = function (username, password, progressCallback) {
        return BrainWallet._generate(username, password, true, progressCallback);
    };
    return BrainWallet;
}(quais_1.quais.Wallet));
exports.BrainWallet = BrainWallet;
//# sourceMappingURL=brain-wallet.js.map