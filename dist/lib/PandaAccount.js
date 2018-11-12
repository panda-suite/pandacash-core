"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bch = require('bitcoincashjs');
var _a = require('bcash'), hd = _a.hd, KeyRing = _a.KeyRing, Address = _a.Address;
var HDPrivateKey = hd.HDPrivateKey;
var BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk');
var BITBOX = new BITBOXSDK.default();
var PandaKeyPair = /** @class */ (function () {
    function PandaKeyPair(mnemonic, HDPath, network) {
        network = "regtest";
        // cash
        /**
        const rootSeed = BITBOX.Mnemonic.toSeed(mnemonic)
        
        const masterHDNode = BITBOX.HDNode.fromSeed(rootSeed, "regtest")
        const childNode = masterHDNode.derivePath(`${HDPath}`)
       
        this.bcash = this.cash = {
          address: BITBOX.HDNode.toCashAddress(childNode),
          privateKey: BITBOX.HDNode.toWIF(childNode)
        };
         
        console.log(this.bcash);
        */
        // bcash
        var privateKey = HDPrivateKey.fromPhrase(mnemonic);
        var deriveSomething = privateKey.derivePath(HDPath);
        var ring = KeyRing.fromPrivate(deriveSomething.privateKey);
        this.cash = this.bcash = {
            address: ring.getAddress('string', network),
            privateKey: ring.toSecret(network)
        };
        this.legacy = this.standard = {
            address: PandaKeyPair.convertToLegacyAddress(this.bcash.address, network),
            privateKey: ring.toSecret(network)
        };
        // console.log(Address.fromCashAddr(this.bcash.address, "regtest").toBase58("regtest"));
        // const legAdd = Address.fromCashAddr(this.bcash.address, "regtest").toBase58("regtest");
        // console.log(Address.fromBase58(legAdd, "regtest").toCashAddr("testnet"))
        // console.log("BCASH", this.bcash);
        // console.log("CASH", this.cash);
        /*
         * testnet and regtest have the same prefixes in bitcoincashjs!
        
      
        const bchPrivateKey = new bch.PrivateKey(ring.getPrivateKey('hex'), "testnet");

        this.standard = {
          address: bchPrivateKey.toAddress().toString(),
          privateKey: bchPrivateKey.toString()
        };
 */
    }
    PandaKeyPair.convertToCashAddress = function (legacyAddress, network) {
        return Address.fromBase58(legacyAddress, network).toCashAddr(network);
    };
    PandaKeyPair.convertToLegacyAddress = function (cashAddress, network) {
        return Address.fromCashAddr(cashAddress, network).toBase58(network);
    };
    return PandaKeyPair;
}());
var PandaAccount = /** @class */ (function () {
    function PandaAccount(mnemonic, totalKeyPairs, network) {
        this.mnemonic = mnemonic;
        this.totalKeyPairs = totalKeyPairs;
        this.network = network;
        this.keyPairs = [];
        this.keyPairs = this.generateSeedKeyPairs(mnemonic, totalKeyPairs, network);
    }
    Object.defineProperty(PandaAccount, "HDPath", {
        get: function () {
            return "m/44'/1/0/0/";
            //return "m/44'/145'/1/0/";
        },
        enumerable: true,
        configurable: true
    });
    PandaAccount.prototype.generateSeedKeyPairs = function (mnemonic, totalAccounts, network) {
        var keyPairs = [];
        for (var index = 0; index < totalAccounts; index++) {
            var keyPair = new PandaKeyPair(mnemonic, PandaAccount.HDPath + index, network);
            keyPairs.push(keyPair);
        }
        return keyPairs;
    };
    return PandaAccount;
}());
exports.default = PandaAccount;
