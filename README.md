# Pandacash Core

This is the core code that powers the Pandacash application and the the Pandacash command line tool - [`pandacash-cli`](https://github.com/panda-suite/pandacash-cli).

## Prerequisites
To run `pandacash-cli`, make sure that [Node.js](https://nodejs.org/) is installed.
On macOS these tools can be installed through [Homebrew](https://brew.sh/).
```bash
brew install node
```

## Installation
```bash
npm install pandacash-core
```

## Usage

**As a general HTTP server**
```js
const panda = require("pandacash-core");

const server = panda.server({
    // optional, will be generated if not provider
    mnemonic: "cigar magnet ocean purchase travel damp snack alone theme budget wagon wrong",
    // default: 10
    totalAccounts: 10,
    // will log in the console
    enableLogs: true,
    // will show logs from the bch node
    debug: false
});

server.listen({
  port: 48332
  walletPort: 48334
}, (err, pandaCashCore) => {
    if (err) {
        return console.error(err);
    }

    console.log("Mnemonic: " + pandaCashCore.opts.mnemonic);
    console.log("Account[0] public key: " + pandaCashCore.accounts[0].address);
    console.log("Account[0] private key: " + pandaCashCore.accounts[0].privateKeyWIF);
});
```

**In Jasmine/Mocha tests**
```js
const panda = require("pandacash-core")

beforeAll(done => {
  const server = panda.server({
    enableLogs: false,
    debug: false
  })

  server.listen(48332, (err, pandaCashCore) => {
    if (err) done(err);

    done()
  })
});
```

## Pandacash and bch.js
[`bch.js`](https://github.com/panda-suite/bchjs) can be added to your application or tests, and be used accordingly. It can be configured to connect to any node such as the pandacash local blockchain.

```javascript
const panda = require("pandacash-core");
const { Web3BCH, HttpProvider } = require('bchjs');

const server = panda.server();

server.listen({ port: 48334, walletPort: 48335 }, (err) => {
    const web3bchNode = new Web3BCH(new HttpProvider('http://localhost:48334'));
    const web3bchWallet = new Web3BCH(new HttpProvider('http://localhost:48335'));

    await web3bchNode.rpc.getblockchaininfo();
});
```

## Under the hood
PandaCash consists of the following components:
* bcash implementation of bitcoin cash node in regtest mode
  * Doesn't sync with other Bitcoin nodes, and immediately creates new blocks on every transaction.
* Prefunded addresses
  * 10 addresses with 62.5 spendable BCH each, generated from a random mnemonic.

# Licence
Copyright 2018 Panda Suite

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
