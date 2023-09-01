"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.serialize = exports.accessListify = exports.recoverAddress = exports.computeAddress = exports.TransactionTypes = void 0;
var address_1 = require("@quais/address");
var bignumber_1 = require("@quais/bignumber");
var bytes_1 = require("@quais/bytes");
var constants_1 = require("@quais/constants");
var keccak256_1 = require("@quais/keccak256");
var RLP = __importStar(require("@quais/rlp"));
var signing_key_1 = require("@quais/signing-key");
var logger_1 = require("@quais/logger");
var _version_1 = require("./_version");
var logger = new logger_1.Logger(_version_1.version);
var TransactionTypes;
(function (TransactionTypes) {
    TransactionTypes[TransactionTypes["standard"] = 0] = "standard";
    TransactionTypes[TransactionTypes["etx"] = 1] = "etx";
    TransactionTypes[TransactionTypes["standardETx"] = 2] = "standardETx";
})(TransactionTypes = exports.TransactionTypes || (exports.TransactionTypes = {}));
;
///////////////////////////////
function handleAddress(value) {
    if (value === "0x") {
        return null;
    }
    return (0, address_1.getAddress)(value);
}
function handleNumber(value) {
    if (value === "0x") {
        return constants_1.Zero;
    }
    return bignumber_1.BigNumber.from(value);
}
function computeAddress(key) {
    var publicKey = (0, signing_key_1.computePublicKey)(key);
    return (0, address_1.getAddress)((0, bytes_1.hexDataSlice)((0, keccak256_1.keccak256)((0, bytes_1.hexDataSlice)(publicKey, 1)), 12));
}
exports.computeAddress = computeAddress;
function recoverAddress(digest, signature) {
    return computeAddress((0, signing_key_1.recoverPublicKey)((0, bytes_1.arrayify)(digest), signature));
}
exports.recoverAddress = recoverAddress;
function formatNumber(value, name) {
    var result = (0, bytes_1.stripZeros)(bignumber_1.BigNumber.from(value).toHexString());
    if (result.length > 32) {
        logger.throwArgumentError("invalid length for " + name, ("transaction:" + name), value);
    }
    return result;
}
function accessSetify(addr, storageKeys) {
    return {
        address: (0, address_1.getAddress)(addr),
        storageKeys: (storageKeys || []).map(function (storageKey, index) {
            if ((0, bytes_1.hexDataLength)(storageKey) !== 32) {
                logger.throwArgumentError("invalid access list storageKey", "accessList[" + addr + ":" + index + "]", storageKey);
            }
            return storageKey.toLowerCase();
        })
    };
}
function accessListify(value) {
    if (Array.isArray(value)) {
        return value.map(function (set, index) {
            if (Array.isArray(set)) {
                if (set.length > 2) {
                    logger.throwArgumentError("access list expected to be [ address, storageKeys[] ]", "value[" + index + "]", set);
                }
                return accessSetify(set[0], set[1]);
            }
            return accessSetify(set.address, set.storageKeys);
        });
    }
    var result = Object.keys(value).map(function (addr) {
        var storageKeys = value[addr].reduce(function (accum, storageKey) {
            accum[storageKey] = true;
            return accum;
        }, {});
        return accessSetify(addr, Object.keys(storageKeys).sort());
    });
    result.sort(function (a, b) { return (a.address.localeCompare(b.address)); });
    return result;
}
exports.accessListify = accessListify;
function formatAccessList(value) {
    return accessListify(value).map(function (set) { return [set.address, set.storageKeys]; });
}
function _serialize(transaction, signature) {
    // If there is an explicit gasPrice, make sure it matches the
    // EIP-1559 fees; otherwise they may not understand what they
    // think they are setting in terms of fee.
    if (transaction.gasPrice != null) {
        var gasPrice = bignumber_1.BigNumber.from(transaction.gasPrice);
        var maxFeePerGas = bignumber_1.BigNumber.from(transaction.maxFeePerGas || 0);
        if (!gasPrice.eq(maxFeePerGas)) {
            logger.throwArgumentError("mismatch EIP-1559 gasPrice != maxFeePerGas", "tx", {
                gasPrice: gasPrice,
                maxFeePerGas: maxFeePerGas
            });
        }
    }
    var fields = [
        formatNumber(transaction.chainId || 0, "chainId"),
        formatNumber(transaction.nonce || 0, "nonce"),
        formatNumber(transaction.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
        formatNumber(transaction.maxFeePerGas || 0, "maxFeePerGas"),
        formatNumber(transaction.gasLimit || 0, "gasLimit"),
        ((transaction.to != null) ? (0, address_1.getAddress)(transaction.to) : "0x"),
        formatNumber(transaction.value || 0, "value"),
        (transaction.data || "0x"),
        (formatAccessList(transaction.accessList || []))
    ];
    if (signature) {
        var sig = (0, bytes_1.splitSignature)(signature);
        fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
        fields.push((0, bytes_1.stripZeros)(sig.r));
        fields.push((0, bytes_1.stripZeros)(sig.s));
    }
    return (0, bytes_1.hexConcat)(["0x00", RLP.encode(fields)]);
}
function _serializeStandardETx(transaction, signature) {
    var fields = [
        formatNumber(transaction.chainId || 0, "chainId"),
        formatNumber(transaction.nonce || 0, "nonce"),
        formatNumber(transaction.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
        formatNumber(transaction.maxFeePerGas || 0, "maxFeePerGas"),
        formatNumber(transaction.gasLimit || 0, "gasLimit"),
        ((transaction.to != null) ? (0, address_1.getAddress)(transaction.to) : "0x"),
        formatNumber(transaction.value || 0, "value"),
        (transaction.data || "0x"),
        (formatAccessList(transaction.accessList || [])),
        formatNumber(transaction.externalGasLimit || 0, "externalGasLimit"),
        formatNumber(transaction.externalGasPrice || 0, "externalGasPrice"),
        formatNumber(transaction.externalGasTip || 0, "externalGasTip"),
        (transaction.externalData || "0x"),
        (formatAccessList(transaction.externalAccessList || [])),
    ];
    if (signature) {
        var sig = (0, bytes_1.splitSignature)(signature);
        fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
        fields.push((0, bytes_1.stripZeros)(sig.r));
        fields.push((0, bytes_1.stripZeros)(sig.s));
    }
    return (0, bytes_1.hexConcat)(["0x02", RLP.encode(fields)]);
}
function serialize(transaction, signature) {
    // Typed Transactions (standard and ETx)
    switch (transaction.type) {
        case 0:
            return _serialize(transaction, signature);
        case 2:
            return _serializeStandardETx(transaction, signature);
        default:
            break;
    }
    return logger.throwError("unsupported transaction type: " + transaction.type, logger_1.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "serializeTransaction",
        transactionType: transaction.type
    });
}
exports.serialize = serialize;
function _parseEipSignature(tx, fields, serialize) {
    try {
        var recid = handleNumber(fields[0]).toNumber();
        if (recid !== 0 && recid !== 1) {
            throw new Error("bad recid");
        }
        tx.v = recid;
    }
    catch (error) {
        logger.throwArgumentError("invalid v for transaction type: 1", "v", fields[0]);
    }
    tx.r = (0, bytes_1.hexZeroPad)(fields[1], 32);
    tx.s = (0, bytes_1.hexZeroPad)(fields[2], 32);
    try {
        var digest = (0, keccak256_1.keccak256)(serialize(tx));
        tx.from = recoverAddress(digest, { r: tx.r, s: tx.s, recoveryParam: tx.v });
    }
    catch (error) { }
}
function _parse(payload) {
    var transaction = RLP.decode(payload.slice(1));
    if (transaction.length !== 9 && transaction.length !== 12) {
        logger.throwArgumentError("invalid component count for transaction type: 0", "payload", (0, bytes_1.hexlify)(payload));
    }
    var maxPriorityFeePerGas = handleNumber(transaction[2]);
    var maxFeePerGas = handleNumber(transaction[3]);
    var tx = {
        type: 0,
        chainId: handleNumber(transaction[0]).toNumber(),
        nonce: handleNumber(transaction[1]).toNumber(),
        maxPriorityFeePerGas: maxPriorityFeePerGas,
        maxFeePerGas: maxFeePerGas,
        gasPrice: null,
        gasLimit: handleNumber(transaction[4]),
        to: handleAddress(transaction[5]),
        value: handleNumber(transaction[6]),
        data: transaction[7],
        accessList: accessListify(transaction[8]),
    };
    // Unsigned EIP-1559 Transaction
    if (transaction.length === 9) {
        return tx;
    }
    tx.hash = (0, keccak256_1.keccak256)(payload);
    _parseEipSignature(tx, transaction.slice(9), _serialize);
    return tx;
}
function _parseStandardETx(payload) {
    var transaction = RLP.decode(payload.slice(1));
    if (transaction.length !== 8 && transaction.length !== 17) {
        logger.throwArgumentError("invalid component count for transaction type: 1", "payload", (0, bytes_1.hexlify)(payload));
    }
    var maxPriorityFeePerGas = handleNumber(transaction[2]);
    var maxFeePerGas = handleNumber(transaction[3]);
    var tx = {
        type: 2,
        chainId: handleNumber(transaction[0]).toNumber(),
        nonce: handleNumber(transaction[1]).toNumber(),
        maxPriorityFeePerGas: maxPriorityFeePerGas,
        maxFeePerGas: maxFeePerGas,
        gasPrice: null,
        gasLimit: handleNumber(transaction[4]),
        to: handleAddress(transaction[5]),
        value: handleNumber(transaction[6]),
        data: transaction[7],
        accessList: accessListify(transaction[8]),
        externalGasLimit: handleNumber(transaction[9]),
        externalGasPrice: handleNumber(transaction[10]),
        externalGasTip: handleNumber(transaction[11]),
        externalData: transaction[12],
        externalAccessList: accessListify(transaction[13])
    };
    // Unsigned EIP-2930 Transaction
    if (transaction.length === 8) {
        return tx;
    }
    tx.hash = (0, keccak256_1.keccak256)(payload);
    _parseEipSignature(tx, transaction.slice(14), _serializeStandardETx);
    return tx;
}
function parse(rawTransaction) {
    var payload = (0, bytes_1.arrayify)(rawTransaction);
    // Typed Transaction (EIP-2718)
    switch (payload[0]) {
        case 0:
            return _parse(payload);
        case 2:
            return _parseStandardETx(payload);
        default:
            break;
    }
    return logger.throwError("unsupported transaction type: " + payload[0], logger_1.Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "parseTransaction",
        transactionType: payload[0]
    });
}
exports.parse = parse;
//# sourceMappingURL=index.js.map