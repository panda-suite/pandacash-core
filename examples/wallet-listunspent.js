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

    console.log(unspentTxs);

    process.exit();
})();
