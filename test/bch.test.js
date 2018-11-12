const assert = require("assert");
const panda = require("../dist/index");

describe('RPC', () => {
    it('get balance', async function () {
        this.timeout(6000);

        const server = panda.server({
            seedAccounts: false,
            enableLogs: false
        });

        const pandaCashCore = await server.listen({
            port: 9081,
            walletPort: 9082
        });

        const balance = await pandaCashCore.bch.getbalance();

        assert.equal(typeof balance, "number");
    });
});
