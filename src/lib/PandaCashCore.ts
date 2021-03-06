const { hd, KeyRing } = require('bcash');
const bchNode = require('./bchNode');

import PandaAccount from "./PandaAccount";
import { BCH, HttpProvider } from "bchjs";
import { IAccount, IPandaKeyPair, IPandaCashCoreOpts, IPandaCashCore } from "../interfaces";

const sleep = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk');
const BITBOX = new BITBOXSDK.default();

export default class PandaCashCore implements IPandaCashCore {
  constructor(private opts: IPandaCashCoreOpts) {
    this.opts = {
      addressFormat: opts.addressFormat || "cash",
      network: opts.network || "regtest",
      mnemonic: opts.mnemonic || PandaCashCore.generateSeedMnemonic(),
      totalAccounts: opts.totalAccounts || 10,
      port: opts.port || 48332,
      walletPort: opts.walletPort || 48333,
      enableLogs: opts.enableLogs || false,
      debug: opts.debug || false,
    };

    this.bch = new BCH(
      new HttpProvider(`http://127.0.0.1:${this.opts.port}`, 'panda', 'panda'),
      new HttpProvider(`http://127.0.0.1:${this.opts.walletPort}`, 'panda', 'panda')
    ).rpc;

    this.account = new PandaAccount(this.opts.mnemonic, this.opts.totalAccounts, this.opts.network);

    this.accounts = this.account.keyPairs.map(_ => { return { address: _.cashAddress, privateKeyWIF: _.privateKey }});
  }

  public bch: any;
  public account: PandaAccount;
  public accounts: IAccount[] = [];
  public bchNode: any;

  static generateSeedMnemonic() : string {
    return BITBOX.Mnemonic.generate(128);
  }

 /**
 * We use the bcash implementation
 * http://bcoin.io/api-docs
 */
  async startNode() {
    this.stopNode();
      // delete the pandacash
    this.opts.enableLogs && console.log('Starting Bitcoin Cash blockchain');

    /**
     * Will start the bcash node
     * a) in the regtest mode
     * b) --prefix=${__dirname}/../.bcash
     */
    const nodes = await bchNode.startNode({
      debug: this.opts.debug,
      port: this.opts.port,
      walletPort: this.opts.walletPort,
      network: this.opts.network
    });

    this.bchNode = nodes.node;

    await this.nodeAvailable();

    return this.bchNode;
  }

  public stopNode() {
    delete this.bchNode;
  }

  async nodeAvailable() {
    try {
      await this.bch.getblockchaininfo();
    } catch (e) {
      await sleep(500);
      await this.nodeAvailable();
    }
  }

  async seedAccounts() {
    this.opts.enableLogs && console.log('Seeding accounts');

    for (let i = 0; i < this.account.keyPairs.length; i++) {
      await this.bch.importprivkey(this.account.keyPairs[i].privateKey);

      await this.bch.generatetoaddress(10, this.account.keyPairs[i].cashAddress);
    }

    this.opts.enableLogs && console.log('Advancing blockchain to enable spending');

    await this.bch.generatetoaddress(500, this.account.keyPairs[0].cashAddress);
  }

  displayAddress(index: number, keyPair: IPandaKeyPair) {
    const legacy = this.opts.addressFormat === "legacy" || this.opts.addressFormat === "both" ? `Legacy: ${keyPair.legacyAddress}`: '';
    const cash = this.opts.addressFormat === "cash" || this.opts.addressFormat === "both" ? `Cash: ${keyPair.cashAddress}`: '';

    console.log(`      (${index}) ${legacy}${legacy && cash ? " | " : ""}${cash}`);
  }

  printPandaMessage(detailedVersion: string) {
    console.log(`
      ${detailedVersion}

      Available Accounts
      ==================`);

    this.account.keyPairs
    .forEach((keyPair, index) => this.displayAddress(index, keyPair));

    console.log(`
      Private Keys
      ==================`);

    this.account.keyPairs.forEach((keyPair, i) => {
      console.log(`      (${i}) ${keyPair.privateKey}`);
    });

    console.log(`
      HD Wallet
      ==================
      Mnemonic:      ${this.opts.mnemonic}
      Base HD Path:  ${PandaAccount.HDPath}{account_index}

      Network: ${this.opts.network}
      ==================
      Bitcoin Cash Node Listening on http://localhost:${this.opts.port}
      Bitcoin Cash Wallet Listening on http://localhost:${this.opts.walletPort}
    `);
    /**
     * BITBOX API running at http://localhost:3000/v1/
     * BITBOX API Docs running at http://localhost:3000/
     */
  }
}
