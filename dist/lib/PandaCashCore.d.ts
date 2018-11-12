import PandaAccount from "./PandaAccount";
import { IAccount, IPandaCashCoreOpts, IPandaCashCore } from "../interfaces";
export default class PandaCashCore implements IPandaCashCore {
    private opts;
    constructor(opts: IPandaCashCoreOpts);
    nodeRPC: any;
    walletNodeRPC: any;
    account: PandaAccount;
    accounts: IAccount[];
    bchNode: any;
    static generateSeedMnemonic(): string;
    /**
    * We use the bcash implementation
    * http://bcoin.io/api-docs
    */
    startNode(): Promise<any>;
    nodeAvailable(): Promise<void>;
    seedAccounts(): Promise<void>;
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
    printPandaMessage(detailedVersion: string): void;
}
