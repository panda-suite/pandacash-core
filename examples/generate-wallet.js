const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk');
const BITBOX = new BITBOXSDK.default();


const mnemonic = "fringe demise grab turkey retreat shy genuine alone pass social cable enhance";

// create root seed buffer
let rootSeedBuffer = BITBOX.Mnemonic.toSeed(mnemonic);

// create master hd node
let masterHDNode = BITBOX.HDNode.fromSeed(rootSeedBuffer, "regtest");

let HDPath = `m/44'/145'/0/0`

let accounts = [];

for (let i = 0; i < 2; i++) {
    // create accounts
    let childNode = masterHDNode.derivePath(`${HDPath}/${i}'`);
    let external = childNode.derivePath("0")
    let internal = childNode.derivePath("1")
    childNode.addresses = BITBOX.HDNode.createAccount([external, internal]);

    const keys = {
        address: BITBOX.HDNode.toCashAddress(childNode),
        privateKey: BITBOX.HDNode.toWIF(childNode)
    };

    console.log(keys);

    accounts.push(childNode);
};
