const bch = require('bitcoincashjs');
const { hd, KeyRing, Address } = require('bcash');
const { HDPrivateKey } = hd;

//const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk');
//const BITBOX = new BITBOXSDK.default();

interface IPandaKeyPair {
  legacyAddress: string;
  cashAddress: string;
  privateKey: string;
}

class PandaKeyPair implements IPandaKeyPair {
    constructor(mnemonic: string, HDPath: string, network?: "regtest" | "testnet") {
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
  