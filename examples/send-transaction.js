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
    
    const unspentTxs = await pandaCashCore.walletNodeRPC.listunspent(0, 20, [ pandaCashCore.accounts[0].address ]);
    
    const _utxo = unspentTxs[0];
    
    const privateKey = new bch.PrivateKey(pandaCashCore.accounts[0].privateKeyWIF, "regtest");

    const utxo = {
        'txId' : _utxo.txId,
        'outputIndex' : 0,
        'address' : _utxo.address,
        'script' : _utxo.scriptPubKey,
        'satoshis' : 50000
    };

    const transaction = new bch.Transaction()
        .from(utxo)
        .to(pandaCashCore.accounts[1].address, 15000)
        .sign(privateKey);

    console.log(transaction);

    process.exit();
})();
