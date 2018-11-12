const assert = require("assert");
const panda = require("../dist/index");

describe('index', () => {
    it('starts a server', async function () {
        this.timeout(6000);

        const server = panda.server({
            seedAccounts: false,
            enableLogs: false
        });

        const pandaCashCore = await server.listen({
            port: 9081,
            walletPort: 9082
        });

        assert.equal(!!pandaCashCore.accounts, true);
        assert.equal(!!pandaCashCore.bch, true);
    });
});
