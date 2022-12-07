The Ethers Project
==================

[![npm (tag)](https://img.shields.io/npm/v/quais)](https://www.npmjs.com/package/quais)
[![Node.js CI](https://github.com/quais-io/quais.js/workflows/Node.js%20CI/badge.svg?branch=quais-v5-beta)](https://github.com/quais-io/quais.js/actions?query=workflow%3A%22Node.js+CI%22)

A complete Ethereum wallet implementation and utilities in JavaScript (and TypeScript).

**Features:**

- Keep your private keys in your client, **safe** and sound
- Import and export **JSON wallets** (Geth, Parity and crowdsale)
- Import and export BIP 39 **mnemonic phrases** (12 word backup phrases) and **HD Wallets** (English as well as Czech, French, Italian, Japanese, Korean, Simplified Chinese, Spanish, Traditional Chinese)
- Meta-classes create JavaScript objects from any contract ABI, including **ABIv2** and **Human-Readable ABI**
- Connect to Ethereum nodes over [JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC), [INFURA](https://infura.io), [Etherscan](https://etherscan.io), [Alchemy](https://alchemyapi.io) or [MetaMask](https://metamask.io)
- **ENS names** are first-class citizens; they can be used anywhere an Ethereum addresses can be used
- **Tiny** (~104kb compressed; 322kb uncompressed)
- **Modular** packages; include only what you need
- **Complete** functionality for all your Ethereum desires
- Extensive [documentation](https://docs.quais.io/v5/)
- Large collection of **test cases** which are maintained and added to
- Fully **TypeScript** ready, with definition files and full TypeScript source
- **MIT License** (including ALL dependencies); completely open source to do with as you please


Keep Updated
------------

For the latest news and advisories, please follow the [@quais](https://twitter.com/quaisproject)
on Twitter (low-traffic, non-marketing, important information only) as well as watch this GitHub project.

For the latest changes, see the [CHANGELOG](https://github.com/quais-io/quais.js/blob/master/CHANGELOG.md).


Installing
----------

**node.js**

```
/home/ricmoo/some_project> npm install --save quais
```

**browser (UMD)**

```
<script src="https://cdn.quais.io/lib/quais-5.0.umd.min.js" type="text/javascript">
</script>
```

**browser (ESM)**

```
<script type="module">
    import { quais } from "https://cdn.quais.io/lib/quais-5.0.umd.min.js";
</script>
```


Documentation
-------------

Browse the [documentation](https://docs.quais.io/v5/) online:

- [Getting Started](https://docs.quais.io/v5/getting-started/)
- [Full API Documentation](https://docs.quais.io/v5/api/)
- [Various Ethereum Articles](https://blog.ricmoo.com/)

Or browse the entire documentation as a [single page](https://docs.quais.io/v5/single-page/) to make searching easier.


Ancillary Packages
------------------

These are a number of packages not included in the umbrella `quais` npm package, and
additional packages are always being added. Often these packages are for specific
use-cases, so rather than adding them to the umbrella package, they are added as
ancillary packages, which can be included by those who need them, while not bloating
everyone else with packages they do not need.

We will keep a list of useful packages here.

- `@quais/experimental` ([documentation](https://docs.quais.io))
- `@quais/cli` ([documentation](https://docs.quais.io))
- `@quais/hardware-wallets` ([documentation](https://docs.quais.io))


Sponsors
--------

Support the quais project by [becoming a sponsor](https://quais.org/sponsoring.html).
Get your logo added below with a link to your website (Gold and Unobtainium tiers)
and on the [quais.org](https://quais.org) website.

Huge thanks to our sponsors! `<3 <3`

<a href="https://quais.org/sponsors/tally-link" target="_blank"><img src="https://quais.org/sponsors/tally-readme.svg"></a>


License
-------

MIT License (including **all** dependencies).

