The Quais Project
==================

[![npm (tag)](https://img.shields.io/npm/v/quais)](https://www.npmjs.com/package/quais)
[![Node.js CI](https://github.com/dominant-strategies/quais.js/actions/workflows/nodejs.yml/badge.svg)](https://github.com/dominant-strategies/quais.js/actions/workflows/nodejs.yml)

A complete Quai wallet implementation and utilities in JavaScript (and TypeScript). Quais is a downstream fork of Ethers v5.7.2. This fork included various Quai related features such as grinding contract addresses and receiving full Quai Network header data.

**Features:**
IMPORTANT: These features are in beta and may not be 1:1 compatible with Quai Network as it stands.

- Keep your private keys in your client, **safe** and sound
- Import and export **JSON wallets** (Geth, Parity and crowdsale)
- Import and export BIP 39 **mnemonic phrases** (12 word backup phrases) and **HD Wallets** (English as well as Czech, French, Italian, Japanese, Korean, Simplified Chinese, Spanish, Traditional Chinese)
- Meta-classes create JavaScript objects from any contract ABI, including **ABIv2** and **Human-Readable ABI**
- Connect to Quai nodes over [JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC)
- **QNS names** are first-class citizens; they can be used anywhere an Quai addresses can be used. QNS names are in progress.
- **Tiny** (~104kb compressed; 322kb uncompressed)
- **Modular** packages; include only what you need
- **Complete** functionality for all your Quai desires
- Starting [documentation](https://docs.ethers.io/v5/) based on Ethers
- Fully **TypeScript** ready, with definition files and full TypeScript source
- **MIT License** (including ALL dependencies); completely open source to do with as you please


Keep Updated
------------

For the latest news and advisories, please follow the
[@quainetwork](https://twitter.com/quainetwork) on Twitter (low-traffic,
non-marketing, important information only) as well as watch this GitHub project.

For the latest changes, see the
[CHANGELOG](https://github.com/dominant-strategies/quais.js/blob/master/CHANGELOG.md).


Installing
----------

**node.js**

```
/home/user/some-project> npm install --save quais
```

**browser (UMD)**

```
<script src="https://cdn.quais.io/lib/quais-1.0.4.umd.min.js" type="text/javascript">
</script>
```

**browser (ESM)**

```
<script type="module">
    import { quais } from "https://cdn.quais.io/lib/quais-1.0.4.esm.min.js";
</script>
```


Documentation
-------------

Browse the [documentation](https://docs.ethers.io/v5/) online:

- [Getting Started](https://docs.ethers.io/v5/getting-started/)
- [Full API Documentation](https://docs.ethers.io/v5/api/)

Ancillary Packages
------------------

These are a number of packages not included in the umbrella `quais` package in a similar fashion
to `ethers`. These ethers packages are useful for cli interface and hardware wallet support.
While there are not direct modifications for Quai Network in these packages yet, there may
be in the future. Hence our reasoning to fork the non-standard packages that live outside of
`ethers` as well.

- `@quais/experimental` ([documentation](https://docs.ethers.io/v5/api/experimental/))
- `@quais/cli` ([documentation](https://docs.ethers.io/v5/cli/))
- `@quais/hardware-wallets` ([documentation](https://docs.ethers.io/v5/api/other/hardware/))


License
-------

MIT License (including **all** dependencies).

