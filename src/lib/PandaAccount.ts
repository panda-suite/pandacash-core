const bch = require('bitcoincashjs');
const { hd, KeyRing } = require('bcash');
const { HDPrivateKey } = hd;

interface IKeypair {
  address: string;
  privateKey: string;
}

class PandaKeyPair {
    constructor(mnemonic: string, HDPath: string) {
        const privateKey = HDPrivateKey.fromPhrase(mnemonic);

        const deriveSomething = privateKey.derivePath(HDPath);
        const ring = KeyRing.fromPrivate(deriveSomething.privateKey);

        this.bcash = {
          address: ring.getAddress('string', 'regtest'),
          privateKey: ring.toSecret('regtest')
        };

        /*
         * testnet and regtest have the same prefixes in bitcoincashjs! 
         */
        const bchPrivateKey = new bch.PrivateKey(ring.getPrivateKey('hex'), "testnet");

        this.standard = {
          address: bchPrivateKey.toAddress().toString(),
          privateKey: bchPrivateKey.toString()
        };
    }

    public bcash: IKeypair;
    public standard: IKeypair;
}

export default class PandaAccount {
    constructor(private mnemonic: string, private totalKeyPairs: number) {
      this.keyPairs = this.generateSeedKeyPairs(mnemonic, totalKeyPairs);
    }
  
    public keyPairs: PandaKeyPair[] = [];
   
    static get HDPath() {
      return "m/44'/1/0/0/";
    }
  
    private generateSeedKeyPairs(mnemonic: string, totalAccounts: number): PandaKeyPair[] {
      const keyPairs: PandaKeyPair[] = [];

      for (var index = 0; index < totalAccounts; index++) {
        const keyPair: PandaKeyPair = new PandaKeyPair(mnemonic, PandaAccount.HDPath + index);
  
        keyPairs.push(keyPair);
      }
  
      return keyPairs;
    }
  }
  