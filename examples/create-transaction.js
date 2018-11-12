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
    const unspentTxs = await pandaCashCore.walletNodeRPC.listunspent(0, 20, [ pandaCashCore.account.keyPairs[0].cashAddress ]);

    const _utxo = unspentTxs[0];

    const utxo = {
        'txId' : _utxo.txid,
        'outputIndex' : _utxo.vout,
        'address' : pandaCashCore.account.keyPairs[0].cashAddress,
        'script' : _utxo.scriptPubKey,
        'satoshis' : _utxo.amount * 1000000
    };

    bch.Networks.enableRegtest();

    const privateKey = new bch.PrivateKey(pandaCashCore.account.keyPairs[0].privateKey, "regtest");
    console.log(pandaCashCore.account.keyPairs[0].legacyAddress);
    const transaction = new bch.Transaction()
      .from(utxo)
      .to(pandaCashCore.account.keyPairs[0].legacyAddress, 15000)
      .sign(privateKey);
    
    console.log(transaction.toString()) // 01000000018689302ea03ef...

    /**
    const transactionBuilder = new BITBOX.TransactionBuilder("regtest");

    const satoshisToSend = 1000 // <--- This is where you set the amount to send.
    const originalAmount = utxo.satoshis
  
    // add input with txid and index of vout
    transactionBuilder.addInput(utxo.txid, utxo.vout)

    // amount to send back to the sending address.
    // It's the original amount - 1 sat/byte for tx size
    const remainder = originalAmount - satoshisToSend - 0.00001;

    console.log(pandaCashCore.account.keyPairs[0].cash);

    // add output w/ address and amount to send
    transactionBuilder.addOutput(pandaCashCore.account.keyPairs[0].cash.address, remainder);
    transactionBuilder.addOutput(pandaCashCore.account.keyPairs[1].cash.address, satoshisToSend);
    
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
         */
    process.exit();
})();
