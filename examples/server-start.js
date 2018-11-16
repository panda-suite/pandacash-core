const panda = require("../dist/index");

const server = panda.server({
    enableLogs: true,
    addressFormat: "legacy",
    debug: false
});

(async () => {
    const pandaCashCore = await server.listen({
        port: 8081,
        walletPort: 8082
    });

    console.log("Mnemonic: " + pandaCashCore.opts.mnemonic);
    console.log("Account[0] public key (cash format): " + pandaCashCore.account.keyPairs[0].cashAddress);
    console.log("Account[0] public key (legacy format): " + pandaCashCore.account.keyPairs[0].legacyAddress);
    console.log("Account[0] private key: " + pandaCashCore.account.keyPairs[0].privateKey);
})();
