Ethereum (and ilk) Network Definitions
======================================

This sub-module is part of the [quais project](https://github.com/quais-io/quais.js).

It is responsible for tracking common networks along with important
parameters for each.

For more information, see the [documentation](https://docs.ethers.io/v5/api/providers/types/#providers-Network).

Importing
---------

Most users will prefer to use the [umbrella package](https://www.npmjs.com/package/quais),
but for those with more specific needs, individual components can be imported.

```javascript
const {

    getNetwork,

    // Types

    Network,
    Networkish

} = require("@quais/networks");
```


License
-------

MIT License
