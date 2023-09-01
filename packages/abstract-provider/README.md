Abstract Provider
=================

This sub-module is part of the [quais project](https://github.com/quais-io/quais.js).

It is responsible for defining the common interface for a Provider, which in
quais differs quite substantially from Web3.js.

A Provider is an abstraction of non-account-based operations on a blockchain and
is generally not directly involved in signing transaction or data.

For signing, see the [Abstract Signer](https://www.npmjs.com/package/@quais/abstract-signer)
or [Wallet](https://www.npmjs.com/package/@quais/wallet) sub-modules.

For more information, see the [documentation](https://docs.ethers.io/v5/api/providers/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/quais),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    Provider,

    ForkEvent,
    BlockForkEvent,
    TransactionForkEvent,
    TransactionOrderForkEvent,

    // Types
    BlockTag,

    Block,
    BlockWithTransactions,

    TransactionRequest,
    TransactionResponse,
    TransactionReceipt,

    Log,
    EventFilter,

    Filter,
    FilterByBlockHash,

    EventType,
    Listener

} = require("@quais/abstract-provider");
```

License
-------

MIT License
