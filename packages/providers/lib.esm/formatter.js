"use strict";
import { getAddress, getContractAddress } from "@quais/address";
import { BigNumber } from "@quais/bignumber";
import { hexDataLength, hexDataSlice, hexValue, hexZeroPad, isHexString } from "@quais/bytes";
import { AddressZero } from "@quais/constants";
import { shallowCopy } from "@quais/properties";
import { accessListify, parse as parseTransaction } from "@quais/transactions";
import { Logger } from "@quais/logger";
import { version } from "./_version";
const logger = new Logger(version);
const HIERARCHY_DEPTH = 3;
export class Formatter {
    constructor() {
        this.formats = this.getDefaultFormats();
    }
    getDefaultFormats() {
        const formats = ({});
        const address = this.address.bind(this);
        const bigNumber = this.bigNumber.bind(this);
        const bigNumberArray = this.bigNumberArray.bind(this);
        const numberArray = this.numberArray.bind(this);
        const blockTag = this.blockTag.bind(this);
        const data = this.data.bind(this);
        const hash = this.hash.bind(this);
        const hashArray = this.hashArray.bind(this);
        const hashArrayAnyLength = this.hashArrayAnyLength.bind(this);
        const hex = this.hex.bind(this);
        const number = this.number.bind(this);
        const etxs = this.etxs.bind(this);
        const strictData = (v) => { return this.data(v, true); };
        formats.transaction = {
            hash: hash,
            type: hex,
            accessList: Formatter.allowNull(this.accessList.bind(this), null),
            blockHash: Formatter.allowNull(hash, null),
            blockNumber: Formatter.allowNull(number, null),
            transactionIndex: Formatter.allowNull(number, null),
            from: address,
            // either (gasPrice) or (maxPriorityFeePerGas + maxFeePerGas)
            // must be set
            gasPrice: Formatter.allowNull(bigNumber),
            maxPriorityFeePerGas: Formatter.allowNull(bigNumber),
            maxFeePerGas: Formatter.allowNull(bigNumber),
            to: Formatter.allowNull(address, null),
            value: bigNumber,
            nonce: number,
            data: Formatter.allowNull(data),
            r: Formatter.allowNull(hex),
            s: Formatter.allowNull(hex),
            v: Formatter.allowNull(hex),
            raw: Formatter.allowNull(data),
            gas: Formatter.allowNull(bigNumber),
            //EXT TRANSACTIONS
            etxGasLimit: Formatter.allowNull(bigNumber),
            etxGasPrice: Formatter.allowNull(bigNumber),
            etxGasTip: Formatter.allowNull(bigNumber),
            etxData: Formatter.allowNull(data),
            etxAccessList: Formatter.allowNull(this.accessList.bind(this), null),
        };
        formats.transactionRequest = {
            from: Formatter.allowNull(address),
            nonce: Formatter.allowNull(number),
            gasLimit: Formatter.allowNull(bigNumber),
            gasPrice: Formatter.allowNull(bigNumber),
            maxPriorityFeePerGas: Formatter.allowNull(bigNumber),
            maxFeePerGas: Formatter.allowNull(bigNumber),
            to: Formatter.allowNull(address),
            value: Formatter.allowNull(bigNumber),
            data: Formatter.allowNull(strictData),
            type: Formatter.allowNull(number),
            accessList: Formatter.allowNull(this.accessList.bind(this), null),
            externalGasPrice: Formatter.allowNull(bigNumber),
            externalMaxPriorityFeePerGas: Formatter.allowNull(bigNumber),
            externalGasTip: Formatter.allowNull(bigNumber),
            externalAccessList: Formatter.allowNull(this.accessList.bind(this), null),
        };
        formats.receiptLog = {
            transactionIndex: number,
            blockNumber: number,
            transactionHash: hash,
            address: address,
            topics: Formatter.arrayOf(hash),
            data: data,
            logIndex: number,
            blockHash: hash,
        };
        formats.receipt = {
            to: Formatter.allowNull(this.address, null),
            from: Formatter.allowNull(this.address, null),
            contractAddress: Formatter.allowNull(address, null),
            transactionIndex: number,
            // should be allowNull(hash), but broken-EIP-658 support is handled in receipt
            root: Formatter.allowNull(hex),
            gasUsed: bigNumber,
            logsBloom: Formatter.allowNull(hex),
            blockHash: hash,
            transactionHash: hash,
            etxs: Formatter.allowNull(etxs, null),
            logs: Formatter.arrayOf(this.receiptLog.bind(this)),
            blockNumber: number,
            confirmations: Formatter.allowNull(number, null),
            cumulativeGasUsed: bigNumber,
            effectiveGasPrice: Formatter.allowNull(bigNumber),
            status: hex,
            type: hex,
        };
        formats.block = {
            hash: Formatter.allowNull(hash),
            parentHash: hashArray,
            parentEntropy: bigNumberArray,
            number: numberArray,
            timestamp: number,
            nonce: Formatter.allowNull(hex),
            difficulty: bigNumber,
            gasLimit: bigNumber,
            gasUsed: bigNumber,
            baseFeePerGas: Formatter.allowNull(bigNumber),
            miner: Formatter.allowNull(address),
            extraData: data,
            transactions: Formatter.allowNull(Formatter.arrayOf(hash)),
            transactionsRoot: hash,
            extTransactions: Formatter.allowNull(Formatter.arrayOf(hash)),
            extRollupRoot: Formatter.allowNull(hash),
            extTransactionsRoot: Formatter.allowNull(hash),
            location: Formatter.allowNull(hex),
            manifestHash: hashArrayAnyLength,
            mixHash: hash,
            order: Number,
            parentDeltaS: bigNumberArray,
            receiptsRoot: hash,
            sha3Uncles: hash,
            size: bigNumber,
            stateRoot: hash,
            uncles: Formatter.allowNull(Formatter.arrayOf(hash)),
            subManifest: Formatter.allowNull(Formatter.arrayOf(hash)),
            totalEntropy: bigNumber,
        };
        formats.blockWithTransactions = shallowCopy(formats.block);
        formats.blockWithTransactions.transactions = Formatter.allowNull(Formatter.arrayOf(this.transactionResponse.bind(this)));
        formats.filter = {
            fromBlock: Formatter.allowNull(blockTag, undefined),
            toBlock: Formatter.allowNull(blockTag, undefined),
            blockHash: Formatter.allowNull(hash, undefined),
            address: Formatter.allowNull(address, undefined),
            topics: Formatter.allowNull(this.topics.bind(this), undefined),
        };
        formats.filterLog = {
            blockNumber: Formatter.allowNull(number),
            blockHash: Formatter.allowNull(hash),
            transactionIndex: number,
            address: address,
            data: Formatter.allowFalsish(data, "0x"),
            topics: Formatter.arrayOf(hash),
            transactionHash: hash,
            logIndex: number,
        };
        return formats;
    }
    accessList(accessList) {
        return accessListify(accessList || []);
    }
    // Requires a BigNumberish that is within the IEEE754 safe integer range; returns a number
    // Strict! Used on input.
    number(number) {
        if (number === "0x") {
            return 0;
        }
        return BigNumber.from(number).toNumber();
    }
    // Strict! Used on input.
    bigNumber(value) {
        return BigNumber.from(value);
    }
    numberArray(value) {
        return Array.from(value, item => (Number(item)));
    }
    // Strict! Used on input.
    bigNumberArray(value) {
        return Array.from(value, item => (BigNumber.from(item)));
    }
    // Requires a boolean, "true" or  "false"; returns a boolean
    boolean(value) {
        if (typeof (value) === "boolean") {
            return value;
        }
        if (typeof (value) === "string") {
            value = value.toLowerCase();
            if (value === "true") {
                return true;
            }
            if (value === "false") {
                return false;
            }
        }
        throw new Error("invalid boolean - " + value);
    }
    hex(value, strict) {
        if (typeof (value) === "string") {
            if (!strict && value.substring(0, 2) !== "0x") {
                value = "0x" + value;
            }
            if (isHexString(value)) {
                return value.toLowerCase();
            }
        }
        return logger.throwArgumentError("invalid hash", "value", value);
    }
    data(value, strict) {
        const result = this.hex(value, strict);
        if ((result.length % 2) !== 0) {
            throw new Error("invalid data; odd-length - " + value);
        }
        return result;
    }
    // Requires an address
    // Strict! Used on input.
    address(value) {
        return getAddress(value);
    }
    etxs(value) {
        if (!Array.isArray(value)) {
            throw new Error("Value must be an array.");
        }
        const formattedEtxs = [];
        for (let i = 0; i < value.length; i++) {
            const etx = value[i];
            formattedEtxs.push({
                type: etx.type,
                nonce: Number(etx.nonce),
                gasPrice: Formatter.allowNull(this.bigNumber, null)(etx.gasPrice),
                maxPriorityFeePerGas: this.bigNumber(etx.maxPriorityFeePerGas),
                maxFeePerGas: this.bigNumber(etx.maxFeePerGas),
                gas: this.bigNumber(etx.gas),
                value: this.bigNumber(etx.value),
                data: this.data(etx.input),
                to: this.address(etx.to),
                accessList: Formatter.allowNull(this.accessList, null)(etx.accessList), // Add more detailed parsing if needed
                chainId: Number(etx.chainId),
                from: this.address(etx.sender),
                hash: this.hash(etx.hash)
            });
        }
        return formattedEtxs;
    }
    callAddress(value) {
        if (!isHexString(value, 32)) {
            return null;
        }
        const address = getAddress(hexDataSlice(value, 12));
        return (address === AddressZero) ? null : address;
    }
    contractAddress(value) {
        return getContractAddress(value.from, value.nonce, value.data);
    }
    // Strict! Used on input.
    blockTag(blockTag) {
        if (blockTag == null) {
            return "latest";
        }
        if (blockTag === "earliest") {
            return "0x0";
        }
        switch (blockTag) {
            case "earliest": return "0x0";
            case "latest":
            case "pending":
            case "safe":
            case "finalized":
                return blockTag;
        }
        if (typeof (blockTag) === "number" || isHexString(blockTag)) {
            return hexValue(blockTag);
        }
        throw new Error("invalid blockTag");
    }
    // Requires a hash, optionally requires 0x prefix; returns prefixed lowercase hash.
    hash(value, strict) {
        const result = this.hex(value, strict);
        if (hexDataLength(result) !== 32) {
            return logger.throwArgumentError("invalid hash", "value", value);
        }
        return result;
    }
    // Requires a hash array, optionally requires 0x prefix; returns prefixed lowercase hash.
    hashArray(value, strict) {
        if (value.length != HIERARCHY_DEPTH) {
            return logger.throwArgumentError("invalid hash array", "value", value);
        }
        let results = [];
        for (const hash of value) {
            const result = this.hex(hash, strict);
            if (hexDataLength(result) !== 32) {
                return logger.throwArgumentError("invalid hash", "value", value);
            }
            results.push(result);
        }
        return results;
    }
    hashArrayAnyLength(value, strict) {
        if (value.length != HIERARCHY_DEPTH) {
            return logger.throwArgumentError("invalid hash array", "value", value);
        }
        let results = [];
        for (const hash of value) {
            const result = this.hex(hash, strict);
            results.push(result);
        }
        return results;
    }
    // Returns the difficulty as a number, or if too large (i.e. PoA network) null
    difficulty(value) {
        if (value == null) {
            return null;
        }
        const v = BigNumber.from(value);
        try {
            return v.toNumber();
        }
        catch (error) { }
        return null;
    }
    uint256(value) {
        if (!isHexString(value)) {
            throw new Error("invalid uint256");
        }
        return hexZeroPad(value, 32);
    }
    _block(value, format, simplify) {
        if (value.author != null && value.miner == null) {
            value.miner = value.author;
        }
        // The difficulty may need to come from _difficulty in recursed blocks
        const difficulty = (value._difficulty != null) ? value._difficulty : value.difficulty;
        const result = Formatter.check(format, value);
        result._difficulty = ((difficulty == null) ? null : difficulty);
        return this.contextBlock(result, simplify);
    }
    block(value, simplify) {
        return this._block(value, this.formats.block, simplify);
    }
    blockWithTransactions(value) {
        return this._block(value, this.formats.blockWithTransactions);
    }
    contextBlock(value, simplify = false) {
        let contextBlock = {
            number: simplify ? value.number[2] : value.number,
            transactions: value.transactions,
            hash: value.hash,
            parentHash: simplify ? value.parentHash[2] : value.parentHash,
            parentEntropy: simplify ? value.parentEntropy[2] : value.parentEntropy,
            extTransactions: value.extTransactions,
            timestamp: value.timestamp,
            nonce: value.nonce,
            difficulty: value.difficulty,
            gasLimit: value.gasLimit,
            gasUsed: value.gasUsed,
            miner: value.miner,
            extraData: value.extraData,
            transactionsRoot: value.transactionsRoot,
            stateRoot: value.stateRoot,
            receiptsRoot: value.receiptsRoot,
            baseFeePerGas: value.baseFeePerGas,
            extRollupRoot: value.extRollupRoot,
            extTransactionsRoot: value.extTransactionsRoot,
            location: value.location,
            manifestHash: simplify ? value.manifestHash[2] : value.manifestHash,
            mixHash: value.mixHash,
            order: value.order,
            parentDeltaS: simplify ? value.parentDeltaS[2] : value.parentDeltaS,
            sha3Uncles: value.sha3Uncles,
            size: value.size,
            uncles: value.uncles,
            subManifest: value.subManifest,
            totalEntropy: value.totalEntropy,
        };
        return contextBlock;
    }
    // Strict! Used on input.
    transactionRequest(value) {
        return Formatter.check(this.formats.transactionRequest, value);
    }
    transactionResponse(transaction) {
        // Rename gas to gasLimit
        if (transaction.gas != null && transaction.gasLimit == null) {
            transaction.gas = transaction.gas;
        }
        // Some clients (TestRPC) do strange things like return 0x0 for the
        // 0 address; correct this to be a real address
        if (transaction.to && BigNumber.from(transaction.to).isZero()) {
            transaction.to = "0x0000000000000000000000000000000000000000";
        }
        // Rename input to data
        if (transaction.input != null && transaction.data == null) {
            transaction.data = transaction.input;
        }
        if (transaction.type == '0x1') {
            transaction.from = transaction.sender;
            delete transaction.sender;
        }
        if ((transaction.type === '0x1' || transaction.type === '0x2') && transaction.accessList == null) {
            transaction.accessList = [];
        }
        const result = Formatter.check(this.formats.transaction, transaction);
        if (transaction.chainId != null) {
            let chainId = transaction.chainId;
            if (isHexString(chainId)) {
                chainId = BigNumber.from(chainId).toNumber();
            }
            result.chainId = chainId;
        }
        else {
            let chainId = transaction.networkId;
            // geth-etc returns chainId
            if (chainId == null && result.v == null) {
                chainId = transaction.chainId;
            }
            if (isHexString(chainId)) {
                chainId = BigNumber.from(chainId).toNumber();
            }
            if (typeof (chainId) !== "number" && result.v != null) {
                chainId = (result.v - 35) / 2;
                if (chainId < 0) {
                    chainId = 0;
                }
                chainId = parseInt(chainId);
            }
            if (typeof (chainId) !== "number") {
                chainId = 0;
            }
            result.chainId = chainId;
        }
        // 0x0000... should actually be null
        if (result.blockHash && result.blockHash.replace(/0/g, "") === "x") {
            result.blockHash = null;
        }
        return result;
    }
    transaction(value) {
        return parseTransaction(value);
    }
    receiptLog(value) {
        return Formatter.check(this.formats.receiptLog, value);
    }
    receipt(value) {
        const result = Formatter.check(this.formats.receipt, value);
        // RSK incorrectly implemented EIP-658, so we munge things a bit here for it
        if (result.root != null) {
            if (result.root.length <= 4) {
                // Could be 0x00, 0x0, 0x01 or 0x1
                const value = BigNumber.from(result.root).toNumber();
                if (value === 0 || value === 1) {
                    // Make sure if both are specified, they match
                    if (result.status != null && (result.status !== value)) {
                        logger.throwArgumentError("alt-root-status/status mismatch", "value", { root: result.root, status: result.status });
                    }
                    result.status = value;
                    delete result.root;
                }
                else {
                    logger.throwArgumentError("invalid alt-root-status", "value.root", result.root);
                }
            }
            else if (result.root.length !== 66) {
                // Must be a valid bytes32
                logger.throwArgumentError("invalid root hash", "value.root", result.root);
            }
        }
        return result;
    }
    topics(value) {
        if (Array.isArray(value)) {
            return value.map((v) => this.topics(v));
        }
        else if (value != null) {
            return this.hash(value, true);
        }
        return null;
    }
    filter(value) {
        return Formatter.check(this.formats.filter, value);
    }
    filterLog(value) {
        return Formatter.check(this.formats.filterLog, value);
    }
    static check(format, object) {
        const result = {};
        for (const key in format) {
            try {
                const value = format[key](object[key]);
                if (value !== undefined) {
                    result[key] = value;
                }
            }
            catch (error) {
                error.checkKey = key;
                error.checkValue = object[key];
                throw error;
            }
        }
        return result;
    }
    // if value is null-ish, nullValue is returned
    static allowNull(format, nullValue) {
        return (function (value) {
            if (value == null) {
                return nullValue;
            }
            return format(value);
        });
    }
    // If value is false-ish, replaceValue is returned
    static allowFalsish(format, replaceValue) {
        return (function (value) {
            if (!value) {
                return replaceValue;
            }
            return format(value);
        });
    }
    // Requires an Array satisfying check
    static arrayOf(format) {
        return (function (array) {
            if (!Array.isArray(array)) {
                throw new Error("not an array");
            }
            const result = [];
            array.forEach(function (value) {
                result.push(format(value));
            });
            return result;
        });
    }
}
export function isCommunityResourcable(value) {
    return (value && typeof (value.isCommunityResource) === "function");
}
export function isCommunityResource(value) {
    return (isCommunityResourcable(value) && value.isCommunityResource());
}
// Show the throttle message only once
let throttleMessage = false;
export function showThrottleMessage() {
    if (throttleMessage) {
        return;
    }
    throttleMessage = true;
    console.log("========= NOTICE =========");
    console.log("Request-Rate Exceeded  (this message will not be repeated)");
    console.log("");
    console.log("The default API keys for each service are provided as a highly-throttled,");
    console.log("community resource for low-traffic projects and early prototyping.");
    console.log("");
    console.log("While your application will continue to function, we highly recommended");
    console.log("signing up for your own API keys to improve performance, increase your");
    console.log("request rate/limit and enable other perks, such as metrics and advanced APIs.");
    console.log("");
    console.log("For more details: https:/\/docs.ethers.io/api-keys/");
    console.log("==========================");
}
//# sourceMappingURL=formatter.js.map