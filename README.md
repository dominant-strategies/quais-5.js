The Quais Project
==================

[![npm (tag)](https://img.shields.io/npm/v/quais)](https://www.npmjs.com/package/quais)
[![Node.js CI](https://github.com/dominant-strategies/quais.js/actions/workflows/nodejs.yml/badge.svg)](https://github.com/dominant-strategies/quais.js/actions/workflows/nodejs.yml)

A complete Quai wallet implementation and utilities in JavaScript (and TypeScript). Quais is a downstream fork of Ethers v5.7.2.

**Features:**
IMPORTANT: These features are in beta and may not be 1:1 compatible with Quai Network as it stands.

- Keep your private keys in your client, **safe** and sound
- Import and export **JSON wallets** (Geth, Parity and crowdsale)
- Import and export BIP 39 **mnemonic phrases** (12 word backup phrases) and **HD Wallets** (English as well as Czech, French, Italian, Japanese, Korean, Simplified Chinese, Spanish, Traditional Chinese)
- Meta-classes create JavaScript objects from any contract ABI, including **ABIv2** and **Human-Readable ABI**
- Connect to Ethereum nodes over [JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC), [INFURA](https://infura.io), [Etherscan](https://etherscan.io), [Alchemy](https://alchemyapi.io), [Ankr](https://ankr.com) or [MetaMask](https://metamask.io)
- **QNS names** are first-class citizens; they can be used anywhere an Quai addresses can be used. QNS names are in progress.
- **Tiny** (~104kb compressed; 322kb uncompressed)
- **Modular** packages; include only what you need
- **Complete** functionality for all your Quai desires
- Extensive [documentation](https://docs.ethers.io/v5/)
- Large collection of **test cases** which are maintained and added to
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
/home/ricmoo/some_project> npm install --save quais
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
- [Various Ethereum Articles](https://blog.ricmoo.com/)

Ancillary Packages
------------------

These are a number of packages not included in the umbrella `ethers` npm package, and
additional packages are always being added. Often these packages are for specific
use-cases, so rather than adding them to the umbrella package, they are added as
ancillary packages, which can be included by those who need them, while not bloating
everyone else with packages they do not need.

We will keep a list of useful packages here.

- `@quais/experimental` ([documentation](https://docs.ethers.io/v5/api/experimental/))
- `@quais/cli` ([documentation](https://docs.ethers.io/v5/cli/))
- `@quais/hardware-wallets` ([documentation](https://docs.ethers.io/v5/api/other/hardware/))


License
-------

MIT License (including **all** dependencies).

