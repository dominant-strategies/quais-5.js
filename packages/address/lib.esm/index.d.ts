import { BytesLike } from "@quais/bytes";
import { BigNumberish } from "@quais/bignumber";
export declare function getAddress(address: string): string;
export declare function isAddress(address: string): boolean;
export declare function getIcapAddress(address: string): string;
export declare function getContractAddress(from: string, nonce: BigNumberish, data: BytesLike): string;
export declare function getCreate2Address(from: string, salt: BytesLike, initCodeHash: BytesLike): string;
export declare function validShard(shard: string): boolean;
export declare function getShardFromAddress(address: string): string;
//# sourceMappingURL=index.d.ts.map