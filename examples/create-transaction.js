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

    // rpc work only with the bcash format!
    const unspentTxs = await pandaCashCore.walletNodeRPC.listunspent(0, 20, [ pandaCashCore.account.keyPairs[0].bcash.address ]);

    const _utxo = unspentTxs[0];

    const utxo = {
        'txId' : _utxo.txid,
        'outputIndex' : 0,
        'address' : pandaCashCore.account.keyPairs[0].standard.address,
        'script' : _utxo.scriptPubKey,
        'satoshis' : 50000
    };

    // bitcoincashjs works only with the standard format!
    const transaction = new bch.Transaction()
        .from(utxo)
        .to(pandaCashCore.account.keyPairs[1].standard.address, 15000)
        .sign(pandaCashCore.account.keyPairs[0].standard.privateKey);

    console.log(transaction);

    process.exit();
})();
