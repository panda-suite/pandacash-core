interface IKeypair {
    address: string;
    privateKey: string;
}
declare class PandaKeyPair {
    constructor(mnemonic: string, HDPath: string);
    bcash: IKeypair;
    standard: IKeypair;
}
export default class PandaAccount {
    private mnemonic;
    private totalKeyPairs;
    constructor(mnemonic: string, totalKeyPairs: number);
    keyPairs: PandaKeyPair[];
    static readonly HDPath: string;
    private generateSeedKeyPairs;
}
export {};
