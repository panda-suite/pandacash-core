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

    const unspentTxs = await pandaCashCore.walletNodeRPC.listunspent(0, 1, [ pandaCashCore.account.keyPairs[1].bcash.address ]);

    console.log(unspentTxs);

    process.exit();
})();
