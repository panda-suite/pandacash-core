import PandaCashCore from './lib/PandaCashCore';
import { IAccount, IPandaCashCoreOpts, IPandaCashCore, IPandaServerOpts, IPandaServer } from "./interfaces";

const pkg = require('../package.json');

const detailedVersion = `Pandacash CLI v${pkg.version}`;

const _listen = (opts: IPandaCashCoreOpts, cb: (err: any, panda: PandaCashCore) => void) => {
  const pandaCashCore = new PandaCashCore(opts);

  pandaCashCore.startNode()
  .then(() => pandaCashCore.seedAccounts())
  .then(() => {
    if (opts.enableLogs) {
      pandaCashCore.printPandaMessage(detailedVersion);
    }

    cb && cb(undefined, pandaCashCore);
  })
};

/**
 * Interface inspired by ganache-cli
 */
export const server = (opts: IPandaServerOpts) : IPandaServer => {
  return {
    listen: (portOpts, cb) => {
      if (typeof portOpts === "number") {
        opts.port = portOpts;
      } else {
        opts.port = portOpts.port;
        opts.walletPort = portOpts.walletPort;
      }

      _listen(opts, cb);
    }
  }
};

