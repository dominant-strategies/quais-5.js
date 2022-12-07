import { quais } from "quais";
export declare class BrainWallet extends quais.Wallet {
    static _generate(username: quais.Bytes | string, password: quais.Bytes | string, legacy: boolean, progressCallback?: quais.utils.ProgressCallback): Promise<BrainWallet>;
    static generate(username: quais.Bytes | string, password: quais.Bytes | string, progressCallback?: quais.utils.ProgressCallback): Promise<BrainWallet>;
    static generateLegacy(username: quais.Bytes | string, password: quais.Bytes | string, progressCallback?: quais.utils.ProgressCallback): Promise<BrainWallet>;
}
//# sourceMappingURL=brain-wallet.d.ts.map