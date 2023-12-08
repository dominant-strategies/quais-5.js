import { Block, TransactionReceipt, TransactionResponse } from "@quais/abstract-provider";
import { BigNumber } from "@quais/bignumber";
import { AccessList } from "@quais/transactions";
export type FormatFunc = (value: any) => any;
export type FormatFuncs = {
    [key: string]: FormatFunc;
};
export type Formats = {
    transaction: FormatFuncs;
    transactionRequest: FormatFuncs;
    receipt: FormatFuncs;
    receiptLog: FormatFuncs;
    block: FormatFuncs;
    blockWithTransactions: FormatFuncs;
    filter: FormatFuncs;
    filterLog: FormatFuncs;
};
export declare class Formatter {
    readonly formats: Formats;
    constructor();
    getDefaultFormats(): Formats;
    accessList(accessList: Array<any>): AccessList;
    number(number: any): number;
    bigNumber(value: any): BigNumber;
    numberArray(value: any[]): Number[];
    bigNumberArray(value: any): BigNumber[];
    boolean(value: any): boolean;
    hex(value: any, strict?: boolean): string;
    data(value: any, strict?: boolean): string;
    address(value: any): string;
    etxs(value: any): any;
    callAddress(value: any): string;
    contractAddress(value: any): string;
    blockTag(blockTag: any): string;
    hash(value: any, strict?: boolean): string;
    hashArray(value: any, strict?: boolean): string[];
    hashArrayAnyLength(value: any, strict?: boolean): string[];
    difficulty(value: any): number;
    uint256(value: any): string;
    _block(value: any, format: any, simplify?: boolean): Block;
    block(value: any, simplify?: boolean): Block;
    blockWithTransactions(value: any): Block;
    contextBlock(value: any, simplify?: boolean): Block;
    transactionRequest(value: any): any;
    transactionResponse(transaction: any): TransactionResponse;
    transaction(value: any): any;
    receiptLog(value: any): any;
    receipt(value: any): TransactionReceipt;
    topics(value: any): any;
    filter(value: any): any;
    filterLog(value: any): any;
    static check(format: {
        [name: string]: FormatFunc;
    }, object: any): any;
    static allowNull(format: FormatFunc, nullValue?: any): FormatFunc;
    static allowFalsish(format: FormatFunc, replaceValue: any): FormatFunc;
    static arrayOf(format: FormatFunc): FormatFunc;
}
export interface CommunityResourcable {
    isCommunityResource(): boolean;
}
export declare function isCommunityResourcable(value: any): value is CommunityResourcable;
export declare function isCommunityResource(value: any): boolean;
export declare function showThrottleMessage(): void;
//# sourceMappingURL=formatter.d.ts.map