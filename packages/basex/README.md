Base-X
======

This sub-module is part of the [quais project](https://github.com/quais-io/quais.js).

It is responsible for encoding and decoding vinary data in arbitrary bases, but
is primarily for Base58 encoding which is used for various blockchain data.

For more information, see the [documentation](https://docs.ethers.io/v5/api/utils/encoding/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/quais),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    BaseX,

    Base32,
    Base58

} = require("@quais/basex");
```

License
-------

MIT License
