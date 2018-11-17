const bch = require('bitcoincashjs');
const { hd, KeyRing, Address } = require('bcash');
const { HDPrivateKey } = hd;
import { IPandaKeyPair } from "../interfaces";

class PandaKeyPair implements IPandaKeyPair {
    constructor(mnemonic: string, HDPath: string, network?: "regtest" | "testnet") {
        network = "regtest";

        const privateKey = HDPrivateKey.fromPhrase(mnemonic);

        const deriveSomething = privateKey.derivePath(HDPath);
        const ring = KeyRing.fromPrivate(deriveSomething.privateKey);

        this.cashAddress = ring.getAddress('string', network);
        this.legacyAddress = PandaKeyPair.convertToLegacyAddress(this.cashAddress, network);
        this.privateKey = ring.toSecret(network);
    }
    
    public cashAddress: string;
    public legacyAddress: string;
    public privateKey: string;

    static convertToCashAddress(legacyAddress: string, network?: "regtest" | "testnet") {
      return Address.fromBase58(legacyAddress, network).toCashAddr(network)
    }
   
    static convertToLegacyAddress(cashAddress: string, network?: "regtest" | "testnet") {
      return Address.fromCashAddr(cashAddress, network).toBase58(network)
    }
}

export default class PandaAccount {
    constructor(private mnemonic: string, private totalKeyPairs: number, private network: "regtest" | "testnet") {
      this.keyPairs = this.generateSeedKeyPairs(mnemonic, totalKeyPairs, network);
    }

    public keyPairs: PandaKeyPair[] = [];

    static get HDPath() {
      return "m/44'/1/0/0/";
      //return "m/44'/145'/1/0/";
    }

    private generateSeedKeyPairs(mnemonic: string, totalAccounts: number, network: "regtest" | "testnet"): PandaKeyPair[] {
      const keyPairs: PandaKeyPair[] = [];

      for (var index = 0; index < totalAccounts; index++) {
        const keyPair: PandaKeyPair = new PandaKeyPair(mnemonic, PandaAccount.HDPath + index, network);
  
        keyPairs.push(keyPair);
      }
  
      return keyPairs;
    }
  }
  