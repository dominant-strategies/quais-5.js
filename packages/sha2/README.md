SHA2 Hash Functions
===================

This sub-module is part of the [quais project](https://github.com/quais-io/quais.js).

It is responsible for common cryptographic hashes and HMAC.

For more information, see the [documentation](https://docs.ethers.io/v5/api/utils/hashing/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/quais),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    ripemd160,

    sha256,
    sha512,

    computeHmac,

    // Enums

    SupportedAlgorithm

} = require("@quais/sha2");
```


License
-------

MIT License
