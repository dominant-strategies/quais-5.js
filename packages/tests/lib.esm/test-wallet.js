'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import assert from "assert";
import { quais } from "quais";
import { loadTests } from "@quais/testcases";
import * as utils from "./utils";
describe('Test JSON Wallets', function () {
    let tests = loadTests('wallets');
    tests.forEach(function (test) {
        it(('decrypts wallet - ' + test.name), function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.timeout(1200000);
                if (test.hasAddress) {
                    assert.ok((quais.utils.getJsonWalletAddress(test.json) !== null), 'detect encrypted JSON wallet');
                }
                const wallet = yield quais.Wallet.fromEncryptedJson(test.json, test.password);
                assert.equal(wallet.privateKey, test.privateKey, 'generated correct private key - ' + wallet.privateKey);
                assert.equal(wallet.address.toLowerCase(), test.address, 'generate correct address - ' + wallet.address);
                assert.equal(wallet.address.toLowerCase(), test.address, 'generate correct address - ' + wallet.address);
                const walletAddress = yield wallet.getAddress();
                assert.equal(walletAddress.toLowerCase(), test.address, 'generate correct address - ' + wallet.address);
                // Test connect
                {
                    const provider = new quais.providers.EtherscanProvider();
                    const walletConnected = wallet.connect(provider);
                    assert.equal(walletConnected.provider, provider, "provider is connected");
                    assert.ok((wallet.provider == null), "original wallet provider is null");
                    assert.equal(walletConnected.address.toLowerCase(), test.address, "connected correct address - " + wallet.address);
                }
                // Make sure it can accept a SigningKey
                {
                    const wallet2 = new quais.Wallet(wallet._signingKey());
                    assert.equal(wallet2.privateKey, test.privateKey, 'generated correct private key - ' + wallet2.privateKey);
                }
                // Test the sync decryption (this wallet is light, so it is safe)
                if (test.name === "life") {
                    const wallet2 = quais.Wallet.fromEncryptedJsonSync(test.json, test.password);
                    assert.equal(wallet2.privateKey, test.privateKey, 'generated correct private key - ' + wallet2.privateKey);
                }
                if (test.mnemonic) {
                    const walletMnemonic = yield quais.Wallet.fromMnemonic(test.mnemonic);
                    assert.equal(walletMnemonic.mnemonic.phrase, test.mnemonic, 'mnemonic enabled encrypted wallet has a mnemonic phrase');
                }
            });
        });
    });
    // A few extra test cases to test encrypting/decrypting
    ['one', 'two', 'three'].forEach(function (i) {
        let password = 'foobar' + i;
        let wallet = quais.Wallet.createRandom({ path: "m/56'/82", extraEntropy: utils.randomHexString('test-' + i, 32) });
        it('encrypts and decrypts a random wallet - ' + i, function () {
            this.timeout(1200000);
            return wallet.encrypt(password).then((json) => {
                return quais.Wallet.fromEncryptedJson(json, password).then((decryptedWallet) => {
                    assert.equal(decryptedWallet.address, wallet.address, 'decrypted wallet - ' + wallet.privateKey);
                    assert.equal(decryptedWallet.mnemonic.phrase, wallet.mnemonic.phrase, "decrypted wallet mnemonic - " + wallet.privateKey);
                    assert.equal(decryptedWallet.mnemonic.path, wallet.mnemonic.path, "decrypted wallet path - " + wallet.privateKey);
                    return decryptedWallet.encrypt(password).then((encryptedWallet) => {
                        let parsedWallet = JSON.parse(encryptedWallet);
                        assert.equal(decryptedWallet.address.toLowerCase().substring(2), parsedWallet.address, 're-encrypted wallet - ' + wallet.privateKey);
                    });
                });
            });
        });
    });
});
describe('Test Transaction Signing and Parsing', function () {
    function checkTransaction(parsedTransaction, test) {
        let transaction = {};
        ['nonce', 'gasLimit', 'to', 'value', 'data'].forEach((key) => {
            let expected = test[key];
            let value = parsedTransaction[key];
            if (["gasLimit", "value"].indexOf(key) >= 0) {
                assert.ok((quais.BigNumber.isBigNumber(value)), 'parsed into a big number - ' + key);
                value = value.toHexString();
                if (!expected || expected === '0x') {
                    expected = '0x00';
                }
            }
            else if (key === 'nonce') {
                assert.equal(typeof (value), 'number', 'parse into a number - nonce');
                value = quais.utils.hexlify(value);
                if (!expected || expected === '0x') {
                    expected = '0x00';
                }
            }
            else if (key === 'data') {
                if (!expected) {
                    expected = '0x';
                }
            }
            else if (key === 'to') {
                if (value) {
                    // Make sure the address is valid
                    quais.utils.getAddress(value);
                    value = value.toLowerCase();
                }
            }
            assert.equal(value, expected, 'parses ' + key + ' (legacy)');
            transaction[key] = test[key];
        });
        return transaction;
    }
    let tests = loadTests('parsing-transactions');
    tests.forEach((test) => {
        it(('parses and signs transaction - ' + test.name), function () {
            this.timeout(120000);
            if (test.type == 0) {
                checkTransaction(quais.utils.parseTransaction(test.unsignedTransaction), test);
            }
            let parsedTransaction = quais.utils.parseTransaction(test.signedTransaction);
            checkTransaction(parsedTransaction, test);
        });
    });
    tests.forEach((test) => {
        it(('wallet signs transaction - ' + test.name), function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.timeout(120000);
                const wallet = new quais.Wallet(test.privateKey);
                const transaction = {
                    to: test.to,
                    data: test.data,
                    type: test.type,
                    gasLimit: test.gasLimit,
                    value: test.value,
                    nonce: ((test.nonce) === "0x") ? 0 : test.nonce,
                    chainId: 9000
                };
                const signedTx = yield wallet.signTransaction(transaction);
                assert.equal(signedTx, test.signedTransaction);
            });
        });
    });
});
describe('Test Signing Messages', function () {
    let tests = [
        // See: https://etherscan.io/verifySig/57
        {
            address: '0x14791697260E4c9A71f18484C9f997B308e59325',
            name: 'string("hello world")',
            message: 'hello world',
            messageHash: '0xd9eba16ed0ecae432b71fe008c98cc872bb4cc214d3220a36f365326cf807d68',
            privateKey: '0x0123456789012345678901234567890123456789012345678901234567890123',
            signature: '0xddd0a7290af9526056b4e35a077b9a11b513aa0028ec6c9880948544508f3c63265e99e47ad31bb2cab9646c504576b3abc6939a1710afc08cbf3034d73214b81c'
        },
        // See: https://github.com/quais-io/quais.js/issues/80
        {
            address: '0xD351c7c627ad5531Edb9587f4150CaF393c33E87',
            name: 'bytes(0x47173285...4cb01fad)',
            message: quais.utils.arrayify('0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad'),
            messageHash: '0x93100cc9477ba6522a2d7d5e83d0e075b167224ed8aa0c5860cfd47fa9f22797',
            privateKey: '0x51d1d6047622bca92272d36b297799ecc152dc2ef91b229debf84fc41e8c73ee',
            signature: '0x546f0c996fa4cfbf2b68fd413bfb477f05e44e66545d7782d87d52305831cd055fc9943e513297d0f6755ad1590a5476bf7d1761d4f9dc07dfe473824bbdec751b'
        },
        // See: https://github.com/quais-io/quais.js/issues/85
        {
            address: '0xe7deA7e64B62d1Ca52f1716f29cd27d4FE28e3e1',
            name: 'zero-prefixed signature',
            message: quais.utils.arrayify(quais.utils.id('0x7f23b5eed5bc7e89f267f339561b2697faab234a2')),
            messageHash: '0x06c9d148d268f9a13d8f94f4ce351b0beff3b9ba69f23abbf171168202b2dd67',
            privateKey: '0x09a11afa58d6014843fd2c5fd4e21e7fadf96ca2d8ce9934af6b8e204314f25c',
            signature: '0x7222038446034a0425b6e3f0cc3594f0d979c656206408f937c37a8180bb1bea047d061e4ded4aeac77fa86eb02d42ba7250964ac3eb9da1337090258ce798491c'
        }
    ];
    tests.forEach(function (test) {
        it(('signs a message "' + test.name + '"'), function () {
            this.timeout(120000);
            let wallet = new quais.Wallet(test.privateKey);
            return wallet.signMessage(test.message).then(function (signature) {
                assert.equal(signature, test.signature, 'computes message signature');
            });
        });
    });
    tests.forEach(function (test) {
        it(('verifies a message "' + test.name + '"'), function () {
            this.timeout(120000);
            let address = quais.utils.verifyMessage(test.message, test.signature);
            assert.equal(address, test.address, 'verifies message signature');
        });
    });
    tests.forEach(function (test) {
        it(('hashes a message "' + test.name + '"'), function () {
            this.timeout(120000);
            let hash = quais.utils.hashMessage(test.message);
            assert.equal(hash, test.messageHash, 'calculates message hash');
        });
    });
});
describe("Serialize Transactions", function () {
    it("allows odd-length numeric values", function () {
        quais.utils.serializeTransaction({
            gasLimit: "0x1",
<<<<<<< HEAD
            gasPrice: "0x1",
<<<<<<< HEAD
            value: "0x1"
=======
=======
>>>>>>> 0858ff5 (test-utils.ts)
            value: "0x1",
            maxPriorityFeePerGas: "0x1",
            maxFeePerGas: "0x1",
            type: 0,
            //nonce: 0,
<<<<<<< HEAD
>>>>>>> 8048f36 (test-wallet.ts)
=======
>>>>>>> 0858ff5 (test-utils.ts)
        });
        //console.log(result);
    });
});
describe("Wallet Errors", function () {
    it("fails on privateKey/address mismatch", function () {
        assert.throws(() => {
            const wallet = new quais.Wallet({
                privateKey: "0x6a73cd9b03647e83ef937888a5258a26e4c766dbf41ddd974f15e32d09cfe9c0",
                address: "0x3f4f037dfc910a3517b9a5b23cf036ffae01a5a7"
            });
            console.log(wallet);
        }, (error) => {
            return error.reason === "privateKey/address mismatch";
        });
    });
    it("fails on mnemonic/address mismatch", function () {
        assert.throws(() => {
            const wallet = new quais.Wallet({
                privateKey: "0x6a73cd9b03647e83ef937888a5258a26e4c766dbf41ddd974f15e32d09cfe9c0",
                address: "0x4Dfe3BF68c80f19083FF90E6a852fC876AE7429b",
                mnemonic: {
                    phrase: "pact grief smile usage kind pledge river excess garbage mixed olive receive"
                }
            });
            console.log(wallet);
        }, (error) => {
            return error.reason === "mnemonic/address mismatch";
        });
    });
    it("fails on from mismatch", function () {
        const wallet = new quais.Wallet("0x6a73cd9b03647e83ef937888a5258a26e4c766dbf41ddd974f15e32d09cfe9c0");
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield wallet.signTransaction({
                    from: "0x3f4f037dfc910a3517b9a5b23cf036ffae01a5a7"
                });
            }
            catch (error) {
                if (error.code === quais.utils.Logger.errors.INVALID_ARGUMENT && error.argument === "transaction.from") {
                    resolve(true);
                    return;
                }
            }
            reject(new Error("assert failed; did not throw"));
        }));
    });
});
//# sourceMappingURL=test-wallet.js.map