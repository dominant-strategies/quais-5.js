Ethereum Wallet
===============

This sub-module is part of the [quais project](https://github.com/quais-io/quais.js).

It contains the class to manage a private key and signing for a standard
externally-owned account.

For more information, see the [documentation](https://docs.ethers.io/v5/api/signer/#Wallet).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/quais),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    Wallet,

    verifyMessage

} = require("@quais/wallet");
```


License
-------

MIT License
