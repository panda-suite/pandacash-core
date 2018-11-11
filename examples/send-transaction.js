const bch = require('bitcoincashjs');
const panda = require("../dist/index");
const { hd, KeyRing } = require('bcash');

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
    
    const balance = await pandaCashCore.walletNodeRPC.getbalance();
    
    const ring = KeyRing.fromSecret(pandaCashCore.accounts[0].privateKeyWIF, 'regtest');

    // regtest and test net are the same!
    const privateKey = new bch.PrivateKey(ring.getPrivateKey('hex'), "testnet");
    const address = (new bch.PrivateKey(ring.getPrivateKey('hex'), "testnet")).toAddress().toString();
    
    console.log(address);
    console.log(privateKey);
    console.log(balance);

    const utxo = {
        'txId' : _utxo.txid,
        'outputIndex' : 0,
        'address' : address,
        'script' : _utxo.scriptPubKey,
        'satoshis' : 50000
    };

    const transaction = new bch.Transaction()
        .from(utxo)
        .to(address, 15000)
        .sign(privateKey);
    
    try {
        const a = await pandaCashCore.walletNodeRPC.listunspent(0, 20, [ pandaCashCore.accounts[0].address ]);
        console.log(a);
    } catch (err) {
        console.error(err);
    }
    

    console.log(transaction);

    // console.log(txid);

    process.exit();
})();
