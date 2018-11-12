import PandaCashCore from './lib/PandaCashCore';
import { IPandaCashCoreOpts, IPandaServerOpts, IPandaServer } from "./interfaces";

const pkg = require('../package.json');

const detailedVersion = `Pandacash CLI v${pkg.version}`;

const _listen = async (opts: IPandaCashCoreOpts, cb: (err: any, panda: PandaCashCore) => void): Promise<PandaCashCore> => {
  const pandaCashCore = new PandaCashCore(opts);

  await pandaCashCore.startNode();

  await pandaCashCore.seedAccounts();

  if (opts.enableLogs) {
    pandaCashCore.printPandaMessage(detailedVersion);
  }

  if (cb) {
    cb(undefined, pandaCashCore);
  }

  return Promise.resolve(pandaCashCore);
};

/**
 * Interface inspired by ganache-cli
 */
export const server = (opts: IPandaServerOpts) : IPandaServer => {
  return {
    listen: async (portOpts, cb): Promise<PandaCashCore> => {
      if (typeof portOpts === "number") {
        opts.port = portOpts;
      } else {
        opts.port = portOpts.port;
        opts.walletPort = portOpts.walletPort;
      }

      return _listen(opts, cb);
    }
  }
};

