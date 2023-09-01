"use strict";
// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js
import * as quais from "./quais";
try {
    const anyGlobal = window;
    if (anyGlobal._quais == null) {
        anyGlobal._quais = quais;
    }
}
catch (error) { }
export { quais };
export { Signer, Wallet, VoidSigner, getDefaultProvider, providers, BaseContract, Contract, ContractFactory, BigNumber, FixedNumber, constants, errors, logger, utils, wordlists, 
////////////////////////
// Compile-Time Constants
version, Wordlist } from "./quais";
//# sourceMappingURL=index.js.map