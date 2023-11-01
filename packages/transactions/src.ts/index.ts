"use strict";

import { getAddress } from "@quais/address";
import { BigNumber, BigNumberish } from "@quais/bignumber";
import { arrayify, BytesLike, hexConcat, hexDataLength, hexDataSlice, hexlify, hexZeroPad, SignatureLike, splitSignature, stripZeros, } from "@quais/bytes";
import { Zero } from "@quais/constants";
import { keccak256 } from "@quais/keccak256";
import * as RLP from "@quais/rlp";
import { computePublicKey, recoverPublicKey } from "@quais/signing-key";

import { Logger } from "@quais/logger";
import { version } from "./_version";
const logger = new Logger(version);

///////////////////////////////
// Exported Types

export type AccessList = Array<{ address: string, storageKeys: Array<string> }>;

// Input allows flexibility in describing an access list
export type AccessListish = AccessList |
                            Array<[ string, Array<string> ]> |
                            Record<string, Array<string>>;

export enum TransactionTypes {
    standard = 0,
    etx = 1,
    standardETx = 2
};

export type UnsignedTransaction = {
    to?: string;
    nonce?: number;

    gasLimit?: BigNumberish;
    gasPrice?: BigNumberish;

    data?: BytesLike;
    value?: BigNumberish;
    chainId?: number;

    // Typed-Transaction features
    type?: number | null;

    // EIP-2930; Type 1 & EIP-1559; Type 2
    accessList?: AccessListish;

    // EIP-1559; Type 2
    maxPriorityFeePerGas?: BigNumberish;
    maxFeePerGas?: BigNumberish;

    // ETx field; Type 1
    externalGasLimit?: BigNumber;
    externalGasPrice?: BigNumber;
    externalGasTip?: BigNumber;
    externalData?: string;
    externalAccessList?: AccessListish;
}

export interface Transaction {
    hash?: string;

    to?: string;
    from?: string;
    nonce: number;

    gasLimit: BigNumber;
    gasPrice?: BigNumber;
    maxPriorityFeePerGas?: BigNumber;
    maxFeePerGas?: BigNumber;

    data: string;
    value: BigNumber;
    chainId: number;

    r?: string;
    s?: string;
    v?: number;

    // Typed-Transaction features
    type?: number | null;

    // EIP-2930; Type 0 & EIP-1559;
    accessList?: AccessList;

    // ETx field; Type 1
    externalGasLimit?: BigNumber;
    externalGasPrice?: BigNumber;
    externalGasTip?: BigNumber;
    externalData?: string;
    externalAccessList?: AccessList;

    // ETX Fields from TX Receipt
    gas?: BigNumberish;
    input?: string;
    sender?: string;
}

///////////////////////////////

function handleAddress(value: string): string {
    if (value === "0x") { return null; }
    return getAddress(value);
}

function handleNumber(value: string): BigNumber {
    if (value === "0x") { return Zero; }
    return BigNumber.from(value);
}

export function computeAddress(key: BytesLike | string): string {
    const publicKey = computePublicKey(key);
    return getAddress(hexDataSlice(keccak256(hexDataSlice(publicKey, 1)), 12));
}

export function recoverAddress(digest: BytesLike, signature: SignatureLike): string {
    return computeAddress(recoverPublicKey(arrayify(digest), signature));
}

function formatNumber(value: BigNumberish, name: string): Uint8Array {
    const result = stripZeros(BigNumber.from(value).toHexString());
    if (result.length > 32) {
        logger.throwArgumentError("invalid length for " + name, ("transaction:" + name), value);
    }
    return result;
}

function accessSetify(addr: string, storageKeys: Array<string>): { address: string,storageKeys: Array<string> } {
    return {
        address: getAddress(addr),
        storageKeys: (storageKeys || []).map((storageKey, index) => {
            if (hexDataLength(storageKey) !== 32) {
                logger.throwArgumentError("invalid access list storageKey", `accessList[${ addr }:${ index }]`, storageKey)
            }
            return storageKey.toLowerCase();
        })
    };
}

export function accessListify(value: AccessListish): AccessList {
    if (Array.isArray(value)) {
        return (<Array<[ string, Array<string>] | { address: string, storageKeys: Array<string>}>>value).map((set, index) => {
            if (Array.isArray(set)) {
                if (set.length > 2) {
                    logger.throwArgumentError("access list expected to be [ address, storageKeys[] ]", `value[${ index }]`, set);
                }
                return accessSetify(set[0], set[1])
            }
            return accessSetify(set.address, set.storageKeys);
        });
    }

    const result: Array<{ address: string, storageKeys: Array<string> }> = Object.keys(value).map((addr) => {
        const storageKeys: Record<string, true> = value[addr].reduce((accum, storageKey) => {
            accum[storageKey] = true;
            return accum;
        }, <Record<string, true>>{ });
        return accessSetify(addr, Object.keys(storageKeys).sort())
    });
    result.sort((a, b) => (a.address.localeCompare(b.address)));
    return result;
}

function formatAccessList(value: AccessListish): Array<[ string, Array<string> ]> {
    return accessListify(value).map((set) => [ set.address, set.storageKeys ]);
}

function _serialize(transaction: UnsignedTransaction, signature?: SignatureLike): string {
    // If there is an explicit gasPrice, make sure it matches the
    // EIP-1559 fees; otherwise they may not understand what they
    // think they are setting in terms of fee.
    //console.log('Serializing tx: \n', JSON.stringify(transaction, null, 4));
    if (transaction.gasPrice != null) {
        const gasPrice = BigNumber.from(transaction.gasPrice);
        const maxFeePerGas = BigNumber.from(transaction.maxFeePerGas || 0);
        if (!gasPrice.eq(maxFeePerGas)) {
            logger.throwArgumentError("mismatch EIP-1559 gasPrice != maxFeePerGas", "tx", {
                gasPrice, maxFeePerGas
            });
        }
    }

    const fields: any = [
        formatNumber(transaction.chainId || 0, "chainId"),
        formatNumber(transaction.nonce || 0, "nonce"),
        formatNumber(transaction.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
        formatNumber(transaction.maxFeePerGas || 0, "maxFeePerGas"),
        formatNumber(transaction.gasLimit || 0, "gasLimit"),
        ((transaction.to != null) ? getAddress(transaction.to): "0x"),
        formatNumber(transaction.value || 0, "value"),
        (transaction.data || "0x"),
        (formatAccessList(transaction.accessList || []))
    ];

    if (signature) {
        const sig = splitSignature(signature);
        fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
        fields.push(stripZeros(sig.r));
        fields.push(stripZeros(sig.s));
    }
    //console.log('Encoding tx: \n', JSON.stringify(fields, null, 4));
    return hexConcat([ "0x00", RLP.encode(fields)]);
}


function _serializeStandardETx(transaction: UnsignedTransaction, signature?: SignatureLike): string {
    const fields: any = [
        formatNumber(transaction.chainId || 0, "chainId"),
        formatNumber(transaction.nonce || 0, "nonce"),
        formatNumber(transaction.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
        formatNumber(transaction.maxFeePerGas || 0, "maxFeePerGas"),
        formatNumber(transaction.gasLimit || 0, "gasLimit"),
        ((transaction.to != null) ? getAddress(transaction.to): "0x"),
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
        const sig = splitSignature(signature);
        fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
        fields.push(stripZeros(sig.r));
        fields.push(stripZeros(sig.s));
    }

    return hexConcat([ "0x02", RLP.encode(fields)]);
}

export function serialize(transaction: UnsignedTransaction, signature?: SignatureLike): string {
    // Typed Transactions (standard and ETx)
    switch (transaction.type) {
        case 0:
            return _serialize(transaction, signature);
        case 2:
            return _serializeStandardETx(transaction, signature);

        default:
            break;
    }

    return logger.throwError(`unsupported transaction type: ${ transaction.type }`, Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "serializeTransaction",
        transactionType: transaction.type
    });
}

function _parseEipSignature(tx: Transaction, fields: Array<string>, serialize: (tx: UnsignedTransaction) => string): void {
    try {
        const recid = handleNumber(fields[0]).toNumber();
        if (recid !== 0 && recid !== 1) { throw new Error("bad recid"); }
        tx.v = recid;
    } catch (error) {
        logger.throwArgumentError("invalid v for transaction type: 1", "v", fields[0]);
    }

    tx.r = hexZeroPad(fields[1], 32);
    tx.s = hexZeroPad(fields[2], 32);

    try {
        const digest = keccak256(serialize(tx));
        tx.from = recoverAddress(digest, { r: tx.r, s: tx.s, recoveryParam: tx.v });
    } catch (error) { }
}

function _parse(payload: Uint8Array): Transaction {
    const transaction = RLP.decode(payload.slice(1));

    if (transaction.length !== 9 && transaction.length !== 12) {
        logger.throwArgumentError("invalid component count for transaction type: 0", "payload", hexlify(payload));
    }

    const maxPriorityFeePerGas = handleNumber(transaction[2]);
    const maxFeePerGas = handleNumber(transaction[3]);
    const tx: Transaction = {
        type:                  0,
        chainId:               handleNumber(transaction[0]).toNumber(),
        nonce:                 handleNumber(transaction[1]).toNumber(),
        maxPriorityFeePerGas:  maxPriorityFeePerGas,
        maxFeePerGas:          maxFeePerGas,
        gasPrice:              null,
        gasLimit:              handleNumber(transaction[4]),
        to:                    handleAddress(transaction[5]),
        value:                 handleNumber(transaction[6]),
        data:                  transaction[7],
        accessList:            accessListify(transaction[8]),
    };

    // Unsigned EIP-1559 Transaction
    if (transaction.length === 9) { return tx; }

    tx.hash = keccak256(payload);
    _parseEipSignature(tx, transaction.slice(9), _serialize);

    return tx;
}

function _parseStandardETx(payload: Uint8Array): Transaction {
    const transaction = RLP.decode(payload.slice(1));

    // if (transaction.length !== 8 && transaction.length !== 17) {
    //     logger.throwArgumentError("invalid component count for transaction type: 1", "payload", hexlify(payload));
    // }

    const maxPriorityFeePerGas = handleNumber(transaction[2]);
    const maxFeePerGas = handleNumber(transaction[3]);
    const tx: Transaction = {
        type:       2,
        chainId:    handleNumber(transaction[0]).toNumber(),
        nonce:      handleNumber(transaction[1]).toNumber(),
        maxPriorityFeePerGas:  maxPriorityFeePerGas,
        maxFeePerGas:          maxFeePerGas,
        gasPrice:   null,
        gasLimit:   handleNumber(transaction[4]),
        to:         handleAddress(transaction[5]),
        value:      handleNumber(transaction[6]),
        data:       transaction[7],
        accessList: accessListify(transaction[8]),
        externalGasLimit: handleNumber(transaction[9]),
        externalGasPrice:  handleNumber(transaction[10]),
        externalGasTip:  handleNumber(transaction[11]),
        externalData: transaction[12],
        externalAccessList: accessListify(transaction[13])
    };

    // Unsigned EIP-2930 Transaction
    if (transaction.length === 8) { return tx; }

    tx.hash = keccak256(payload);
    _parseEipSignature(tx, transaction.slice(14), _serializeStandardETx);

    return tx;
}

export function parse(rawTransaction: BytesLike): Transaction {
    const payload = arrayify(rawTransaction);
    // Typed Transaction (EIP-2718)
    switch (payload[0]) {
        case 0:
            return _parse(payload);
        case 2:
            return _parseStandardETx(payload);
        default:
            break;
    }

    return logger.throwError(`unsupported transaction type: ${ payload[0] }`, Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "parseTransaction",
        transactionType: payload[0]
    });
}

