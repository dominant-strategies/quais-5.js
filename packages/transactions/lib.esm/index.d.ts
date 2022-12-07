import { BigNumber, BigNumberish } from "@quais/bignumber";
import { BytesLike, SignatureLike } from "@quais/bytes";
export declare type AccessList = Array<{
    address: string;
    storageKeys: Array<string>;
}>;
export declare type AccessListish = AccessList | Array<[string, Array<string>]> | Record<string, Array<string>>;
export declare enum TransactionTypes {
    standard = 0,
    etx = 1,
    standardETx = 2
}
export declare type UnsignedTransaction = {
    to?: string;
    nonce?: number;
    gasLimit?: BigNumberish;
    gasPrice?: BigNumberish;
    data?: BytesLike;
    value?: BigNumberish;
    chainId?: number;
    type?: number | null;
    accessList?: AccessListish;
    maxPriorityFeePerGas?: BigNumberish;
    maxFeePerGas?: BigNumberish;
    externalGasLimit?: BigNumber;
    externalGasPrice?: BigNumber;
    externalGasTip?: BigNumber;
    externalData?: string;
    externalAccessList?: AccessListish;
};
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
    type?: number | null;
    accessList?: AccessList;
    externalGasLimit?: BigNumber;
    externalGasPrice?: BigNumber;
    externalGasTip?: BigNumber;
    externalData?: string;
    externalAccessList?: AccessList;
}
export declare function computeAddress(key: BytesLike | string): string;
export declare function recoverAddress(digest: BytesLike, signature: SignatureLike): string;
export declare function accessListify(value: AccessListish): AccessList;
export declare function serialize(transaction: UnsignedTransaction, signature?: SignatureLike): string;
export declare function parse(rawTransaction: BytesLike): Transaction;
//# sourceMappingURL=index.d.ts.map