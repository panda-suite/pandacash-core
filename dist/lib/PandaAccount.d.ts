interface IPandaKeyPair {
    legacyAddress: string;
    cashAddress: string;
    privateKey: string;
}
declare class PandaKeyPair implements IPandaKeyPair {
    constructor(mnemonic: string, HDPath: string, network?: "regtest" | "testnet");
    cashAddress: string;
    legacyAddress: string;
    privateKey: string;
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
