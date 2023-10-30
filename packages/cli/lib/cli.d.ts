import { quais } from "quais";
export declare function dump(header: string, info: any): void;
declare class WrappedSigner extends quais.Signer {
    readonly addressPromise: Promise<string>;
    readonly provider: quais.providers.Provider;
    readonly plugin: Plugin;
    constructor(addressPromise: Promise<string>, signerFunc: () => Promise<quais.Signer>, plugin: Plugin);
    connect(provider?: quais.providers.Provider): quais.Signer;
    getAddress(): Promise<string>;
    signMessage(message: string | quais.utils.Bytes): Promise<string>;
    populateTransaction(transactionRequest: quais.providers.TransactionRequest): Promise<quais.providers.TransactionRequest>;
    signTransaction(transactionRequest: quais.providers.TransactionRequest): Promise<string>;
    sendTransaction(transactionRequest: quais.providers.TransactionRequest): Promise<quais.providers.TransactionResponse>;
    unlock(): Promise<void>;
}
export declare class ArgParser {
    readonly _args: Array<string>;
    readonly _consumed: Array<boolean>;
    constructor(args: Array<string>);
    _finalizeArgs(): Array<string>;
    _checkCommandIndex(): number;
    consumeFlag(name: string): boolean;
    consumeMultiOptions(names: Array<string>): Array<{
        name: string;
        value: string;
    }>;
    consumeOptions(name: string): Array<string>;
    consumeOption(name: string): string;
}
export interface Help {
    name: string;
    help: string;
}
export interface PluginType {
    new (...args: any[]): Plugin;
    getHelp?: () => Help;
    getOptionHelp?: () => Array<Help>;
}
export declare abstract class Plugin {
    network: quais.providers.Network;
    provider: quais.providers.Provider;
    accounts: ReadonlyArray<WrappedSigner>;
    mnemonicPassword: boolean;
    mnemonicPath: string;
    _xxxMnemonicPasswordHard: boolean;
    gasLimit: quais.BigNumber;
    gasPrice: quais.BigNumber;
    nonce: number;
    yes: boolean;
    wait: boolean;
    constructor();
    static getHelp(): Help;
    static getOptionHelp(): Array<Help>;
    prepareOptions(argParser: ArgParser, verifyOnly?: boolean): Promise<void>;
    prepareArgs(args: Array<string>): Promise<void>;
    run(): Promise<void>;
    getAddress(addressOrName: string, message?: string, allowZero?: boolean): Promise<string>;
    dump(header: string, info: any): void;
    throwUsageError(message?: string): never;
    throwError(message: string): never;
}
export declare type Options = {
    account?: boolean;
    provider?: boolean;
    transaction?: boolean;
    version?: string;
};
export declare class CLI {
    readonly defaultCommand: string;
    readonly plugins: {
        [command: string]: PluginType;
    };
    readonly standAlone: PluginType;
    readonly options: Options;
    constructor(defaultCommand?: string, options?: Options);
    static getAppName(): string;
    addPlugin(command: string, plugin: PluginType): void;
    setPlugin(plugin: PluginType): void;
    showUsage(message?: string, status?: number): never;
    run(args: Array<string>): Promise<void>;
}
export {};
//# sourceMappingURL=cli.d.ts.map