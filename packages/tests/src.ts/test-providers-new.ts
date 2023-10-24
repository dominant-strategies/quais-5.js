"use strict";

import assert from "assert";

import { quais } from "quais";
import axios from 'axios';
//import { fundAddress, returnFunds } from "./utils";

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

    async function fetchRPCTransaction(txHash: string){
        try {
            const response = await axios.post(process.env.CYPRUS1URL || "http://localhost:8610", {
            jsonrpc: "2.0",
            method: "quai_getBlockByNumber",
            params: [
               txHash,
            ],
            id: 1
            });
            return response.data.result;
        
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
        }
    }
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
            
            const txResponse = await walletWithProvider.sendTransaction(tx);
            await waiter(5000);
            console.log(`Transaction hash for type ${typeValue}: `, txResponse.hash);
            return txResponse;
        } catch(e){
            console.error('Failed to send Transaction: ', e);
            return null;
        }
    }

    async function fetchRPCBalance(address: string, url: string){
        try {
            const response = await axios.post(url, {
            jsonrpc: "2.0",
            method: "quai_getBalance",
            params: [
                address,
                'latest'
            ],
            id: 1
            });
            return response.data.result;
        
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
        }
    }

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
            return response.data.result;
        
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
        }
    }

    async function fetchRPCTxReceipt(hash: string ,url: string){
        try {
            const response = await axios.post(url, {
            jsonrpc: "2.0",
            method: "quai_getTransactionReceipt",
            params: [
                hash
            ],
            id: 1
            });
            return response.data.result;
        
        } catch (error) {
            throw new Error(`Error fetching block: ${error.message}`);
        }
    }

    before( async () => {
        globalCyprus1Provider = await new quais.providers.JsonRpcProvider(process.env.CYPRUS1URL || "http://localhost:8610");
       // globalCyprus2Provider = await new quais.providers.JsonRpcProvider(process.env.CYPRUS2URL || "http://localhost:8542");
        
        
        walletWithProvider = await new quais.Wallet(hre.network.config.accounts[0], globalCyprus1Provider);
        const resBlock = await fetchRPCBlock('0xA');

        qrc20Contract = await deployQRC20();
        //await qrc20Contract.deployTransaction.wait();
        //console.log('Deploy Transaction: ', qrc20Contract.deployTransaction);
        await waiter(30000)
        deployTx = await fetchRPCTransaction(qrc20Contract.deployTransaction.hash);

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
    });

    it('should fetch balance after internal tx', async function () {
        oldCyprus1Bal = await fetchRPCBalance(cyprus1Destination, process.env.CYPRUS1URL || "http://localhost:8610");
        internalTx = await sendTransaction(cyprus1Destination);

        const expectedBal = bnify(internalTx.value);
        const balance = await globalCyprus1Provider.getBalance(cyprus1Destination);
        const actualBal = Number(balance) - Number(oldCyprus1Bal)
        assert.equal(actualBal, Number(expectedBal));
    });

    it.skip('should fetch deploy contract transaction', async function () {
        const tx = await globalCyprus1Provider.getTransaction(deployTx.hash);

        console.log("Expected:", JSON.stringify(deployTx, null, 2));
        console.log("Actual:", JSON.stringify(tx, null, 2));
        equals('Fetch Contract deployment TX', tx, deployTx); 
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
        console.log("Internal to External Tx: ", internalToExternalTx.hash)
        const receipt = await fetchRPCTxReceipt(internalToExternalTx.hash, process.env.CYPRUS1URL || "http://localhost:8610");
        waiter(10000);
        console.log("Receipt: ", JSON.stringify(receipt, null, 2))
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