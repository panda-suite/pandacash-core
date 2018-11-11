"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('bcash'), hd = _a.hd, KeyRing = _a.KeyRing;
var bchNode = require('./bchNode');
var PandaAccount_1 = require("./PandaAccount");
var bchjs_1 = require("bchjs");
var sleep = function (ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
};
var BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk');
var BITBOX = new BITBOXSDK.default();
var PandaCashCore = /** @class */ (function () {
    function PandaCashCore(opts) {
        this.opts = opts;
        this.accounts = [];
        this.opts = {
            mnemonic: opts.mnemonic || PandaCashCore.generateSeedMnemonic(),
            totalAccounts: opts.totalAccounts || 10,
            port: opts.port || 48332,
            walletPort: opts.walletPort || 48333,
            enableLogs: opts.enableLogs || false,
            debug: opts.debug || false,
        };
        this.nodeRPC = (new bchjs_1.Web3BCH(new bchjs_1.HttpProvider("http://127.0.0.1:" + this.opts.port, 'regtest', 'regtest'))).rpc;
        this.walletNodeRPC = (new bchjs_1.Web3BCH(new bchjs_1.HttpProvider("http://127.0.0.1:" + this.opts.walletPort, 'regtest', 'regtest'))).rpc;
        this.account = new PandaAccount_1.default(this.opts.mnemonic, this.opts.totalAccounts);
        this.accounts = PandaCashCore.generateSeedKeyPairs(this.opts.mnemonic, this.opts.totalAccounts);
    }
    Object.defineProperty(PandaCashCore, "HDPath", {
        get: function () {
            return "m/44'/1/0/0/";
        },
        enumerable: true,
        configurable: true
    });
    PandaCashCore.generateSeedKeyPairs = function (mnemonic, totalAccounts) {
        var accounts = [];
        var HDPrivateKey = hd.HDPrivateKey;
        var privateKey = HDPrivateKey.fromPhrase(mnemonic);
        for (var index = 0; index < totalAccounts; index++) {
            var deriveSomething = privateKey.derivePath(PandaCashCore.HDPath + index);
            var ring = KeyRing.fromPrivate(deriveSomething.privateKey);
            var account = {
                address: ring.getAddress('string', 'regtest'),
                privateKeyWIF: ring.toSecret('regtest')
            };
            accounts.push(account);
        }
        return accounts;
    };
    PandaCashCore.generateSeedMnemonic = function () {
        return BITBOX.Mnemonic.generate(128);
    };
    /**
    * We use the bcash implementation
    * http://bcoin.io/api-docs
    */
    PandaCashCore.prototype.startNode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nodes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // delete the pandacash
                        this.opts.enableLogs && console.log('Starting Bitcoin Cash blockchain');
                        nodes = bchNode.startNode({
                            debug: this.opts.debug,
                            port: this.opts.port,
                            walletPort: this.opts.walletPort
                        });
                        this.bchNode = nodes.node;
                        return [4 /*yield*/, this.nodeAvailable()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.bchNode];
                }
            });
        });
    };
    PandaCashCore.prototype.nodeAvailable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 5]);
                        return [4 /*yield*/, this.nodeRPC.getblockchaininfo()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        e_1 = _a.sent();
                        return [4 /*yield*/, sleep(500)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.nodeAvailable()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PandaCashCore.prototype.seedAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.opts.enableLogs && console.log('Seeding accounts');
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.accounts.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.walletNodeRPC.importprivkey(this.accounts[i].privateKeyWIF)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.nodeRPC.generatetoaddress(10, this.accounts[i].address)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5:
                        this.opts.enableLogs && console.log('Advancing blockchain to enable spending');
                        return [4 /*yield*/, this.nodeRPC.generatetoaddress(500, this.accounts[0].address)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Starts the wrapper around the RPC commands
     * We currently use the Bitbox implementation.
    async function startApi() {
      console.log('Starting BITBOX API at port 3000');
  
      const commands = [
        "BITCOINCOM_BASEURL=http://localhost:3000/api/",
        `RPC_BASEURL=http://localhost:${NODE_PORT}/`,
        "RPC_PASSWORD=regtest",
        "RPC_USERNAME=regtest",
        "ZEROMQ_PORT=0",
        "ZEROMQ_URL=0",
        "NETWORK=local",
        `node ${REST_APP}`
      ];
  
      await exec(commands.join(" "));
    }
    */
    PandaCashCore.prototype.printPandaMessage = function (detailedVersion) {
        console.log("\n      " + detailedVersion + "\n\n      Available Accounts\n      ==================");
        this.accounts.forEach(function (keyPair, i) {
            console.log("      (" + i + ") " + keyPair.address);
        });
        console.log("\n      Private Keys\n      ==================");
        this.accounts.forEach(function (keyPair, i) {
            console.log("      (" + i + ") " + keyPair.privateKeyWIF);
        });
        console.log("\n      HD Wallet\n      ==================\n      Mnemonic:      " + this.opts.mnemonic + "\n      Base HD Path:  " + PandaCashCore.HDPath + "{account_index}\n\n      Bitcoin Cash Node Listening on http://localhost:" + this.opts.port + "\n      Bitcoin Cash Wallet Listening on http://localhost:" + this.opts.walletPort + "\n    ");
        /**
         * BITBOX API running at http://localhost:3000/v1/
         * BITBOX API Docs running at http://localhost:3000/
         */
    };
    return PandaCashCore;
}());
exports.default = PandaCashCore;
