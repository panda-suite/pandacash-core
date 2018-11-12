const bch = require('bitcoincashjs');
const panda = require("../dist/index");

const server = panda.server({
    seedAccounts: true,
    enableLogs: false,
    debug: false
});

(async () => {
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

    process.exit();
})();
