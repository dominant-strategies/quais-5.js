import { quais } from "quais";
export declare class MetamaskProvider extends quais.providers.Web3Provider {
    _pollingAccount: any;
    _pollAccountFunc: () => void;
    constructor(ethereum?: quais.providers.ExternalProvider);
    getSigner(addressOrIndex?: string | number): quais.providers.JsonRpcSigner;
    get enabled(): boolean;
    _startPollingAccount(): void;
    _stopPollingAccount(): void;
    on(eventName: quais.providers.EventType, listener: quais.providers.Listener): this;
    off(eventName: quais.providers.EventType, listener?: quais.providers.Listener): this;
}
//# sourceMappingURL=metamask-provider.d.ts.map