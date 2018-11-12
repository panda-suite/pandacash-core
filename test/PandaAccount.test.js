const assert = require("assert");
const PandaAccount = require("../dist/lib/PandaAccount").default;

describe('PandaAccount', () => {
    it('creates account from mnemonic', function () {
        const noOfkeyPairs = 10;
        const mnemonic = "evil sudden oven discover exist approve can catalog farm ivory mom rug";
        const account = new PandaAccount(mnemonic, noOfkeyPairs, "regtest");

        assert.strictEqual(account.keyPairs.length, noOfkeyPairs);
        assert.strictEqual(account.keyPairs[0].cashAddress, "bchreg:qqmqn5nwce5fatsjc6nxdh7utpr7ytc6xqyvrdhxva");
        assert.strictEqual(account.keyPairs[0].privateKey, "cSzzswqYm1SzFyuAEt7noN9EzLQPNDkLf7oYLKdVpi4yL1yv735q");
        assert.strictEqual(account.keyPairs[0].legacyAddress, "mkSgYrhAAFbDewExCbdmgC8jiRY4wP7CWn");
    });
});
