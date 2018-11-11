const panda = require("../dist/index");

const server = panda.server({
    enableLogs: false
});

(async () => {
    const pandaCashCore = await server.listen({
        port: 8081,
        walletPort: 8082
    });

    console.log("Mnemonic: " + pandaCashCore.opts.mnemonic);
    console.log("Account[0] public key (bcash format): " + pandaCashCore.account.keyPairs[0].bcash.address);
    console.log("Account[0] private key (bcash format): " + pandaCashCore.account.keyPairs[0].bcash.privateKey);

    console.log("Account[0] public key (standard format): " + pandaCashCore.account.keyPairs[0].standard.address);
    console.log("Account[0] private key (standard format): " + pandaCashCore.account.keyPairs[0].standard.privateKey);
})();
