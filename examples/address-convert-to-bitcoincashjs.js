const bch = require('bitcoincashjs');
const panda = require("../dist/index");
const { hd, KeyRing } = require('bcash');

const server = panda.server({
    mnemonic: "evil sudden oven discover exist approve can catalog farm ivory mom rug",
    seedAccounts: true,
    enableLogs: false,
    debug: false
});


(async () => {
    const pandaCashCore = await server.listen({
        port: 8081,
        walletPort: 8082
    });
    
    /**BCASH FORMAT */
    console.log(pandaCashCore.accounts[0]);
    /*
        {
            address: 'bchreg:qqmqn5nwce5fatsjc6nxdh7utpr7ytc6xqyvrdhxva',
            privateKeyWIF: 'EQc3gu9Wg6wW4svhqbJjBS3fubUBysM2QHz7xe1PfQmvNhPv2jXT'
        }
    */

    const ring = KeyRing.fromSecret(pandaCashCore.accounts[0].privateKeyWIF, 'regtest');
  
    // regtest and test net are the same!
    const privateKey = new bch.PrivateKey(ring.getPrivateKey('hex'), "testnet");
    const address = privateKey.toAddress().toString();
    
    /** BITCOINCASHJS FORMAT */
    console.log(address);
    // mkSgYrhAAFbDewExCbdmgC8jiRY4wP7CWn

    console.log(privateKey);
    // <PrivateKey: a1afb2b6a8272737ce5fae809c5f0859865934c9ffaccced8e1cf5149608e435, network: testnet>

    process.exit();
})();
