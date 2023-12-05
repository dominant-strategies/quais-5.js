The Quais Project
==================

[![npm (tag)](https://img.shields.io/npm/v/quais)](https://www.npmjs.com/package/quais)
[![Node.js CI](https://github.com/dominant-strategies/quais-5.js/actions/workflows/nodejs.yml/badge.svg)](https://github.com/dominant-strategies/quais-5.js/actions/workflows/nodejs.yml)

A complete Quai wallet implementation and utilities in JavaScript (and TypeScript). Quais is a downstream fork of Ethers v5.7.2.

**Features:**
IMPORTANT: These features are in beta and may not be 1:1 compatible with Quai Network as it stands.

- Keep your private keys in your client, **safe** and sound
- Import and export BIP 39 **mnemonic phrases** (12 word backup phrases) and **HD Wallets** (English as well as Czech, French, Italian, Japanese, Korean, Simplified Chinese, Spanish, Traditional Chinese)
- Meta-classes create JavaScript objects from any contract ABI, including **ABIv2** and **Human-Readable ABI**
- Connect to Quai nodes over [JSON-RPC](https://qu.ai/docs/develop/apis/json-rpc-api/) or [Pelagus](https://pelaguswallet.io)
- General overview of package functionality can be found in the Quai Network Javascript API [docs](https://qu.ai/docs/develop/apis/javascript-apis/)
- **QNS** functionality is under development
- **Tiny** (~104kb compressed; 322kb uncompressed)
- **Modular** packages; include only what you need
- **Complete** functionality for all your Quai desires
- Documentation based on: [ethers-v5](https://docs.ethers.io/v5/). Quai specific documentation is under development
- Large collection of **test cases** which are maintained and added to
- Fully **TypeScript** ready, with definition files and full TypeScript source
- **MIT License** (including ALL dependencies); completely open source to do with as you please


Keep Updated
------------

For the latest news and advisories, please follow the
[@quainetwork](https://twitter.com/quainetwork) on Twitter (low-traffic,
non-marketing, important information only) as well as watch this GitHub project.

For the latest changes, see the
[CHANGELOG](https://github.com/dominant-strategies/quais-5.js/blob/master/CHANGELOG.md).


Installing
----------

**node.js**

```
/home/ricmoo/some_project> npm install --save quais
```

**browser (ESM)**

```
<script type="module">
    import { quais } from "quais";
</script>
```


Documentation
-------------

Browse the [ethers based documentation](https://docs.ethers.io/v5/) online:

- [Getting Started](https://docs.ethers.io/v5/getting-started/)
- [Full API Documentation](https://docs.ethers.io/v5/api/)

Ancillary Packages
------------------
**Polling Disabled in Quais:** In an effort to optimize performance, polling has been disabled in the Quais project. For users who require polling functionality, the `quais-polling` npm package is available. This package acts as a shim, reintroducing polling capabilities in a manner that is easy to integrate for those who need it. You can find more information and installation instructions for `quais-polling` in the [package repository](https://www.npmjs.com/package/quais-polling)

License
-------

MIT License (including **all** dependencies).

