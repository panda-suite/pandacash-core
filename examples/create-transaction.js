const bch = require('bitcoincashjs');
const panda = require("../dist/index");

const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk');
const BITBOX = new BITBOXSDK.default();

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
        'txid' : _utxo.txid,
        'vout' : _utxo.vout,
        'address' : pandaCashCore.account.keyPairs[0].bcash.address,
        'script' : _utxo.scriptPubKey,
        'satoshis' : _utxo.amount * 1000000
    };

    const transactionBuilder = new BITBOX.TransactionBuilder("regtest");

    const satoshisToSend = 1000 // <--- This is where you set the amount to send.
    const originalAmount = utxo.satoshis
  
    // add input with txid and index of vout
    transactionBuilder.addInput(utxo.txid, utxo.vout)

    // amount to send back to the sending address.
    // It's the original amount - 1 sat/byte for tx size
    const remainder = originalAmount - satoshisToSend - 0.00001;

    console.log(pandaCashCore.account.keyPairs[0].bcash);

    // add output w/ address and amount to send
    transactionBuilder.addOutput(pandaCashCore.account.keyPairs[0].bcash.address, remainder);
    transactionBuilder.addOutput(pandaCashCore.account.keyPairs[1].bcash.address, satoshisToSend);
    
    transactionBuilder.sign(
        0,
        keyPair,
        redeemScript,
        transactionBuilder.hashTypes.SIGHASH_ALL,
        originalAmount
    )

    // build tx
    const tx = transactionBuilder.build();
    // output rawhex
    const hex = tx.toHex()

    console.log(hex);

    process.exit();
})();
