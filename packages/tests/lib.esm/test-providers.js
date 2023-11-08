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
import { quais } from "quais";
import axios from 'axios';
const hre = require("hardhat");
const bnify = quais.BigNumber.from;
function waiter(duration) {
    return new Promise((resolve) => {
        const timer = setTimeout(resolve, duration);
        if (timer.unref) {
            timer.unref();
        }
    });
}
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
            if (typeof actual[key] === "string" && actual[key].toLowerCase && key === "type") {
                actual[key] = actual[key].toLowerCase();
            }
            equals("(" + name + " - key + " + key + ")", actual[key], expected[key]);
        });
    }
    else {
        if (actual == null) {
            assert.ok(false, name + " - actual null");
        }
        // Modify this part for case-insensitive comparison for string values
        if (typeof actual === 'string' && typeof expected === 'string') {
            assert.equal(actual.toLowerCase(), expected.toLowerCase(), name + " matches (case-insensitive)");
        }
        else {
            assert.equal(actual, expected, name + " matches");
        }
    }
}
describe("Test Providers", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const cyprus1Destination = '0x193399fa97ae9762a186e921582cedb0987d9470';
        const cyprus2Destination = '0x333f87cba94a5f121c3f8d7a4b4616e31f7859b4';
        let oldCyprus1Bal;
        //let oldCyprus2Bal: number;
        let globalCyprus1Provider;
        //let globalCyprus2Provider: quais.providers.Provider; 
        let walletWithProvider;
        let qrc20Contract;
        let deployTx;
        let block;
        let internalTx;
        let internalToExternalTx;
        this.timeout(60000);
        function deployQRC20() {
            return __awaiter(this, void 0, void 0, function* () {
                const ethersContract = yield hre.ethers.getContractFactory('QRC20');
                const QuaisContract = new quais.ContractFactory(ethersContract.interface.fragments, ethersContract.bytecode, walletWithProvider);
                return yield QuaisContract.deploy({ gasLimit: 4000000 });
            });
        }
        function fetchRPCTransaction(txHash) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let response;
                    do {
                        response = yield axios.post(process.env.CYPRUS1URL || "http://localhost:8610", {
                            jsonrpc: "2.0",
                            method: "quai_getTransactionByHash",
                            params: [
                                txHash,
                            ],
                            id: 1
                        });
                    } while (response.data.result.blockHash == null);
                    return response.data.result;
                }
                catch (error) {
                    throw new Error(`Error fetching block: ${error.message}`);
                }
            });
        }
        function getRPCGasPrice(url) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let response;
                    do {
                        response = yield axios.post(url || "http://localhost:8610", {
                            jsonrpc: "2.0",
                            method: "quai_gasPrice",
                            params: [],
                            id: 1
                        });
                    } while (response.data.result == null);
                    return response.data.result;
                }
                catch (error) {
                    throw new Error(`Error fetching block: ${error.message}`);
                }
            });
        }
        function sendTransaction(to) {
            return __awaiter(this, void 0, void 0, function* () {
                let txResponse;
                let typeValue;
                try {
                    do {
                        const prefix = to.substring(0, 4);
                        typeValue = (Number(prefix) > 29) ? 2 : 0;
                        const gas = yield getRPCGasPrice(process.env.CYPRUS1URL);
                        let tx = {
                            from: walletWithProvider.address,
                            to,
                            value: quais.utils.parseEther('0.01'),
                            gasPrice: gas,
                            maxFeePerGas: gas,
                            maxPriorityFeePerGas: quais.utils.parseUnits('1', 'gwei'),
                            nonce: yield globalCyprus1Provider.getTransactionCount(walletWithProvider.address, 'latest'),
                            data: '',
                            type: typeValue,
                            gasLimit: typeValue == 0 ? 21000 : 42000,
                            chainId: Number(process.env.CHAINID),
                        };
                        txResponse = yield walletWithProvider.sendTransaction(tx);
                        yield waiter(5000);
                    } while (txResponse.hash == null);
                    console.log(`Transaction hash for type ${typeValue}: `, txResponse.hash);
                    return txResponse;
                }
                catch (e) {
                    console.error('Failed to send Transaction: ', e);
                    return null;
                }
            });
        }
        function fetchRPCBalance(address, url) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let response;
                    do {
                        response = yield axios.post(url, {
                            jsonrpc: "2.0",
                            method: "quai_getBalance",
                            params: [
                                address,
                                'latest'
                            ],
                            id: 1
                        });
                    } while (response.data.result == null);
                    return response.data.result;
                }
                catch (error) {
                    throw new Error(`Error fetching block: ${error.message}`);
                }
            });
        }
        function fetchRPCBlock(blockNumber) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let response;
                    do {
                        response = yield axios.post(process.env.CYPRUS1URL || "http://localhost:8610", {
                            jsonrpc: "2.0",
                            method: "quai_getBlockByNumber",
                            params: [
                                blockNumber || '0xA',
                                false
                            ],
                            id: 1
                        });
                    } while (response.data.result.hash == null);
                    return response.data.result;
                }
                catch (error) {
                    throw new Error(`Error fetching block: ${error.message}`);
                }
            });
        }
        function fetchRPCTxReceipt(hash, url) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let response;
                    do {
                        response = yield axios.post(url, {
                            jsonrpc: "2.0",
                            method: "quai_getTransactionReceipt",
                            params: [
                                hash
                            ],
                            id: 1
                        });
                        waiter(5000);
                    } while (response.data.result.blockHash == null);
                    return response.data.result;
                }
                catch (error) {
                    throw new Error(`Error fetching block: ${error.message}`);
                }
            });
        }
        before(() => __awaiter(this, void 0, void 0, function* () {
            globalCyprus1Provider = yield new quais.providers.JsonRpcProvider(process.env.CYPRUS1URL || "http://localhost:8610");
            // globalCyprus2Provider = await new quais.providers.JsonRpcProvider(process.env.CYPRUS2URL || "http://localhost:8542");
            walletWithProvider = yield new quais.Wallet(hre.network.config.accounts[0], globalCyprus1Provider);
            const resBlock = yield fetchRPCBlock('0xA');
            block = {
                hash: resBlock.hash,
                number: resBlock.number.map((stringNumber) => Number(stringNumber)),
                transactions: resBlock.transactions,
                parentHash: resBlock.parentHash,
                parentEntropy: resBlock.parentEntropy.map((entropy) => bnify(entropy)),
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
                parentDeltaS: resBlock.parentDeltaS.map((delta) => bnify(delta)),
                sha3Uncles: resBlock.sha3Uncles,
                size: bnify(resBlock.size),
                uncles: resBlock.uncles,
                subManifest: resBlock.subManifest,
                totalEntropy: bnify(resBlock.totalEntropy),
            };
            qrc20Contract = yield deployQRC20();
            yield waiter(30000);
            deployTx = yield fetchRPCTransaction(qrc20Contract.deployTransaction.hash);
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
            };
        }));
        it('should fetch balance after internal tx', function () {
            return __awaiter(this, void 0, void 0, function* () {
                oldCyprus1Bal = yield fetchRPCBalance(cyprus1Destination, process.env.CYPRUS1URL || "http://localhost:8610");
                internalTx = yield sendTransaction(cyprus1Destination);
                const expectedBal = bnify(internalTx.value);
                const balance = yield globalCyprus1Provider.getBalance(cyprus1Destination);
                const actualBal = Number(balance) - Number(oldCyprus1Bal);
                assert.equal(actualBal, Number(expectedBal));
            });
        });
        it('should fetch deploy contract transaction', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const tx = yield globalCyprus1Provider.getTransaction(deployTx.hash);
                delete tx.wait;
                equals('Fetch Contract deployment TX', tx, deployTx);
            });
        });
        it('should get account code', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const code = yield globalCyprus1Provider.getCode(cyprus1Destination);
                assert.equal(code, '0x');
            });
        });
        it('should fetch block by number', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const responseBlock = yield globalCyprus1Provider.getBlock('0xA');
                equals("Block by Number", responseBlock, block);
            });
        });
        it('should fetch block by hash', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const responseBlock = yield globalCyprus1Provider.getBlock(block.hash);
                equals("Block by Hash", responseBlock, block);
            });
        });
        it('should fetch a simplified block', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const responseBlockHash = yield globalCyprus1Provider.getBlock(block.hash, true);
                const responseBlockNumber = yield globalCyprus1Provider.getBlock(block.number[2], true);
                block.number = block.number[2];
                block.parentEntropy = block.parentEntropy[2];
                block.parentDeltaS = block.parentDeltaS[2];
                block.parentHash = block.parentHash[2];
                block.manifestHash = block.manifestHash[2];
                equals("Simplified Block by Hash", responseBlockHash, block);
                equals("Simplified Block by Number", responseBlockNumber, block);
            });
        });
        it('should get transaction receipt for internal tx', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const receipt = yield fetchRPCTxReceipt(internalTx.hash, process.env.CYPRUS1URL || "http://localhost:8610");
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
                    confirmations: 1,
                    from: receipt.from,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: Number(receipt.transactionIndex),
                    type: receipt.type,
                };
                const receiptResult = yield globalCyprus1Provider.getTransactionReceipt(internalTx.hash);
                equals("Internal Tx Receipt", receiptResult, expectedReceipt);
            });
        });
        it("should fetch transaction receipt for internal to external tx", function () {
            return __awaiter(this, void 0, void 0, function* () {
                internalToExternalTx = yield sendTransaction(cyprus2Destination);
                const receipt = yield fetchRPCTxReceipt(internalToExternalTx.hash, process.env.CYPRUS1URL || "http://localhost:8610");
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
                };
                const receiptResult = yield globalCyprus1Provider.getTransactionReceipt(internalToExternalTx.hash);
                equals("Internal to External Tx Receipt", receiptResult, expectedReceipt);
            });
        });
    });
});
//# sourceMappingURL=test-providers.js.map