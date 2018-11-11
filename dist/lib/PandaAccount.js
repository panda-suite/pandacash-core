"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bch = require('bitcoincashjs');
var _a = require('bcash'), hd = _a.hd, KeyRing = _a.KeyRing;
var HDPrivateKey = hd.HDPrivateKey;
var PandaKeyPair = /** @class */ (function () {
    function PandaKeyPair(mnemonic, HDPath) {
        var privateKey = HDPrivateKey.fromPhrase(mnemonic);
        var deriveSomething = privateKey.derivePath(HDPath);
        var ring = KeyRing.fromPrivate(deriveSomething.privateKey);
        this.bcash = {
            address: ring.getAddress('string', 'regtest'),
            privateKey: ring.toSecret('regtest')
        };
        /*
         * testnet and regtest have the same prefixes in bitcoincashjs!
         */
        var bchPrivateKey = new bch.PrivateKey(ring.getPrivateKey('hex'), "testnet");
        this.standard = {
            address: bchPrivateKey.toAddress().toString(),
            privateKey: bchPrivateKey.toString()
        };
    }
    return PandaKeyPair;
}());
var PandaAccount = /** @class */ (function () {
    function PandaAccount(mnemonic, totalKeyPairs) {
        this.mnemonic = mnemonic;
        this.totalKeyPairs = totalKeyPairs;
        this.keyPairs = [];
        this.keyPairs = this.generateSeedKeyPairs(mnemonic, totalKeyPairs);
    }
    Object.defineProperty(PandaAccount, "HDPath", {
        get: function () {
            return "m/44'/1/0/0/";
        },
        enumerable: true,
        configurable: true
    });
    PandaAccount.prototype.generateSeedKeyPairs = function (mnemonic, totalAccounts) {
        var keyPairs = [];
        for (var index = 0; index < totalAccounts; index++) {
            var keyPair = new PandaKeyPair(mnemonic, PandaAccount.HDPath + index);
            keyPairs.push(keyPair);
        }
        return keyPairs;
    };
    return PandaAccount;
}());
exports.default = PandaAccount;
