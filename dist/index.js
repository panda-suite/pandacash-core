"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PandaCashCore_1 = require("./lib/PandaCashCore");
var pkg = require('../package.json');
var detailedVersion = "Pandacash CLI v" + pkg.version;
var _listen = function (opts, cb) {
    var pandaCashCore = new PandaCashCore_1.default(opts);
    pandaCashCore.startNode()
        .then(function () { return pandaCashCore.seedAccounts(); })
        .then(function () {
        if (opts.enableLogs) {
            pandaCashCore.printPandaMessage(detailedVersion);
        }
        cb && cb(undefined, pandaCashCore);
    });
};
/**
 * Interface inspired by ganache-cli
 */
exports.server = function (opts) {
    return {
        listen: function (portOpts, cb) {
            if (typeof portOpts === "number") {
                opts.port = portOpts;
            }
            else {
                opts.port = portOpts.port;
                opts.walletPort = portOpts.walletPort;
            }
            _listen(opts, cb);
        }
    };
};
