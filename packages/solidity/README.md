Solidity Packed-Encoding Utilities
==================================

This sub-module is part of the [quais project](https://github.com/quais-io/quais.js).

It contains functions to perform Solidity-specific packed (i.e. non-standard)
encoding operations.

For more information, see the [documentation](https://docs.ethers.io/v5/api/utils/hashing/#utils--solidity-hashing).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/quais),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    pack,
    keccak256,
    sha256

} = require("@quais/solidity");
```


License
-------

MIT License
