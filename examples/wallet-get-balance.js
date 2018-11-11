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

    const balance = await pandaCashCore.walletNodeRPC.getbalance();

    console.log(balance);

    process.exit();
})();
