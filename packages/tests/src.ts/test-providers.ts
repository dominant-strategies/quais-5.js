"use strict";

import assert from "assert";

import { quais } from "quais";
import axios from 'axios';

const hre = require("hardhat");

const bnify = quais.BigNumber.from;

function waiter(duration: number): Promise<void> {
    return new Promise((resolve) => {
        const timer = setTimeout(resolve, duration);
        if (timer.unref) { timer.unref(); }
    });
}

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
            if ( typeof actual[key] === "string" && actual[key].toLowerCase && key === "type") {
                actual[key] = actual[key].toLowerCase();
            }
            equals("(" + name + " - key + " + key + ")", actual[key], expected[key]);
        });

    } else {
        if (actual == null) { assert.ok(false, name + " - actual null"); }

        // Modify this part for case-insensitive comparison for string values
        if (typeof actual === 'string' && typeof expected === 'string') {
            assert.equal(actual.toLowerCase(), expected.toLowerCase(), name + " matches (case-insensitive)");
        } else {
            assert.equal(actual, expected, name + " matches");
        }
    }
}


<<<<<<< HEAD
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
=======
>>>>>>> ad4d865 (fix dependencies and remove temnp files)

describe("Test Providers", async function() {
    const cyprus1Destination = '0x193399fa97ae9762a186e921582cedb0987d9470'
    const cyprus2Destination = '0x333f87cba94a5f121c3f8d7a4b4616e31f7859b4'
    let oldCyprus1Bal: number;
    //let oldCyprus2Bal: number;
    let globalCyprus1Provider: quais.providers.Provider; 
    //let globalCyprus2Provider: quais.providers.Provider; 
    let walletWithProvider: quais.Wallet;
    let qrc20Contract: quais.Contract;
    let deployTx: any;
    let block: any
    let internalTx: any
    let internalToExternalTx: any;
    this.timeout(60000);

    async function deployQRC20(){
        const ethersContract = await hre.ethers.getContractFactory('QRC20');
        const QuaisContract = new quais.ContractFactory(
            ethersContract.interface.fragments,
            ethersContract.bytecode,
            walletWithProvider
        );

        return await QuaisContract.deploy({ gasLimit: 4000000 });
    }

<<<<<<< HEAD
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
=======
    async function fetchRPCTransaction(txHash: string){
        try {
            const response = await axios.post(process.env.CYPRUS1URL || "http://localhost:8610", {
            jsonrpc: "2.0",
            method: "quai_getBlockByNumber",
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
            params: [
               txHash,
            ],
            id: 1
            });
<<<<<<< HEAD
        } while (response.data.result.blockHash == null)
=======
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
            return response.data.result;
        
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
<<<<<<< HEAD
>>>>>>> 5509cc6 (contract deploy test in test-providers.ts and code cleanup)
=======
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
        }
    }
<<<<<<< HEAD
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
=======
    async function getRPCGasPrice(url:string){
        try {
            const response = await axios.post(url || "http://localhost:8610", {
                jsonrpc: "2.0",
                method: "quai_gasPrice",
                params: [],
                id: 1
            });
            return response.data.result;
        
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
        }
    }
    
    async function sendTransaction(to: string){
        try{
            const prefix = to.substring(0, 4);
            const typeValue = (Number(prefix) > 29) ? 2 : 0;
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
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
            
<<<<<<< HEAD
            txResponse = await walletWithProvider.sendTransaction(tx);
            await waiter(5000);
        }while (txResponse.hash == null);

=======
            const txResponse = await walletWithProvider.sendTransaction(tx);
            await waiter(5000);
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
            console.log(`Transaction hash for type ${typeValue}: `, txResponse.hash);
            return txResponse;
        } catch(e){
            console.error('Failed to send Transaction: ', e);
            return null;
<<<<<<< HEAD
>>>>>>> 5509cc6 (contract deploy test in test-providers.ts and code cleanup)
=======
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
        }
    }

<<<<<<< HEAD
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
=======
    async function fetchRPCBalance(address: string, url: string){
        try {
            const response = await axios.post(url, {
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
            jsonrpc: "2.0",
            method: "quai_getBalance",
            params: [
                address,
                'latest'
            ],
            id: 1
            });
<<<<<<< HEAD
        } while (response.data.result == null)
=======
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
            return response.data.result;
        
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
<<<<<<< HEAD
>>>>>>> 5509cc6 (contract deploy test in test-providers.ts and code cleanup)
=======
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
        }
    }

<<<<<<< HEAD
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
=======
    async function fetchRPCBlock(blockNumber: string) {
        try {
            const response = await axios.post(process.env.CYPRUS1URL || "http://localhost:8610", {
            jsonrpc: "2.0",
            method: "quai_getBlockByNumber",
            params: [
                blockNumber || '0xA',
                false
            ],
            id: 1
            });
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
            return response.data.result;
        
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
<<<<<<< HEAD
>>>>>>> 5509cc6 (contract deploy test in test-providers.ts and code cleanup)
=======
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
        }
    }

<<<<<<< HEAD
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
=======
    async function fetchRPCTxReceipt(hash: string ,url: string){
        try {
            const response = await axios.post(url, {
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
            jsonrpc: "2.0",
            method: "quai_getTransactionReceipt",
            params: [
                hash
            ],
            id: 1
            });
<<<<<<< HEAD
            waiter(5000);
        } while (response.data.result.blockHash == null)
        return response.data.result;
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
>>>>>>> 5509cc6 (contract deploy test in test-providers.ts and code cleanup)
=======
            return response.data.result;
        
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
        }
    }

<<<<<<< HEAD
<<<<<<< HEAD
    // Wallet(id("foobar1234"))
    addErrorTest(quais.utils.Logger.errors.NONCE_EXPIRED, async (provider: quais.providers.Provider) => {
        return provider.sendTransaction("0x02f86e05808459682f008459682f14830186a09475544911a6f2e69ceea374f3f7e5ea9c987ece098304cb2f80c001a0d9585a780dde9e7d8c855aacec0564054b49114931fd7e320e4e983009d864f7a050bee916f2770ef17367256d8bccfbc49885467a6ba27cf5cc57e8553c73a191");
=======
=======
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
    before( async () => {
        globalCyprus1Provider = await new quais.providers.JsonRpcProvider(process.env.CYPRUS1URL || "http://localhost:8610");
       // globalCyprus2Provider = await new quais.providers.JsonRpcProvider(process.env.CYPRUS2URL || "http://localhost:8542");
        
        
        walletWithProvider = await new quais.Wallet(hre.network.config.accounts[0], globalCyprus1Provider);
        const resBlock = await fetchRPCBlock('0xA');
<<<<<<< HEAD
        //Format block expected response
=======

        qrc20Contract = await deployQRC20();
        //await qrc20Contract.deployTransaction.wait();
        //console.log('Deploy Transaction: ', qrc20Contract.deployTransaction);
        await waiter(30000)
        deployTx = await fetchRPCTransaction(qrc20Contract.deployTransaction.hash);

>>>>>>> ad4d865 (fix dependencies and remove temnp files)
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
<<<<<<< HEAD

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
=======
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
    });

    it('should fetch balance after internal tx', async function () {
        oldCyprus1Bal = await fetchRPCBalance(cyprus1Destination, process.env.CYPRUS1URL || "http://localhost:8610");
        internalTx = await sendTransaction(cyprus1Destination);

        const expectedBal = bnify(internalTx.value);
        const balance = await globalCyprus1Provider.getBalance(cyprus1Destination);
        const actualBal = Number(balance) - Number(oldCyprus1Bal)
        assert.equal(actualBal, Number(expectedBal));
    });

<<<<<<< HEAD
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
=======
    it.skip('should fetch deploy contract transaction', async function () {
        const tx = await globalCyprus1Provider.getTransaction(deployTx.hash);

        console.log("Expected:", JSON.stringify(deployTx, null, 2));
        console.log("Actual:", JSON.stringify(tx, null, 2));
        equals('Fetch Contract deployment TX', tx, deployTx); 
>>>>>>> ad4d865 (fix dependencies and remove temnp files)
    });

    it('should get account code', async function () {
        const code = await globalCyprus1Provider.getCode(cyprus1Destination);
        assert.equal(code, '0x');
    });

    it('should fetch block by number', async function () {
        const responseBlock = await globalCyprus1Provider.getBlock('0xA');
        equals("Block by Number", responseBlock, block);
    });

    it('should fetch block by hash', async function () {
        const responseBlock = await globalCyprus1Provider.getBlock(block.hash);
        equals("Block by Hash", responseBlock, block);
    });

    it('should get transaction receipt for internal tx', async function () {
        const receipt = await fetchRPCTxReceipt(internalTx.hash, process.env.CYPRUS1URL || "http://localhost:8610");
        const expectedReceipt = {
            blockHash: receipt.blockHash,
            contractAddress: receipt.contractAddress || null,
            blockNumber: Number(receipt.blockNumber),
            cumulativeGasUsed: bnify(receipt.cumulativeGasUsed),
            effectiveGasPrice: bnify(receipt.effectiveGasPrice),
            etxs: receipt.etxs,
            gasUsed: bnify(receipt.gasUsed),
            logs: receipt.logs,
            logsBloom: receipt.logsBloom,
            status: receipt.status,
            to: receipt.to,
            confirmations: 1, //only one block has been mined
            from: receipt.from,
            transactionHash: receipt.transactionHash,
            transactionIndex: Number(receipt.transactionIndex),
            type: receipt.type,
        }
        const receiptResult = await globalCyprus1Provider.getTransactionReceipt(internalTx.hash);
        equals("Internal Tx Receipt", receiptResult, expectedReceipt);
    })

    it("should fetch transaction receipt for internal to external tx", async function () {
        internalToExternalTx = await sendTransaction(cyprus2Destination);
        const receipt = await fetchRPCTxReceipt(internalToExternalTx.hash, process.env.CYPRUS1URL || "http://localhost:8610");
        waiter(10000);
        const expectedReceipt = {
            blockHash: receipt.blockHash,
            blockNumber: Number(receipt.blockNumber),
            contractAddress: receipt.contractAddress || null,
            cumulativeGasUsed: bnify(receipt.cumulativeGasUsed),
            effectiveGasPrice: bnify(receipt.effectiveGasPrice),
            etxs: receipt.etxs,
            gasUsed: bnify(receipt.gasUsed),
            logs: receipt.logs,
            logsBloom: receipt.logsBloom,
            status: receipt.status,
            to: receipt.to,
            from: receipt.from,
            transactionHash: receipt.transactionHash,
            transactionIndex: Number(receipt.transactionIndex),
            type: receipt.type,
            confirmations: 1, //only one block has been mined
        }
        const receiptResult = await globalCyprus1Provider.getTransactionReceipt(internalToExternalTx.hash);
        equals("Internal to External Tx Receipt", receiptResult, expectedReceipt);
    });
});