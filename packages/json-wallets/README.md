Secret Storage JSON Wallet Utilities
====================================

This sub-module is part of the [quais project](https://github.com/quais-io/quais.js).

It is responsible for encoding, decoding, encrypting and decrypting JSON wallet
formats.

For more information, see the [documentation](https://docs.ethers.io/v5/api/utils/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/quais),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    isCrowdsaleWallet,
    decryptCrowdsale,

    isKeystoreWallet,
    decryptKeystore,
    decryptKeystoreSync,
    encryptKeystore,

    getJsonWalletAddress,

    decryptJsonWallet,
    decryptJsonWalletSync,

    // Types

    ProgressCallback,

    EncryptOptions

} = require("@quais/json-wallets");
```


License
-------

MIT License
