const bch = require('bitcoincashjs');
const { hd, KeyRing, Address } = require('bcash');
const { HDPrivateKey } = hd;

const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk');
const BITBOX = new BITBOXSDK.default();

interface IKeypair {
  address: string;
  privateKey: string;
}

class PandaKeyPair {
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

        // bcash
        const privateKey = HDPrivateKey.fromPhrase(mnemonic);

        const deriveSomething = privateKey.derivePath(HDPath);
        const ring = KeyRing.fromPrivate(deriveSomething.privateKey);

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
    
    public legacy: IKeypair;
    public cash: IKeypair;
    public bcash: IKeypair;
    public standard: IKeypair;

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
  