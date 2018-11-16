export interface IPandaCashCoreOpts {
    addressFormat: "cash" | "legacy" | "both";
    network: "testnet" | "regtest";
    mnemonic: string;
    totalAccounts: number;
    port: number;
    walletPort: number;
    enableLogs: boolean;
    debug: boolean;
}

export interface IPandaCashCore {}
  
export interface IAccount {
    address: string;
    privateKeyWIF: string;
}

export interface IPandaKeyPair {
    legacyAddress: string;
    cashAddress: string;
    privateKey: string;
}
export interface IPandaServerOpts extends IPandaCashCoreOpts {}

export interface IPandaServerPorts {
    walletPort: number;
    port: number;
}
export interface IPandaServer {
    listen: (ports: IPandaServerPorts, cb: (err: any, panda: IPandaCashCore) => void) => void
}
