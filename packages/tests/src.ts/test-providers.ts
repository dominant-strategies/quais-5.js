"use strict";

import assert from "assert";

//import Web3HttpProvider from "web3-providers-http";

import { quais } from "quais";

import { fundAddress, returnFunds } from "./utils";

const bnify = quais.BigNumber.from;

type TestCases = {
    addresses: Array<any>;
    blocks: Array<any>;
    transactions: Array<any>;
    transactionReceipts: Array<any>;
};

const blockchainData: { [ network: string ]: TestCases } = {
    homestead: {
        addresses: [
            {
                address: "0xAC1639CF97a3A46D431e6d1216f576622894cBB5",
                balance: bnify("4813414100000000"),
                code: "0x"
            },
        ],
        blocks: [
            {
                hash: "0x3d6122660cc824376f11ee842f83addc3525e2dd6756b9bcf0affa6aa88cf741",
                parentHash: "0xb495a1d7e6663152ae92708da4843337b958146015a2802f4193a410044698c9",
                number: 3,
                timestamp: 1438270048,
                nonce: "0x2e9344e0cbde83ce",
                difficulty: 17154715646,
                gasLimit: bnify("0x1388"),
                gasUsed: bnify("0"),
                miner: "0x5088D623ba0fcf0131E0897a91734A4D83596AA0",
                extraData: "0x476574682f76312e302e302d66633739643332642f6c696e75782f676f312e34",
                transactions: []
            }
        ],
        transactions: [
            {

            }
        ],
        transactionReceipts: [
            {
               
            },
        ]
    },
}

blockchainData["default"] = blockchainData.homestead;

function equals(name: string, actual: any, expected: any): void {
    if (expected && expected.eq) {
        if (actual == null) { assert.ok(false, name + " - actual big number null"); }
        expected = quais.BigNumber.from(expected);
        actual = quais.BigNumber.from(actual);
        assert.ok(expected.eq(actual), name + " matches");

    } else if (Array.isArray(expected)) {
        if (actual == null) { assert.ok(false, name + " - actual array null"); }
        assert.equal(actual.length, expected.length, name + " array lengths match");
        for (let i = 0; i < expected.length; i++) {
            equals("(" + name + " - item " + i + ")", actual[i], expected[i]);
        }

    } else if (typeof(expected) === "object") {
        if (actual == null) {
           if (expected === actual) { return; }
           assert.ok(false, name + " - actual object null");
        }

        let keys: { [ key: string ]: boolean } = {};
        Object.keys(expected).forEach((key) => { keys[key] = true; });
        Object.keys(actual).forEach((key) => { keys[key] = true; });

        Object.keys(keys).forEach((key) => {
            equals("(" + name + " - key + " + key + ")", actual[key], expected[key]);
        });

    } else {
        if (actual == null) { assert.ok(false, name + " - actual null"); }
        assert.equal(actual, expected, name + " matches");
    }
}

function waiter(duration: number): Promise<void> {
    return new Promise((resolve) => {
        const timer = setTimeout(resolve, duration);
        if (timer.unref) { timer.unref(); }
    });
}


type ProviderDescription = {
    name: string;
    networks: Array<string>;
    create: (network: string) => quais.providers.Provider;
};

<<<<<<< HEAD
type CheckSkipFunc = (provider: string, network: string, test: TestDescription) => boolean;

type TestDescription = {
    name: string;
    networks: Array<string>;
    execute: (provider: quais.providers.Provider) => Promise<void>;

    attempts?: number;
    timeout?: number;
    extras?: Array<"nowait" | "funding">;
    checkSkip?: CheckSkipFunc;
};


const allNetworks = [ "default", "homestead"];


const providerFunctions: Array<ProviderDescription> = [
    {
        name: "getDefaultProvider",
        networks: allNetworks,
        create: (network: string) => {
            if (network == "default") {
                return quais.getDefaultProvider(process.env.CYPRUS1URL);
            }
            return quais.getDefaultProvider(process.env.CYPRUS1URL);
=======
    async function fetchRPCTransaction(txHash: string){
        try {
            let response;
            do{
            response = await axios.post(process.env.CYPRUS1URL || "http://localhost:8610", {
            jsonrpc: "2.0",
            method: "quai_getTransactionByHash",
            params: [
               txHash,
            ],
            id: 1
            });
        } while (response.data.result.blockHash == null)
            return response.data.result;
        
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
>>>>>>> 5509cc6 (contract deploy test in test-providers.ts and code cleanup)
        }
    },
];

let fundWallet: quais.Wallet;
do {
    fundWallet = quais.Wallet.createRandom();
    var firstPart = parseInt(fundWallet.address.slice(2, 4), 16);
} while (firstPart > 29); //0x1D in hex, keep generating until cyprus1 addr


const testFunctions: Array<TestDescription> = [ ];

Object.keys(blockchainData).forEach((network) => {
    function addSimpleTest(name: string, func: (provider: quais.providers.Provider) => Promise<any>, expected: any) {
        testFunctions.push({
            name: name,
            networks: [ network ],
            execute: async (provider: quais.providers.Provider) => {
                const value = await func(provider);
                equals(name, expected, value);
            }
        });
    }
<<<<<<< HEAD

    function addObjectTest(name: string, func: (provider: quais.providers.Provider) => Promise<any>, expected: any, checkSkip?: CheckSkipFunc) {
        testFunctions.push({
            name,
            networks: [ network ],
            checkSkip,
            execute: async (provider: quais.providers.Provider) => {
                const value = await func(provider);
                Object.keys(expected).forEach((key) => {
                    equals(`${ name }.${ key }`, value[key], expected[key]);
                });
            }
        });
    }

    const tests: TestCases = blockchainData[network];

    // And address test case can have any of the following:
    // - balance
    // - code
    // - storage
    // - ENS name
    tests.addresses.forEach((test) => {
        if (test.balance) {
            addSimpleTest(`fetches account balance: ${ test.address }`, (provider: quais.providers.Provider) => {
                return provider.getBalance(test.address);
            }, test.balance);
=======
    async function getRPCGasPrice(url:string){
        try {
            let response;
            do{
            response = await axios.post(url || "http://localhost:8610", {
                jsonrpc: "2.0",
                method: "quai_gasPrice",
                params: [],
                id: 1
            });
        } while (response.data.result == null)
            return response.data.result;
        
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
        }
    }
    
    async function sendTransaction(to: string){
        try{
            let txResponse;
            let typeValue = 0;
            do{
            const prefix = to.substring(0, 4);
            typeValue = (Number(prefix) > 29) ? 2 : 0;
            const gas = await getRPCGasPrice(process.env.CYPRUS1URL);
            let tx: {
                from: string;
                to: string;
                value: any;  
                gasPrice: any;
                maxFeePerGas: any;
                maxPriorityFeePerGas:any;
                nonce: number;
                data: string;
                type: number;
                gasLimit: number;
                chainId: number;
                etxGasLimit?: any;
                etxGasTip?: any;
                etxGasPrice?: any;
            } = {
                from: walletWithProvider.address,
                to,
                value: quais.utils.parseEther('0.01'),  // Sending 0.1 ether
                gasPrice: gas,
                maxFeePerGas: gas,
                maxPriorityFeePerGas: quais.utils.parseUnits('1', 'gwei'),
                nonce: await globalCyprus1Provider.getTransactionCount(walletWithProvider.address, 'latest'),
                data: '',
                type: typeValue,
                gasLimit: typeValue == 0 ? 21000 : 42000,
                chainId: Number(process.env.CHAINID),
            };
            
            txResponse = await walletWithProvider.sendTransaction(tx);
            await waiter(5000);
        }while (txResponse.hash == null);

            console.log(`Transaction hash for type ${typeValue}: `, txResponse.hash);
            return txResponse;
        } catch(e){
            console.error('Failed to send Transaction: ', e);
            return null;
>>>>>>> 5509cc6 (contract deploy test in test-providers.ts and code cleanup)
        }

<<<<<<< HEAD
        if (test.code) {
            addSimpleTest(`fetches account code: ${ test.address }`, (provider: quais.providers.Provider) => {
                return provider.getCode(test.address);
            }, test.code);
=======
    async function fetchRPCBalance(address: string, url: string){
        try {
            let response;
            do{
                response = await axios.post(url, {
            jsonrpc: "2.0",
            method: "quai_getBalance",
            params: [
                address,
                'latest'
            ],
            id: 1
            });
        } while (response.data.result == null)
            return response.data.result;
        
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
>>>>>>> 5509cc6 (contract deploy test in test-providers.ts and code cleanup)
        }

<<<<<<< HEAD
        if (test.storage) {
            Object.keys(test.storage).forEach((position) => {
                addSimpleTest(`fetches storage: ${ test.address }:${ position }`, (provider: quais.providers.Provider) => {
                    return provider.getStorageAt(test.address, bnify(position));
                }, test.storage[position]);
            });
=======
    async function fetchRPCBlock(blockNumber: string) {
        try {
            let response;
            do {
            response = await axios.post(process.env.CYPRUS1URL || "http://localhost:8610", {
            jsonrpc: "2.0",
            method: "quai_getBlockByNumber",
            params: [
                blockNumber || '0xA',
                false
            ],
            id: 1
            });
        }while (response.data.result.hash == null)
            return response.data.result;
        
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
>>>>>>> 5509cc6 (contract deploy test in test-providers.ts and code cleanup)
        }

<<<<<<< HEAD
        if (test.name) {
            addSimpleTest(`fetches ENS name: ${ test.address }`, (provider: quais.providers.Provider) => {
                return provider.resolveName(test.name);
            }, test.address);
=======
    async function fetchRPCTxReceipt(hash: string ,url: string){
        try {
            let response;
            do{
            response = await axios.post(url, {
            jsonrpc: "2.0",
            method: "quai_getTransactionReceipt",
            params: [
                hash
            ],
            id: 1
            });
            waiter(5000);
        } while (response.data.result.blockHash == null)
        return response.data.result;
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
>>>>>>> 5509cc6 (contract deploy test in test-providers.ts and code cleanup)
        }
    });

    tests.blocks.forEach((test) => {
        addObjectTest(`fetches block (by number) #${ test.number }`, (provider: quais.providers.Provider) => {
            return provider.getBlock(test.number);
        }, test);
    });

    tests.blocks.forEach((test) => {
        addObjectTest(`fetches block (by hash) ${ test.hash }`, (provider: quais.providers.Provider) => {
            return provider.getBlock(test.hash);
        }, test, (provider: string, network: string, test: TestDescription) => {
            return (provider === "EtherscanProvider");
        });
    });

    tests.transactions.forEach((test) => {
        const hash = test.hash;
        addObjectTest(`fetches transaction ${ hash }`, async (provider: quais.providers.Provider) => {
            const tx = await provider.getTransaction(hash);

            // This changes with every block
            assert.equal(typeof(tx.confirmations), "number", "confirmations is a number");
            delete tx.confirmations;

            assert.equal(typeof(tx.wait), "function", "wait is a function");
            delete tx.wait

            return tx;
        }, test, (provider: string, network: string, test: TestDescription) => {
            // Temporary; pocket is being broken again for old transactions
            return provider === "PocketProvider";
            //return false;
        });
    });

    tests.transactionReceipts.forEach((test) => {
        const hash = test.transactionHash;
        addObjectTest(`fetches transaction receipt ${ hash }`, async (provider: quais.providers.Provider) => {
            const receipt = await provider.getTransactionReceipt(hash);
            assert.ok(!!receipt, "missing receipt");

            if (test.status === null) {
                assert.ok(receipt.status === undefined, "no status");
                receipt.status = null;
            }

            // This changes with every block; so just make sure it is a number
            assert.equal(typeof(receipt.confirmations), "number", "confirmations is a number");
            delete receipt.confirmations;

            return receipt;
        }, test, (provider: string, network: string, test: TestDescription) => {
            // Temporary; pocket is being broken again for old transactions
            return provider === "PocketProvider";
            //return false;
        });
    });
});

(function() {
    function addErrorTest(code: string, func: (provider: quais.providers.Provider) => Promise<any>) {
        testFunctions.push({
            name: `throws correct ${ code } error`,
            networks: [ "goerli" ],
            checkSkip: (provider: string, network: string, test: TestDescription) => {
                return false;
            },
            execute: async (provider: quais.providers.Provider) => {
                try {
                    const value = await func(provider);
                    console.log(value);
                    assert.ok(false, "did not throw");
                } catch (error) {
                    assert.equal(error.code, code, `incorrect error thrown: actual:${ error.code } != expected:${ code }`);
                }
            }
        });
    }

<<<<<<< HEAD
    // Wallet(id("foobar1234"))
    addErrorTest(quais.utils.Logger.errors.NONCE_EXPIRED, async (provider: quais.providers.Provider) => {
        return provider.sendTransaction("0x02f86e05808459682f008459682f14830186a09475544911a6f2e69ceea374f3f7e5ea9c987ece098304cb2f80c001a0d9585a780dde9e7d8c855aacec0564054b49114931fd7e320e4e983009d864f7a050bee916f2770ef17367256d8bccfbc49885467a6ba27cf5cc57e8553c73a191");
=======
    before( async () => {
        globalCyprus1Provider = await new quais.providers.JsonRpcProvider(process.env.CYPRUS1URL || "http://localhost:8610");
       // globalCyprus2Provider = await new quais.providers.JsonRpcProvider(process.env.CYPRUS2URL || "http://localhost:8542");
        
        
        walletWithProvider = await new quais.Wallet(hre.network.config.accounts[0], globalCyprus1Provider);
        const resBlock = await fetchRPCBlock('0xA');
        //Format block expected response
        block = {
            hash: resBlock.hash,
            number: resBlock.number.map((stringNumber: string) => Number(stringNumber)),
            transactions: resBlock.transactions,
            parentHash: resBlock.parentHash,
            parentEntropy: resBlock.parentEntropy.map((entropy: string) => bnify(entropy)),
            extTransactions: resBlock.extTransactions,
            timestamp: Number(resBlock.timestamp),
            nonce: resBlock.nonce,
            difficulty: bnify(resBlock.difficulty),
            gasLimit: bnify(resBlock.gasLimit),
            gasUsed: bnify(resBlock.gasUsed),
            miner: resBlock.miner,
            extraData: resBlock.extraData,
            transactionsRoot: resBlock.transactionsRoot,
            stateRoot: resBlock.stateRoot,
            receiptsRoot: resBlock.receiptsRoot,
            baseFeePerGas: bnify(resBlock.baseFeePerGas),
            extRollupRoot: resBlock.extRollupRoot,
            extTransactionsRoot: resBlock.extTransactionsRoot,
            location: resBlock.location,
            manifestHash: resBlock.manifestHash,
            mixHash: resBlock.mixHash,
            order: resBlock.order,
            parentDeltaS: resBlock.parentDeltaS.map((delta:string) => bnify(delta)),
            sha3Uncles: resBlock.sha3Uncles,
            size: bnify(resBlock.size),
            uncles: resBlock.uncles,
            subManifest: resBlock.subManifest,
            totalEntropy: bnify(resBlock.totalEntropy),
        }

        qrc20Contract = await deployQRC20();
        await waiter(30000)
        deployTx = await fetchRPCTransaction(qrc20Contract.deployTransaction.hash);

        //format deploy transaction
        deployTx = {
            hash: deployTx.hash,
            nonce: Number(deployTx.nonce),
            blockHash: deployTx.blockHash,
            blockNumber: Number(deployTx.blockNumber),
            transactionIndex: Number(deployTx.transactionIndex),
            from: deployTx.from,
            to: deployTx.to,
            value: bnify(deployTx.value),
            gas: bnify(deployTx.gas),
            maxFeePerGas: bnify(deployTx.maxFeePerGas),
            maxPriorityFeePerGas: bnify(deployTx.maxPriorityFeePerGas),
            data: deployTx.input,
            type: deployTx.type,
            chainId: Number(deployTx.chainId),
            accessList: deployTx.accessList,
            r: deployTx.r,
            s: deployTx.s,
            v: deployTx.v,
            etxAccessList: null,
            confirmations: 1,
        }
>>>>>>> 5509cc6 (contract deploy test in test-providers.ts and code cleanup)
    });

    addErrorTest(quais.utils.Logger.errors.INSUFFICIENT_FUNDS, async (provider: quais.providers.Provider) => {
        const txProps = {
            to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            gasPrice: 9000000000,
            gasLimit: 21000,
            chainId: 5,
            value: 1,
        };

        const wallet = quais.Wallet.createRandom();
        const tx = await wallet.signTransaction(txProps);
        return provider.sendTransaction(tx);
    });

    addErrorTest(quais.utils.Logger.errors.INSUFFICIENT_FUNDS, async (provider: quais.providers.Provider) => {
        const txProps = {
            to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
            gasPrice: 9000000000,
            gasLimit: 21000,
            value: 1,
        };

        const wallet = quais.Wallet.createRandom().connect(provider);
        return wallet.sendTransaction(txProps);
    });

    addErrorTest(quais.utils.Logger.errors.UNPREDICTABLE_GAS_LIMIT, async (provider: quais.providers.Provider) => {
        return provider.estimateGas({
            to: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" // ENS contract
        });
    });
})();

describe.skip("Test Provider Methods", function() {
    let fundReceipt: Promise<string> = null;

<<<<<<< HEAD
    before(async function() {
        this.timeout(300000);

        // Get some ether from the faucet
        //const funder = await quais.utils.fetchJson(`https:/\/api.quais.io/api/v1/?action=fundAccount&address=${ fundWallet.address.toLowerCase() }`);
        fundReceipt = fundAddress(fundWallet.address).then((hash) => {
            console.log(`*** Funded: ${ fundWallet.address }`);
            return hash;
        });
=======
    it('should fetch deploy contract transaction', async function () {
        const tx = await globalCyprus1Provider.getTransaction(deployTx.hash);
        delete tx.wait;
        console.log("Expected:", JSON.stringify(deployTx, null, 2));
        console.log("Actual:", JSON.stringify(tx, null, 2));
        equals('Fetch Contract deployment TX', tx, deployTx); 
>>>>>>> 5509cc6 (contract deploy test in test-providers.ts and code cleanup)
    });

    after(async function() {
        this.timeout(300000);

        // Wait until the funding is complete
        await fundReceipt;

        // Refund all unused ether to the faucet
        const hash = await returnFunds(fundWallet);

        console.log(`*** Sweep Transaction:`, hash);
    });

    providerFunctions.forEach(({ name, networks, create}) => {

        networks.forEach((network) => {
            const provider = create(network);

            testFunctions.forEach((test) => {

                // Skip tests not supported on this network
                if (test.networks.indexOf(network) === -1) { return; }
                if (test.checkSkip && test.checkSkip(name, network, test)) {
                    return;
                }

                // How many attempts to try?
                const attempts = (test.attempts != null) ? test.attempts: 3;
                const timeout = (test.timeout != null) ? test.timeout: 60;
                const extras = (test.extras || []).reduce((accum, key) => {
                    accum[key] = true;
                    return accum;
                }, <Record<string, boolean>>{ });

                it(`${ name }.${ network ? network: "default" } ${ test.name}`, async function() {
                    // Multiply by 2 to make sure this never happens; we want our
                    // timeout logic to success, not allow a done() called multiple
                    // times because our logic returns after the timeout has occurred.
                    this.timeout(2 * (1000 + timeout * 1000 * attempts));

                    // Wait for the funding transaction to be mined
                    if (extras.funding) { await fundReceipt; }

                    // We wait at least 1 seconds between tests
                    if (!extras.nowait) { await waiter(1000); }

                    let error: Error = null;
                    for (let attempt = 0; attempt < attempts; attempt++) {
                        try {
                            const result = await Promise.race([
                                test.execute(provider),
                                waiter(timeout * 1000).then((result) => { throw new Error("timeout"); })
                            ]);
                            return result;
                        } catch (attemptError) {
                            console.log(`*** Failed attempt ${ attempt + 1 }: ${ attemptError.message }`);
                            error = attemptError;

                            // On failure, wait 5s
                            await waiter(5000);
                        }
                    }
                    throw error;
                });
            });
        });
    });

});

describe.skip("Test WebSocketProvider", function() {
    this.retries(3);

    async function testWebSocketProvider(provider: quais.providers.WebSocketProvider): Promise<void> {
        await provider.destroy();
    }

    it("InfuraProvider.getWebSocketProvider", async function() {
        const provider = quais.providers.InfuraProvider.getWebSocketProvider();
        await testWebSocketProvider(provider);
    });
});

//Poling diasabled as of Oct 24 2023
describe.skip("Test Events", function() {
    this.retries(3);

    async function testBlockEvent(provider: quais.providers.Provider) {
        return new Promise((resolve, reject) => {
            let firstBlockNumber: number = null;
            const handler = (blockNumber: number) => {
                if (firstBlockNumber == null) {
                    firstBlockNumber = blockNumber;
                    return;
                }
                provider.removeListener("block", handler);
                if (firstBlockNumber + 1 === blockNumber) {
                    resolve(true);
                } else {
                    reject(new Error("blockNumber fail"));
                }
            };
            provider.on("block", handler);
        });
    }

    it("InfuraProvider", async function() {
        this.timeout(60000);
        const provider = new quais.providers.InfuraProvider("goerli");
        await testBlockEvent(provider);
    });
});

