import PandaAccount from "./PandaAccount";
import { IAccount, IPandaCashCoreOpts, IPandaCashCore } from "../interfaces";
export default class PandaCashCore implements IPandaCashCore {
    private opts;
    constructor(opts: IPandaCashCoreOpts);
    bch: any;
    account: PandaAccount;
    accounts: IAccount[];
    bchNode: any;
    static generateSeedMnemonic(): string;
    /**
    * We use the bcash implementation
    * http://bcoin.io/api-docs
    */
    startNode(): Promise<any>;
    stopNode(): void;
    nodeAvailable(): Promise<void>;
    seedAccounts(): Promise<void>;
    printPandaMessage(detailedVersion: string): void;
}
