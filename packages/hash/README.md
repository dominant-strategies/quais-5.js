Etheruem Hash Utilities
=======================

This sub-module is part of the [quais project](https://github.com/quais-io/quais.js).

It contains several common hashing utilities (but not the actual hash functions).

For more information, see the [documentation](https://docs.ethers.io/v5/api/utils/hashing/).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/quais),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    isValidName,
    namehash,

    id,

    messagePrefix,
    hashMessage

} = require("@quais/hash");
```


License
-------

MIT License
