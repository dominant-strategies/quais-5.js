"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
//import Web3HttpProvider from "web3-providers-http";
var quais_1 = require("quais");
var utils_1 = require("./utils");
var bnify = quais_1.quais.BigNumber.from;
var blockchainData = {
    homestead: {
        addresses: [
            {
                address: "0x044f7c17c62f566302DE11b3aC0875b0292031E1",
                balance: bnify("4813414100000000"),
                code: "0x"
            },
            // Splitter contract
            {
                address: "0x3474627D4F63A678266BC17171D87f8570936622",
                code: "0x606060405260e060020a60003504630b3ed5368114602e57806337b0574a14605257806356fa47f0146062575b005b602c6004356000546101009004600160a060020a03908116339091161460bb575b50565b60005460ff166060908152602090f35b602c60043560005460ff1615609657600160a060020a038116600034606082818181858883f193505050501515604f576002565b33600160a060020a0316600034606082818181858883f193505050501515604f576002565b600080546101009004600160a060020a03169082606082818181858883f193505050501515604f57600256",
                storage: {
                    "0": "0x0000000000000000000000b2682160c482eb985ec9f3e364eec0a904c44c2300"
                }
            },
        ],
        blocks: [
            {
                baseFeePerGas: "0x3b9aca00",
                difficulty: "0x72ea4ce58",
                extRollupRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
                extTransactions: [],
                extTransactionsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
                extraData: "0xdf8776302e31382e3087676f2d7175616988676f312e32312e30856c696e7578",
                gasLimit: bnify("0x4c4b40"),
                gasUsed: bnify("0x0"),
                hash: "0x32627a1ebb4085cb4e57c98e2439b1ae8dcb25701e7a1e20c68a6dea2dd29a16",
                location: "0x0000",
                manifestHash: [
                    "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
                    "0x28fa804910b4243464d3af3098ec4ccdf3be9ef3516106cfb56262d2aacafb0a",
                    "0x7367b32c83214a7971a2ea3b191d9712d46d93bcb5728cb83a2f81345b0c6b5a"
                ],
                miner: "0x08317adcea9880dce5d6d21c723af39338a83663",
                mixHash: "0xe6d60dcd3c7e2c870b32f858d588b8ab5ed0b0b8c820f689d3a65b5f0b904190",
                nonce: "0x6b6a0ef18cfe6371",
                number: [
                    "0x54d",
                    "0x2759",
                    "0x186a0"
                ],
                order: 2,
                parentDeltaS: [
                    "0x0",
                    "0x280bb17c27c8151a41b1",
                    "0x9de48078460765ceaf7"
                ],
                parentEntropy: [
                    "0x1c84357313bf394b43185c5",
                    "0x1c86b62e2b81b5cc94bc776",
                    "0x1c862d2032e695b54d49121"
                ],
                parentHash: [
                    "0x1ccf45cf6f077f35480c4447ea1863d51616e038069da4f61776278a7165f924",
                    "0x956ff69afac44804ac5444098daa58160e3bdc85d80f02efc1b2547594839d52",
                    "0x2f40c7c568f3ece80ca3ab75e7835feb4fc0ccca876084ec9cf944580b2d9df4"
                ],
                receiptsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
                sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
                size: "0x25d",
                stateRoot: "0xf5c50d3c262e3fa2a2298ce36ac19fb395e866e39d22d68d8b449f2643a2a21e",
                subManifest: [],
                timestamp: "0x6523df74",
                totalEntropy: "0x1c862f4e3366f21e02a280a",
                transactions: [],
                transactionsRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
                uncles: []
            }
        ],
        transactions: [
            {
                blockHash: "0x2b9ca75c7cad6f689e5155e7ee5cc48e16efe6a20104727cfd94d33d7ae626b3",
                blockNumber: "0x2a44f",
                from: "0x18c5a980382b6ed6688b9e4111e0ab06101242c8",
                gas: "0xa410",
                maxFeePerGas: "0x430e23400",
                maxPriorityFeePerGas: "0x3b9aca00",
                hash: "0x25159ef781e5b58d7ceb1ecf68038bf99ce116919c2caf9d3dfb8ba1c953e5ef",
                input: "0x",
                nonce: "0x3a0",
                to: "0x178e0480d9bd8a3537f148588682749fbf2aae0d",
                transactionIndex: "0x5",
                value: "0x18",
                type: "0x0",
                accessList: [],
                chainId: "0x2328",
                v: "0x0",
                r: "0x80ad17bd6f1e36501617d6d5c972d588a3467d8384a68e9d96fbc9c00569deb4",
                s: "0x44fb2db41467edca734df23a49aa6cbf92d45a358b5b03f5a9ee86e05ed4653e"
            }
        ],
        transactionReceipts: [
            {
                blockHash: "0x2b9ca75c7cad6f689e5155e7ee5cc48e16efe6a20104727cfd94d33d7ae626b3",
                blockNumber: "0x2a44f",
                contractAddress: null,
                cumulativeGasUsed: "0x1ec30",
                effectiveGasPrice: "0x77359400",
                etxs: [],
                from: "0x18c5a980382b6ed6688b9e4111e0ab06101242c8",
                gasUsed: "0x5208",
                logs: [],
                logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                status: "0x1",
                to: "0x178e0480d9bd8a3537f148588682749fbf2aae0d",
                transactionHash: "0x25159ef781e5b58d7ceb1ecf68038bf99ce116919c2caf9d3dfb8ba1c953e5ef",
                transactionIndex: "0x5",
                type: "0x0"
            }
        ]
    },
};
blockchainData["default"] = blockchainData.homestead;
function equals(name, actual, expected) {
    if (expected && expected.eq) {
        if (actual == null) {
            assert_1.default.ok(false, name + " - actual big number null");
        }
        expected = quais_1.quais.BigNumber.from(expected);
        actual = quais_1.quais.BigNumber.from(actual);
        assert_1.default.ok(expected.eq(actual), name + " matches");
    }
    else if (Array.isArray(expected)) {
        if (actual == null) {
            assert_1.default.ok(false, name + " - actual array null");
        }
        assert_1.default.equal(actual.length, expected.length, name + " array lengths match");
        for (var i = 0; i < expected.length; i++) {
            equals("(" + name + " - item " + i + ")", actual[i], expected[i]);
        }
    }
    else if (typeof (expected) === "object") {
        if (actual == null) {
            if (expected === actual) {
                return;
            }
            assert_1.default.ok(false, name + " - actual object null");
        }
        var keys_1 = {};
        Object.keys(expected).forEach(function (key) { keys_1[key] = true; });
        Object.keys(actual).forEach(function (key) { keys_1[key] = true; });
        Object.keys(keys_1).forEach(function (key) {
            equals("(" + name + " - key + " + key + ")", actual[key], expected[key]);
        });
    }
    else {
        if (actual == null) {
            assert_1.default.ok(false, name + " - actual null");
        }
        assert_1.default.equal(actual, expected, name + " matches");
    }
}
function waiter(duration) {
    return new Promise(function (resolve) {
        var timer = setTimeout(resolve, duration);
        if (timer.unref) {
            timer.unref();
        }
    });
}
var allNetworks = ["default", "homestead"];
// We use separate API keys because otherwise the testcases sometimes
// fail during CI because our default keys are pretty heavily used
var providerFunctions = [
    {
        name: "getDefaultProvider",
        networks: allNetworks,
        create: function (network) {
            if (network == "default") {
                var prov_1 = quais_1.quais.getDefaultProvider('https://rpc.cyprus1.colosseum.quaiscan.io');
                console.log(prov_1);
                return prov_1;
            }
            var prov = quais_1.quais.getDefaultProvider('https://rpc.cyprus1.colosseum.quaiscan.io');
            console.log(prov);
            return prov;
        }
    },
];
var fundWallet;
do {
    fundWallet = quais_1.quais.Wallet.createRandom();
    var firstPart = parseInt(fundWallet.address.slice(2, 4), 16);
} while (firstPart > 29); //0x1D in hex, keep generating until cyprus1 addr
var testFunctions = [];
Object.keys(blockchainData).forEach(function (network) {
    function addSimpleTest(name, func, expected) {
        var _this = this;
        testFunctions.push({
            name: name,
            networks: [network],
            execute: function (provider) { return __awaiter(_this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, func(provider)];
                        case 1:
                            value = _a.sent();
                            equals(name, expected, value);
                            return [2 /*return*/];
                    }
                });
            }); }
        });
    }
    function addObjectTest(name, func, expected, checkSkip) {
        var _this = this;
        testFunctions.push({
            name: name,
            networks: [network],
            checkSkip: checkSkip,
            execute: function (provider) { return __awaiter(_this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, func(provider)];
                        case 1:
                            value = _a.sent();
                            Object.keys(expected).forEach(function (key) {
                                equals(name + "." + key, value[key], expected[key]);
                            });
                            return [2 /*return*/];
                    }
                });
            }); }
        });
    }
    var tests = blockchainData[network];
    // And address test case can have any of the following:
    // - balance
    // - code
    // - storage
    // - ENS name
    tests.addresses.forEach(function (test) {
        if (test.balance) {
            addSimpleTest("fetches account balance: " + test.address, function (provider) {
                console.log("fetches account balance: " + test.address, provider);
                return provider.getBalance(test.address);
            }, test.balance);
        }
        if (test.code) {
            addSimpleTest("fetches account code: " + test.address, function (provider) {
                return provider.getCode(test.address);
            }, test.code);
        }
        if (test.storage) {
            Object.keys(test.storage).forEach(function (position) {
                addSimpleTest("fetches storage: " + test.address + ":" + position, function (provider) {
                    return provider.getStorageAt(test.address, bnify(position));
                }, test.storage[position]);
            });
        }
    });
    tests.blocks.forEach(function (test) {
        addObjectTest("fetches block (by number) #" + test.number, function (provider) {
            console.log("Fetching block #" + test.number, provider);
            return provider.getBlock(test.number);
        }, test);
    });
    tests.blocks.forEach(function (test) {
        addObjectTest("fetches block (by hash) " + test.hash, function (provider) {
            return provider.getBlock(test.hash);
        }, test, function (provider, network, test) {
            return (provider === "JsonRpcProvider");
        });
    });
    tests.transactions.forEach(function (test) {
        var hash = test.hash;
        addObjectTest("fetches transaction " + hash, function (provider) { return __awaiter(void 0, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, provider.getTransaction(hash)];
                    case 1:
                        tx = _a.sent();
                        // This changes with every block
                        assert_1.default.equal(typeof (tx.confirmations), "number", "confirmations is a number");
                        delete tx.confirmations;
                        assert_1.default.equal(typeof (tx.wait), "function", "wait is a function");
                        delete tx.wait;
                        return [2 /*return*/, tx];
                }
            });
        }); }, test, function (provider, network, test) {
            // Temporary; pocket is being broken again for old transactions
            return provider === "JsonRpcProvider";
            //return false;
        });
    });
    tests.transactionReceipts.forEach(function (test) {
        var hash = test.transactionHash;
        addObjectTest("fetches transaction receipt " + hash, function (provider) { return __awaiter(void 0, void 0, void 0, function () {
            var receipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, provider.getTransactionReceipt(hash)];
                    case 1:
                        receipt = _a.sent();
                        assert_1.default.ok(!!receipt, "missing receipt");
                        if (test.status === null) {
                            assert_1.default.ok(receipt.status === undefined, "no status");
                            receipt.status = null;
                        }
                        // This changes with every block; so just make sure it is a number
                        assert_1.default.equal(typeof (receipt.confirmations), "number", "confirmations is a number");
                        delete receipt.confirmations;
                        return [2 /*return*/, receipt];
                }
            });
        }); }, test, function (provider, network, test) {
            // Temporary; pocket is being broken again for old transactions
            return provider === "PocketProvider";
            //return false;
        });
    });
});
(function () {
    var _this = this;
    function addErrorTest(code, func) {
        var _this = this;
        testFunctions.push({
            name: "throws correct " + code + " error",
            networks: ["goerli"],
            checkSkip: function (provider, network, test) {
                return false;
            },
            execute: function (provider) { return __awaiter(_this, void 0, void 0, function () {
                var value, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, func(provider)];
                        case 1:
                            value = _a.sent();
                            console.log(value);
                            assert_1.default.ok(false, "did not throw");
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            assert_1.default.equal(error_1.code, code, "incorrect error thrown: actual:" + error_1.code + " != expected:" + code);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); }
        });
    }
    /*
    @TODO: Use this for testing pre-EIP-155 transactions on specific networks
    addErrorTest(quais.utils.Logger.errors.NONCE_EXPIRED, async (provider: quais.providers.Provider) => {
        return provider.sendTransaction("0xf86480850218711a0082520894000000000000000000000000000000000000000002801ba038aaddcaaae7d3fa066dfd6f196c8348e1bb210f2c121d36cb2c24ef20cea1fba008ae378075d3cd75aae99ab75a70da82161dffb2c8263dabc5d8adecfa9447fa");
    });
    */
    // Wallet(id("foobar1234"))
    addErrorTest(quais_1.quais.utils.Logger.errors.NONCE_EXPIRED, function (provider) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, provider.sendTransaction("0x02f86e05808459682f008459682f14830186a09475544911a6f2e69ceea374f3f7e5ea9c987ece098304cb2f80c001a0d9585a780dde9e7d8c855aacec0564054b49114931fd7e320e4e983009d864f7a050bee916f2770ef17367256d8bccfbc49885467a6ba27cf5cc57e8553c73a191")];
        });
    }); });
    addErrorTest(quais_1.quais.utils.Logger.errors.INSUFFICIENT_FUNDS, function (provider) { return __awaiter(_this, void 0, void 0, function () {
        var txProps, wallet, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    txProps = {
                        to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
                        gasPrice: 9000000000,
                        gasLimit: 21000,
                        chainId: 5,
                        value: 1,
                    };
                    wallet = quais_1.quais.Wallet.createRandom();
                    return [4 /*yield*/, wallet.signTransaction(txProps)];
                case 1:
                    tx = _a.sent();
                    return [2 /*return*/, provider.sendTransaction(tx)];
            }
        });
    }); });
    addErrorTest(quais_1.quais.utils.Logger.errors.INSUFFICIENT_FUNDS, function (provider) { return __awaiter(_this, void 0, void 0, function () {
        var txProps, wallet;
        return __generator(this, function (_a) {
            txProps = {
                to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
                gasPrice: 9000000000,
                gasLimit: 21000,
                value: 1,
            };
            wallet = quais_1.quais.Wallet.createRandom().connect(provider);
            return [2 /*return*/, wallet.sendTransaction(txProps)];
        });
    }); });
    addErrorTest(quais_1.quais.utils.Logger.errors.UNPREDICTABLE_GAS_LIMIT, function (provider) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, provider.estimateGas({
                    to: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" // ENS contract
                })];
        });
    }); });
})();
/*
testFunctions.push({
    name: "sends a legacy transaction",
    extras: [ "funding" ],         // We need funding to the fundWallet
    timeout: 900,                  // 15 minutes
    networks: [ "goerli" ],       // Only test on Goerli
    checkSkip: (provider: string, network: string, test: TestDescription) => {
        // This isn't working right now on Ankr
        return (provider === "AnkrProvider");
    },
    execute: async (provider: quais.providers.Provider) => {
        const gasPrice = (await provider.getGasPrice()).mul(10);

        const wallet = fundWallet.connect(provider);

        const addr = "0x8210357f377E901f18E45294e86a2A32215Cc3C9";

        await waiter(3000);

        const b0 = await provider.getBalance(wallet.address);
        assert.ok(b0.gt(quais.constants.Zero), "balance is non-zero");

        const tx = await wallet.sendTransaction({
            type: 0,
            to: addr,
            value: 123,
            gasPrice: gasPrice
        });

        await tx.wait();

        await waiter(3000);

        const b1 = await provider.getBalance(wallet.address);
        assert.ok(b0.gt(b1), "balance is decreased");
    }
});
*/
testFunctions.push({
    name: "sends an EIP-2930 transaction",
    extras: ["funding"],
    timeout: 900,
    networks: ["goerli"],
    checkSkip: function (provider, network, test) {
        // This isn't working right now on Ankr
        return (provider === "AnkrProvider");
    },
    execute: function (provider) { return __awaiter(void 0, void 0, void 0, function () {
        var gasPrice, wallet, addr, b0, tx, b1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, provider.getGasPrice()];
                case 1:
                    gasPrice = (_a.sent()).mul(10);
                    wallet = fundWallet.connect(provider);
                    addr = "0x8210357f377E901f18E45294e86a2A32215Cc3C9";
                    return [4 /*yield*/, waiter(3000)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, provider.getBalance(wallet.address)];
                case 3:
                    b0 = _a.sent();
                    assert_1.default.ok(b0.gt(quais_1.quais.constants.Zero), "balance is non-zero");
                    return [4 /*yield*/, wallet.sendTransaction({
                            type: 1,
                            //chainId: (await provider.getNetwork()).chainId,
                            accessList: {
                                "0x8ba1f109551bD432803012645Ac136ddd64DBA72": [
                                    "0x0000000000000000000000000000000000000000000000000000000000000000",
                                    "0x0000000000000000000000000000000000000000000000000000000000000042",
                                ]
                            },
                            to: addr,
                            value: 123,
                            gasPrice: gasPrice
                        })];
                case 4:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, waiter(3000)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, provider.getBalance(wallet.address)];
                case 7:
                    b1 = _a.sent();
                    assert_1.default.ok(b0.gt(b1), "balance is decreased");
                    return [2 /*return*/];
            }
        });
    }); }
});
testFunctions.push({
    name: "sends an EIP-1559 transaction",
    extras: ["funding"],
    timeout: 900,
    networks: ["goerli"],
    checkSkip: function (provider, network, test) {
        // These don't support EIP-1559 yet for sending
        //return (provider === "AlchemyProvider" );
        return (provider === "AnkrProvider");
    },
    execute: function (provider) { return __awaiter(void 0, void 0, void 0, function () {
        var wallet, addr, b0, tx, b1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wallet = fundWallet.connect(provider);
                    addr = "0x8210357f377E901f18E45294e86a2A32215Cc3C9";
                    return [4 /*yield*/, waiter(3000)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, provider.getBalance(wallet.address)];
                case 2:
                    b0 = _a.sent();
                    assert_1.default.ok(b0.gt(quais_1.quais.constants.Zero), "balance is non-zero");
                    return [4 /*yield*/, wallet.sendTransaction({
                            type: 2,
                            accessList: {
                                "0x8ba1f109551bD432803012645Ac136ddd64DBA72": [
                                    "0x0000000000000000000000000000000000000000000000000000000000000000",
                                    "0x0000000000000000000000000000000000000000000000000000000000000042",
                                ]
                            },
                            to: addr,
                            value: 123,
                        })];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, waiter(3000)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, provider.getBalance(wallet.address)];
                case 6:
                    b1 = _a.sent();
                    assert_1.default.ok(b0.gt(b1), "balance is decreased");
                    return [2 /*return*/];
            }
        });
    }); }
});
describe("Test Provider Methods", function () {
    var fundReceipt = null;
    before(function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.timeout(300000);
                // Get some ether from the faucet
                //const funder = await quais.utils.fetchJson(`https:/\/api.quais.io/api/v1/?action=fundAccount&address=${ fundWallet.address.toLowerCase() }`);
                fundReceipt = (0, utils_1.fundAddress)(fundWallet.address).then(function (hash) {
                    console.log("*** Funded: " + fundWallet.address);
                    return hash;
                });
                return [2 /*return*/];
            });
        });
    });
    after(function () {
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(300000);
                        // Wait until the funding is complete
                        return [4 /*yield*/, fundReceipt];
                    case 1:
                        // Wait until the funding is complete
                        _a.sent();
                        return [4 /*yield*/, (0, utils_1.returnFunds)(fundWallet)];
                    case 2:
                        hash = _a.sent();
                        console.log("*** Sweep Transaction:", hash);
                        return [2 /*return*/];
                }
            });
        });
    });
    providerFunctions.forEach(function (_a) {
        var name = _a.name, networks = _a.networks, create = _a.create;
        networks.forEach(function (network) {
            var provider = create(network);
            testFunctions.forEach(function (test) {
                // Skip tests not supported on this network
                if (test.networks.indexOf(network) === -1) {
                    return;
                }
                if (test.checkSkip && test.checkSkip(name, network, test)) {
                    return;
                }
                // How many attempts to try?
                var attempts = (test.attempts != null) ? test.attempts : 3;
                var timeout = (test.timeout != null) ? test.timeout : 60;
                var extras = (test.extras || []).reduce(function (accum, key) {
                    accum[key] = true;
                    return accum;
                }, {});
                it(name + "." + (network ? network : "default") + " " + test.name, function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var error, attempt, result, attemptError_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    // Multiply by 2 to make sure this never happens; we want our
                                    // timeout logic to success, not allow a done() called multiple
                                    // times because our logic returns after the timeout has occurred.
                                    this.timeout(2 * (1000 + timeout * 1000 * attempts));
                                    if (!extras.funding) return [3 /*break*/, 2];
                                    return [4 /*yield*/, fundReceipt];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    if (!!extras.nowait) return [3 /*break*/, 4];
                                    return [4 /*yield*/, waiter(1000)];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4:
                                    error = null;
                                    attempt = 0;
                                    _a.label = 5;
                                case 5:
                                    if (!(attempt < attempts)) return [3 /*break*/, 11];
                                    _a.label = 6;
                                case 6:
                                    _a.trys.push([6, 8, , 10]);
                                    console.log("Test:", test);
                                    return [4 /*yield*/, Promise.race([
                                            test.execute(provider),
                                            waiter(timeout * 1000).then(function (result) { throw new Error("timeout"); })
                                        ])];
                                case 7:
                                    result = _a.sent();
                                    return [2 /*return*/, result];
                                case 8:
                                    attemptError_1 = _a.sent();
                                    console.log("*** Failed attempt " + (attempt + 1) + ": " + attemptError_1.message);
                                    error = attemptError_1;
                                    // On failure, wait 5s
                                    return [4 /*yield*/, waiter(5000)];
                                case 9:
                                    // On failure, wait 5s
                                    _a.sent();
                                    return [3 /*break*/, 10];
                                case 10:
                                    attempt++;
                                    return [3 /*break*/, 5];
                                case 11: throw error;
                            }
                        });
                    });
                });
            });
        });
    });
});
describe("Test WebSocketProvider", function () {
    this.retries(3);
    function testWebSocketProvider(provider) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, provider.destroy()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    it("InfuraProvider.getWebSocketProvider", function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = quais_1.quais.providers.InfuraProvider.getWebSocketProvider();
                        return [4 /*yield*/, testWebSocketProvider(provider)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
describe("Test Events", function () {
    this.retries(3);
    function testBlockEvent(provider) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var firstBlockNumber = null;
                        var handler = function (blockNumber) {
                            if (firstBlockNumber == null) {
                                firstBlockNumber = blockNumber;
                                return;
                            }
                            provider.removeListener("block", handler);
                            if (firstBlockNumber + 1 === blockNumber) {
                                resolve(true);
                            }
                            else {
                                reject(new Error("blockNumber fail"));
                            }
                        };
                        provider.on("block", handler);
                    })];
            });
        });
    }
    it("InfuraProvider", function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        provider = new quais_1.quais.providers.InfuraProvider("goerli");
                        return [4 /*yield*/, testBlockEvent(provider)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
describe("Test CCIP execution", function () {
    var address = "0x6C5ed35574a9b4d163f75bBf0595F7540D8FCc2d";
    var ABI = [
        //'error OffchainLookup(address sender, string[] urls, bytes callData, bytes4 callbackFunction, bytes extraData)',
        'function testGet(bytes callData) view returns (bytes32)',
        'function testGetFail(bytes callData) view returns (bytes32)',
        'function testGetSenderFail(bytes callData) view returns (bytes32)',
        'function testGetFallback(bytes callData) view returns (bytes32)',
        'function testGetMissing(bytes callData) view returns (bytes32)',
        'function testPost(bytes callData) view returns (bytes32)',
        'function verifyTest(bytes result, bytes extraData) pure returns (bytes32)'
    ];
    var provider = providerFunctions[0].create("goerli");
    var contract = new quais_1.quais.Contract(address, ABI, provider);
    // This matches the verify method in the Solidity contract against the
    // processed data from the endpoint
    var verify = function (sender, data, result) {
        var check = quais_1.quais.utils.concat([
            quais_1.quais.utils.arrayify(quais_1.quais.utils.arrayify(sender).length),
            sender,
            quais_1.quais.utils.arrayify(quais_1.quais.utils.arrayify(data).length),
            data
        ]);
        assert_1.default.equal(result, quais_1.quais.utils.keccak256(check), "response is equal");
    };
    it("testGet passes under normal operation", function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        data = "0x1234";
                        return [4 /*yield*/, contract.testGet(data, { ccipReadEnabled: true })];
                    case 1:
                        result = _a.sent();
                        verify(address, data, result);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("testGet should fail with CCIP not explicitly enabled by overrides", function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        data = "0x1234";
                        return [4 /*yield*/, contract.testGet(data)];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        assert_1.default.fail("throw-failed");
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        if (error_2.message === "throw-failed") {
                            throw error_2;
                        }
                        if (error_2.code !== "CALL_EXCEPTION") {
                            console.log(error_2);
                            assert_1.default.fail("failed");
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    it("testGet should fail with CCIP explicitly disabled on provider", function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider, contract, data, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        provider = providerFunctions[0].create("goerli");
                        provider.disableCcipRead = true;
                        contract = new quais_1.quais.Contract(address, ABI, provider);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        data = "0x1234";
                        return [4 /*yield*/, contract.testGet(data, { ccipReadEnabled: true })];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        assert_1.default.fail("throw-failed");
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        if (error_3.message === "throw-failed") {
                            throw error_3;
                        }
                        if (error_3.code !== "CALL_EXCEPTION") {
                            console.log(error_3);
                            assert_1.default.fail("failed");
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    it("testGetFail should fail if all URLs 5xx", function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        data = "0x1234";
                        return [4 /*yield*/, contract.testGetFail(data, { ccipReadEnabled: true })];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        assert_1.default.fail("throw-failed");
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        if (error_4.message === "throw-failed") {
                            throw error_4;
                        }
                        if (error_4.code !== "SERVER_ERROR" || (error_4.errorMessages || []).pop() !== "hello world") {
                            console.log(error_4);
                            assert_1.default.fail("failed");
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    it("testGetSenderFail should fail if sender does not match", function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        data = "0x1234";
                        return [4 /*yield*/, contract.testGetSenderFail(data, { ccipReadEnabled: true })];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        assert_1.default.fail("throw-failed");
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        if (error_5.message === "throw-failed") {
                            throw error_5;
                        }
                        if (error_5.code !== "CALL_EXCEPTION") {
                            console.log(error_5);
                            assert_1.default.fail("failed");
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    it("testGetMissing should fail if early URL 4xx", function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        data = "0x1234";
                        return [4 /*yield*/, contract.testGetMissing(data, { ccipReadEnabled: true })];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        assert_1.default.fail("throw-failed");
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        if (error_6.message === "throw-failed") {
                            throw error_6;
                        }
                        if (error_6.code !== "SERVER_ERROR" || error_6.errorMessage !== "hello world") {
                            console.log(error_6);
                            assert_1.default.fail("failed");
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    });
    it("testGetFallback passes if any URL returns correctly", function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        data = "0x123456";
                        return [4 /*yield*/, contract.testGetFallback(data, { ccipReadEnabled: true })];
                    case 1:
                        result = _a.sent();
                        verify(address, data, result);
                        return [2 /*return*/];
                }
            });
        });
    });
    it("testPost passes under normal operation", function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout(60000);
                        data = "0x1234";
                        return [4 /*yield*/, contract.testPost(data, { ccipReadEnabled: true })];
                    case 1:
                        result = _a.sent();
                        verify(address, data, result);
                        return [2 /*return*/];
                }
            });
        });
    });
});
//# sourceMappingURL=test-providers.js.map