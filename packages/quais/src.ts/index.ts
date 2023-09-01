"use strict";

// To modify this file, you must update ./misc/admin/lib/cmds/update-exports.js

import * as quais from "./quais";

try {
    const anyGlobal = (window as any);

    if (anyGlobal._quais == null) {
        anyGlobal._quais = quais;
    }
} catch (error) { }

export { quais };

export {
    Signer,

    Wallet,
    VoidSigner,

    getDefaultProvider,
    providers,

    BaseContract,
    Contract,
    ContractFactory,

    BigNumber,
    FixedNumber,

    constants,
    errors,

    logger,

    utils,

    wordlists,


    ////////////////////////
    // Compile-Time Constants

    version,


    ////////////////////////
    // Types

    ContractFunction,
    ContractReceipt,
    ContractTransaction,
    Event,
    EventFilter,

    Overrides,
    PayableOverrides,
    CallOverrides,

    PopulatedTransaction,

    ContractInterface,

    TypedDataDomain,
    TypedDataField,

    BigNumberish,

    Bytes,
    BytesLike,

    Signature,

    Transaction,
    UnsignedTransaction,

    Wordlist
} from "./quais";
