import type { Transport } from "@ledgerhq/hw-transport-node-hid";
export type TransportCreator = {
    create: () => Promise<Transport>;
};
export declare const transports: {
    [name: string]: TransportCreator;
};
//# sourceMappingURL=ledger-transport.d.ts.map