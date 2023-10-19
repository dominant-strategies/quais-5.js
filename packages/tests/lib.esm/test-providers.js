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
import assert from "assert";
//import Web3HttpProvider from "web3-providers-http";
import { quais } from "quais";
import { fundAddress, returnFunds } from "./utils";
const bnify = quais.BigNumber.from;
const blockchainData = {
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
            assert.ok(false, name + " - actual big number null");
        }
        expected = quais.BigNumber.from(expected);
        actual = quais.BigNumber.from(actual);
        assert.ok(expected.eq(actual), name + " matches");
    }
    else if (Array.isArray(expected)) {
        if (actual == null) {
            assert.ok(false, name + " - actual array null");
        }
        assert.equal(actual.length, expected.length, name + " array lengths match");
        for (let i = 0; i < expected.length; i++) {
            equals("(" + name + " - item " + i + ")", actual[i], expected[i]);
        }
    }
    else if (typeof (expected) === "object") {
        if (actual == null) {
            if (expected === actual) {
                return;
            }
            assert.ok(false, name + " - actual object null");
        }
        let keys = {};
        Object.keys(expected).forEach((key) => { keys[key] = true; });
        Object.keys(actual).forEach((key) => { keys[key] = true; });
        Object.keys(keys).forEach((key) => {
            equals("(" + name + " - key + " + key + ")", actual[key], expected[key]);
        });
    }
    else {
        if (actual == null) {
            assert.ok(false, name + " - actual null");
        }
        assert.equal(actual, expected, name + " matches");
    }
}
function waiter(duration) {
    return new Promise((resolve) => {
        const timer = setTimeout(resolve, duration);
        if (timer.unref) {
            timer.unref();
        }
    });
}
const allNetworks = ["default", "homestead"];
// We use separate API keys because otherwise the testcases sometimes
// fail during CI because our default keys are pretty heavily used
const providerFunctions = [
    {
        name: "getDefaultProvider",
        networks: allNetworks,
        create: (network) => {
            if (network == "default") {
                const prov = quais.getDefaultProvider('https://rpc.cyprus1.colosseum.quaiscan.io');
                console.log(prov);
                return prov;
            }
            const prov = quais.getDefaultProvider('https://rpc.cyprus1.colosseum.quaiscan.io');
            console.log(prov);
            return prov;
        }
    },
];
let fundWallet;
do {
    fundWallet = quais.Wallet.createRandom();
    var firstPart = parseInt(fundWallet.address.slice(2, 4), 16);
} while (firstPart > 29); //0x1D in hex, keep generating until cyprus1 addr
const testFunctions = [];
Object.keys(blockchainData).forEach((network) => {
    function addSimpleTest(name, func, expected) {
        testFunctions.push({
            name: name,
            networks: [network],
            execute: (provider) => __awaiter(this, void 0, void 0, function* () {
                const value = yield func(provider);
                equals(name, expected, value);
            })
        });
    }
    function addObjectTest(name, func, expected, checkSkip) {
        testFunctions.push({
            name,
            networks: [network],
            checkSkip,
            execute: (provider) => __awaiter(this, void 0, void 0, function* () {
                const value = yield func(provider);
                Object.keys(expected).forEach((key) => {
                    equals(`${name}.${key}`, value[key], expected[key]);
                });
            })
        });
    }
    const tests = blockchainData[network];
    // And address test case can have any of the following:
    // - balance
    // - code
    // - storage
    // - ENS name
    tests.addresses.forEach((test) => {
        if (test.balance) {
            addSimpleTest(`fetches account balance: ${test.address}`, (provider) => {
                console.log(`fetches account balance: ${test.address}`, provider);
                return provider.getBalance(test.address);
            }, test.balance);
        }
        if (test.code) {
            addSimpleTest(`fetches account code: ${test.address}`, (provider) => {
                return provider.getCode(test.address);
            }, test.code);
        }
        if (test.storage) {
            Object.keys(test.storage).forEach((position) => {
                addSimpleTest(`fetches storage: ${test.address}:${position}`, (provider) => {
                    return provider.getStorageAt(test.address, bnify(position));
                }, test.storage[position]);
            });
        }
    });
    tests.blocks.forEach((test) => {
        addObjectTest(`fetches block (by number) #${test.number}`, (provider) => {
            console.log("Fetching block #" + test.number, provider);
            return provider.getBlock(test.number);
        }, test);
    });
    tests.blocks.forEach((test) => {
        addObjectTest(`fetches block (by hash) ${test.hash}`, (provider) => {
            return provider.getBlock(test.hash);
        }, test, (provider, network, test) => {
            return (provider === "JsonRpcProvider");
        });
    });
    tests.transactions.forEach((test) => {
        const hash = test.hash;
        addObjectTest(`fetches transaction ${hash}`, (provider) => __awaiter(void 0, void 0, void 0, function* () {
            const tx = yield provider.getTransaction(hash);
            // This changes with every block
            assert.equal(typeof (tx.confirmations), "number", "confirmations is a number");
            delete tx.confirmations;
            assert.equal(typeof (tx.wait), "function", "wait is a function");
            delete tx.wait;
            return tx;
        }), test, (provider, network, test) => {
            // Temporary; pocket is being broken again for old transactions
            return provider === "JsonRpcProvider";
            //return false;
        });
    });
    tests.transactionReceipts.forEach((test) => {
        const hash = test.transactionHash;
        addObjectTest(`fetches transaction receipt ${hash}`, (provider) => __awaiter(void 0, void 0, void 0, function* () {
            const receipt = yield provider.getTransactionReceipt(hash);
            assert.ok(!!receipt, "missing receipt");
            if (test.status === null) {
                assert.ok(receipt.status === undefined, "no status");
                receipt.status = null;
            }
            // This changes with every block; so just make sure it is a number
            assert.equal(typeof (receipt.confirmations), "number", "confirmations is a number");
            delete receipt.confirmations;
            return receipt;
        }), test, (provider, network, test) => {
            // Temporary; pocket is being broken again for old transactions
            return provider === "PocketProvider";
            //return false;
        });
    });
});
(function () {
    function addErrorTest(code, func) {
        testFunctions.push({
            name: `throws correct ${code} error`,
            networks: ["goerli"],
            checkSkip: (provider, network, test) => {
                return false;
            },
            execute: (provider) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const value = yield func(provider);
                    console.log(value);
                    assert.ok(false, "did not throw");
                }
                catch (error) {
                    assert.equal(error.code, code, `incorrect error thrown: actual:${error.code} != expected:${code}`);
                }
            })
        });
    }
    /*
    @TODO: Use this for testing pre-EIP-155 transactions on specific networks
    addErrorTest(quais.utils.Logger.errors.NONCE_EXPIRED, async (provider: quais.providers.Provider) => {
        return provider.sendTransaction("0xf86480850218711a0082520894000000000000000000000000000000000000000002801ba038aaddcaaae7d3fa066dfd6f196c8348e1bb210f2c121d36cb2c24ef20cea1fba008ae378075d3cd75aae99ab75a70da82161dffb2c8263dabc5d8adecfa9447fa");
    });
    */
    // Wallet(id("foobar1234"))
    addErrorTest(quais.utils.Logger.errors.NONCE_EXPIRED, (provider) => __awaiter(this, void 0, void 0, function* () {
        return provider.sendTransaction("0x02f86e05808459682f008459682f14830186a09475544911a6f2e69ceea374f3f7e5ea9c987ece098304cb2f80c001a0d9585a780dde9e7d8c855aacec0564054b49114931fd7e320e4e983009d864f7a050bee916f2770ef17367256d8bccfbc49885467a6ba27cf5cc57e8553c73a191");
    }));
    addErrorTest(quais.utils.Logger.errors.INSUFFICIENT_FUNDS, (provider) => __awaiter(this, void 0, void 0, function* () {
        const txProps = {
            to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            gasPrice: 9000000000,
            gasLimit: 21000,
            chainId: 5,
            value: 1,
        };
        const wallet = quais.Wallet.createRandom();
        const tx = yield wallet.signTransaction(txProps);
        return provider.sendTransaction(tx);
    }));
    addErrorTest(quais.utils.Logger.errors.INSUFFICIENT_FUNDS, (provider) => __awaiter(this, void 0, void 0, function* () {
        const txProps = {
            to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            gasPrice: 9000000000,
            gasLimit: 21000,
            value: 1,
        };
        const wallet = quais.Wallet.createRandom().connect(provider);
        return wallet.sendTransaction(txProps);
    }));
    addErrorTest(quais.utils.Logger.errors.UNPREDICTABLE_GAS_LIMIT, (provider) => __awaiter(this, void 0, void 0, function* () {
        return provider.estimateGas({
            to: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" // ENS contract
        });
    }));
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
    checkSkip: (provider, network, test) => {
        // This isn't working right now on Ankr
        return (provider === "AnkrProvider");
    },
    execute: (provider) => __awaiter(void 0, void 0, void 0, function* () {
        const gasPrice = (yield provider.getGasPrice()).mul(10);
        const wallet = fundWallet.connect(provider);
        const addr = "0x8210357f377E901f18E45294e86a2A32215Cc3C9";
        yield waiter(3000);
        const b0 = yield provider.getBalance(wallet.address);
        assert.ok(b0.gt(quais.constants.Zero), "balance is non-zero");
        const tx = yield wallet.sendTransaction({
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
        });
        yield tx.wait();
        yield waiter(3000);
        const b1 = yield provider.getBalance(wallet.address);
        assert.ok(b0.gt(b1), "balance is decreased");
    })
});
testFunctions.push({
    name: "sends an EIP-1559 transaction",
    extras: ["funding"],
    timeout: 900,
    networks: ["goerli"],
    checkSkip: (provider, network, test) => {
        // These don't support EIP-1559 yet for sending
        //return (provider === "AlchemyProvider" );
        return (provider === "AnkrProvider");
    },
    execute: (provider) => __awaiter(void 0, void 0, void 0, function* () {
        const wallet = fundWallet.connect(provider);
        const addr = "0x8210357f377E901f18E45294e86a2A32215Cc3C9";
        yield waiter(3000);
        const b0 = yield provider.getBalance(wallet.address);
        assert.ok(b0.gt(quais.constants.Zero), "balance is non-zero");
        const tx = yield wallet.sendTransaction({
            type: 2,
            accessList: {
                "0x8ba1f109551bD432803012645Ac136ddd64DBA72": [
                    "0x0000000000000000000000000000000000000000000000000000000000000000",
                    "0x0000000000000000000000000000000000000000000000000000000000000042",
                ]
            },
            to: addr,
            value: 123,
        });
        yield tx.wait();
        yield waiter(3000);
        const b1 = yield provider.getBalance(wallet.address);
        assert.ok(b0.gt(b1), "balance is decreased");
    })
});
describe("Test Provider Methods", function () {
    let fundReceipt = null;
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(300000);
            // Get some ether from the faucet
            //const funder = await quais.utils.fetchJson(`https:/\/api.quais.io/api/v1/?action=fundAccount&address=${ fundWallet.address.toLowerCase() }`);
            fundReceipt = fundAddress(fundWallet.address).then((hash) => {
                console.log(`*** Funded: ${fundWallet.address}`);
                return hash;
            });
        });
    });
    after(function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(300000);
            // Wait until the funding is complete
            yield fundReceipt;
            // Refund all unused ether to the faucet
            const hash = yield returnFunds(fundWallet);
            console.log(`*** Sweep Transaction:`, hash);
        });
    });
    providerFunctions.forEach(({ name, networks, create }) => {
        networks.forEach((network) => {
            const provider = create(network);
            testFunctions.forEach((test) => {
                // Skip tests not supported on this network
                if (test.networks.indexOf(network) === -1) {
                    return;
                }
                if (test.checkSkip && test.checkSkip(name, network, test)) {
                    return;
                }
                // How many attempts to try?
                const attempts = (test.attempts != null) ? test.attempts : 3;
                const timeout = (test.timeout != null) ? test.timeout : 60;
                const extras = (test.extras || []).reduce((accum, key) => {
                    accum[key] = true;
                    return accum;
                }, {});
                it(`${name}.${network ? network : "default"} ${test.name}`, function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        // Multiply by 2 to make sure this never happens; we want our
                        // timeout logic to success, not allow a done() called multiple
                        // times because our logic returns after the timeout has occurred.
                        this.timeout(2 * (1000 + timeout * 1000 * attempts));
                        // Wait for the funding transaction to be mined
                        if (extras.funding) {
                            yield fundReceipt;
                        }
                        // We wait at least 1 seconds between tests
                        if (!extras.nowait) {
                            yield waiter(1000);
                        }
                        let error = null;
                        for (let attempt = 0; attempt < attempts; attempt++) {
                            try {
                                console.log("Test:", test);
                                const result = yield Promise.race([
                                    test.execute(provider),
                                    waiter(timeout * 1000).then((result) => { throw new Error("timeout"); })
                                ]);
                                return result;
                            }
                            catch (attemptError) {
                                console.log(`*** Failed attempt ${attempt + 1}: ${attemptError.message}`);
                                error = attemptError;
                                // On failure, wait 5s
                                yield waiter(5000);
                            }
                        }
                        throw error;
                    });
                });
            });
        });
    });
});
describe("Test WebSocketProvider", function () {
    this.retries(3);
    function testWebSocketProvider(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            yield provider.destroy();
        });
    }
    it("InfuraProvider.getWebSocketProvider", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = quais.providers.InfuraProvider.getWebSocketProvider();
            yield testWebSocketProvider(provider);
        });
    });
});
describe("Test Events", function () {
    this.retries(3);
    function testBlockEvent(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let firstBlockNumber = null;
                const handler = (blockNumber) => {
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
            });
        });
    }
    it("InfuraProvider", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(60000);
            const provider = new quais.providers.InfuraProvider("goerli");
            yield testBlockEvent(provider);
        });
    });
});
describe("Test CCIP execution", function () {
    const address = "0x6C5ed35574a9b4d163f75bBf0595F7540D8FCc2d";
    const ABI = [
        //'error OffchainLookup(address sender, string[] urls, bytes callData, bytes4 callbackFunction, bytes extraData)',
        'function testGet(bytes callData) view returns (bytes32)',
        'function testGetFail(bytes callData) view returns (bytes32)',
        'function testGetSenderFail(bytes callData) view returns (bytes32)',
        'function testGetFallback(bytes callData) view returns (bytes32)',
        'function testGetMissing(bytes callData) view returns (bytes32)',
        'function testPost(bytes callData) view returns (bytes32)',
        'function verifyTest(bytes result, bytes extraData) pure returns (bytes32)'
    ];
    const provider = providerFunctions[0].create("goerli");
    const contract = new quais.Contract(address, ABI, provider);
    // This matches the verify method in the Solidity contract against the
    // processed data from the endpoint
    const verify = function (sender, data, result) {
        const check = quais.utils.concat([
            quais.utils.arrayify(quais.utils.arrayify(sender).length),
            sender,
            quais.utils.arrayify(quais.utils.arrayify(data).length),
            data
        ]);
        assert.equal(result, quais.utils.keccak256(check), "response is equal");
    };
    it("testGet passes under normal operation", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(60000);
            const data = "0x1234";
            const result = yield contract.testGet(data, { ccipReadEnabled: true });
            verify(address, data, result);
        });
    });
    it("testGet should fail with CCIP not explicitly enabled by overrides", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(60000);
            try {
                const data = "0x1234";
                const result = yield contract.testGet(data);
                console.log(result);
                assert.fail("throw-failed");
            }
            catch (error) {
                if (error.message === "throw-failed") {
                    throw error;
                }
                if (error.code !== "CALL_EXCEPTION") {
                    console.log(error);
                    assert.fail("failed");
                }
            }
        });
    });
    it("testGet should fail with CCIP explicitly disabled on provider", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(60000);
            const provider = providerFunctions[0].create("goerli");
            provider.disableCcipRead = true;
            const contract = new quais.Contract(address, ABI, provider);
            try {
                const data = "0x1234";
                const result = yield contract.testGet(data, { ccipReadEnabled: true });
                console.log(result);
                assert.fail("throw-failed");
            }
            catch (error) {
                if (error.message === "throw-failed") {
                    throw error;
                }
                if (error.code !== "CALL_EXCEPTION") {
                    console.log(error);
                    assert.fail("failed");
                }
            }
        });
    });
    it("testGetFail should fail if all URLs 5xx", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(60000);
            try {
                const data = "0x1234";
                const result = yield contract.testGetFail(data, { ccipReadEnabled: true });
                console.log(result);
                assert.fail("throw-failed");
            }
            catch (error) {
                if (error.message === "throw-failed") {
                    throw error;
                }
                if (error.code !== "SERVER_ERROR" || (error.errorMessages || []).pop() !== "hello world") {
                    console.log(error);
                    assert.fail("failed");
                }
            }
        });
    });
    it("testGetSenderFail should fail if sender does not match", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(60000);
            try {
                const data = "0x1234";
                const result = yield contract.testGetSenderFail(data, { ccipReadEnabled: true });
                console.log(result);
                assert.fail("throw-failed");
            }
            catch (error) {
                if (error.message === "throw-failed") {
                    throw error;
                }
                if (error.code !== "CALL_EXCEPTION") {
                    console.log(error);
                    assert.fail("failed");
                }
            }
        });
    });
    it("testGetMissing should fail if early URL 4xx", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(60000);
            try {
                const data = "0x1234";
                const result = yield contract.testGetMissing(data, { ccipReadEnabled: true });
                console.log(result);
                assert.fail("throw-failed");
            }
            catch (error) {
                if (error.message === "throw-failed") {
                    throw error;
                }
                if (error.code !== "SERVER_ERROR" || error.errorMessage !== "hello world") {
                    console.log(error);
                    assert.fail("failed");
                }
            }
        });
    });
    it("testGetFallback passes if any URL returns correctly", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(60000);
            const data = "0x123456";
            const result = yield contract.testGetFallback(data, { ccipReadEnabled: true });
            verify(address, data, result);
        });
    });
    it("testPost passes under normal operation", function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(60000);
            const data = "0x1234";
            const result = yield contract.testPost(data, { ccipReadEnabled: true });
            verify(address, data, result);
        });
    });
});
//# sourceMappingURL=test-providers.js.map