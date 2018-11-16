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

const pandaCashCore = await server.listen({
    port: 48332,
    walletPort: 48334
});

console.log("Mnemonic: " + pandaCashCore.opts.mnemonic);
console.log("Account[0] public key (cash format): " + pandaCashCore.account.keyPairs[0].cashAddress);
console.log("Account[0] public key (legacy format): " + pandaCashCore.account.keyPairs[0].legacyAddress);
console.log("Account[0] private key: " + pandaCashCore.account.keyPairs[0].privateKey);
```

**In Jasmine/Mocha tests**
```js
const panda = require("pandacash-core")

beforeAll(done => {
  const server = panda.server({
    enableLogs: false,
    debug: false
  })

  (async () => {
    try {
      await server.listen({
        port: 48332
        walletPort: 48334
      });
    } catch (err) {
      return done(err);
    }

    done();
  })();
});
```

## Pandacash and bch.js
[bch.js](https://www.npmjs.com/package/bchjs) is a lightweight RPC client for Bitcoin Cash. Panda is fully integrated with `bchjs`. An instance of the library is exposed under `pandacashCore.bch`.

### RPC Calls
```javascript
const panda = require("pandacash-core");

const server = panda.server();

const pandacashCore = await server.listen({ port: 48334, walletPort: 48335 });

const blockchainInfo = await pandacashCore.bch.getblockchaininfo();

console.log(blockchainInfo);
```

### Creating a test transaction
```javascript
const pandaCashCore = await server.listen({
    port: 8081,
    walletPort: 8082
});

// bch rpc works only with the bcash format!
// find full documentation here: https://www.npmjs.com/package/bchjs
const unspentTxs = await pandaCashCore.bch.listunspent(0, 20, [ pandaCashCore.account.keyPairs[0].cashAddress ]);

const _utxo = unspentTxs[0];
console.log(_utxo);
/*
    {
        txid: 'a5872579aec7e509f17461e19d3d94c52ef29eceb2ba2116e6c5db164d3d0a57',
        vout: 0,
        address: 'bchreg:qzhv7vkn72wd5egeum0su9jjkjzv6q70zg83rchfz5',
        account: 'default',
        scriptPubKey: '76a914aecf32d3f29cda6519e6df0e1652b484cd03cf1288ac',
        amount: 25,
        confirmations: 20,
        spendable: true,
        solvable: true
    }
*/

const utxo = {
    'txId' : _utxo.txid,
    'outputIndex' : _utxo.vout,
    'address' : pandaCashCore.account.keyPairs[0].legacyAddress,
    'script' : _utxo.scriptPubKey,
    'satoshis' : _utxo.amount * 1000000
};

bch.Networks.enableRegtest();

const privateKey = new bch.PrivateKey(pandaCashCore.account.keyPairs[0].privateKey, "regtest");

const transaction = new bch.Transaction()
  .from(utxo)
  .to(pandaCashCore.account.keyPairs[0].legacyAddress, 15000)
  .sign(privateKey);

console.log(transaction.toString());
```

## Under the hood
Pandacash is powered by the bcash implementation of Bitcoin Cash.
<img src="https://raw.githubusercontent.com/panda-suite/panda-suite.github.io/master/bcoin-logo-gradient-text.png" alt="bcash / bcoin blockchain" width="200">

# Licence
Copyright 2018 Panda Suite

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
