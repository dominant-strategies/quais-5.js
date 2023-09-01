Big Numbers
===========

This sub-module is part of the [quais project](https://github.com/quais-io/quais.js).

It is responsible for handling arbitrarily large numbers and mathematic operations.

For more information, see the documentation for [Big Numbers](https://docs.ethers.io/v5/api/utils/bignumber/)
and [Fixed-Point Numbers](https://docs.ethers.io/v5/api/utils/fixednumber/).


Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/quais),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    BigNumber,

    FixedFormat,
    FixedNumber,

    formatFixed,

    parseFixed

    // Types

    BigNumberish

} = require("@quais/bignumber");
```


License
-------

MIT License
