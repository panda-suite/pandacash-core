const assert = require("assert");
const PandaAccount = require("../dist/lib/PandaAccount").default;

describe('PandaAccount', () => {
    it('creates account from mnemonic', function () {
        const noOfkeyPairs = 10;
        const mnemonic = "evil sudden oven discover exist approve can catalog farm ivory mom rug";
        const account = new PandaAccount(mnemonic, noOfkeyPairs, "regtest");

        assert.strictEqual(account.keyPairs.length, noOfkeyPairs);
        assert.strictEqual(account.keyPairs[0].bcash.address, "bchreg:qqmqn5nwce5fatsjc6nxdh7utpr7ytc6xqyvrdhxva");
        assert.strictEqual(account.keyPairs[0].bcash.privateKey, "cSzzswqYm1SzFyuAEt7noN9EzLQPNDkLf7oYLKdVpi4yL1yv735q");
        assert.strictEqual(account.keyPairs[0].standard.address, "mkSgYrhAAFbDewExCbdmgC8jiRY4wP7CWn");
        // assert.strictEqual(account.keyPairs[0].standard.privateKey, "a1afb2b6a8272737ce5fae809c5f0859865934c9ffaccced8e1cf5149608e435");
    });
});
