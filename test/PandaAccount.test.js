const assert = require("assert");
const PandaAccount = require("../dist/lib/PandaAccount").default;

describe('PandaAccount', () => {
    it('creates account from mnemonic', function () {
        const noOfkeyPairs = 10;
        const mnemonic = "evil sudden oven discover exist approve can catalog farm ivory mom rug";
        const account = new PandaAccount(mnemonic, noOfkeyPairs, "regtest");

        assert.strictEqual(account.keyPairs.length, noOfkeyPairs);
        assert.strictEqual(account.keyPairs[0].bcash.address, "bchreg:qqmqn5nwce5fatsjc6nxdh7utpr7ytc6xqyvrdhxva");
        assert.strictEqual(account.keyPairs[0].bcash.privateKey, "EQc3gu9Wg6wW4svhqbJjBS3fubUBysM2QHz7xe1PfQmvNhPv2jXT");
        assert.strictEqual(account.keyPairs[0].standard.address, "RECvLKVTx3xXwq8XxCeWwoFcchPxgaZJym");
        // assert.strictEqual(account.keyPairs[0].standard.privateKey, "a1afb2b6a8272737ce5fae809c5f0859865934c9ffaccced8e1cf5149608e435");
    });
});
