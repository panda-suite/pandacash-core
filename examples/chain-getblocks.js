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

    const bestblockhash = await pandaCashCore.bch.getbestblockhash();

    console.log(bestblockhash);

    let lastHash = await pandaCashCore.bch.getbestblockhash();

    const blocks = [];

    while (lastHash) {
        const block = await pandaCashCore.bch.getblock(lastHash);

        blocks.push(block);

        lastHash = block.previousblockhash;
    }

    console.log(blocks);

    process.exit();
})();
