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
    const unspentTxs = await pandaCashCore.walletNodeRPC.listunspent(0, 20, [ pandaCashCore.account.keyPairs[0].cashAddress ]);

    const _utxo = unspentTxs[0];

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
    
    //console.log(transaction.toString());
    const decoded = await pandaCashCore.nodeRPC.decoderawtransaction(transaction.toString());

    const receipt = await pandaCashCore.nodeRPC.sendrawtransaction(transaction.toString());

    await pandaCashCore.nodeRPC.generate(10);
    
    process.exit();
})();
