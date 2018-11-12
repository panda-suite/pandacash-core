interface IKeypair {
    address: string;
    privateKey: string;
}
declare class PandaKeyPair {
    constructor(mnemonic: string, HDPath: string, network?: "regtest" | "testnet");
    legacy: IKeypair;
    cash: IKeypair;
    bcash: IKeypair;
    standard: IKeypair;
    static convertToCashAddress(legacyAddress: string, network?: "regtest" | "testnet"): any;
    static convertToLegacyAddress(cashAddress: string, network?: "regtest" | "testnet"): any;
}
export default class PandaAccount {
    private mnemonic;
    private totalKeyPairs;
    private network;
    constructor(mnemonic: string, totalKeyPairs: number, network: "regtest" | "testnet");
    keyPairs: PandaKeyPair[];
    static readonly HDPath: string;
    private generateSeedKeyPairs;
}
export {};
