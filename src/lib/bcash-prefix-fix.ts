/**
 * START Monkey patching for different prefixes!
 */
export const fixPrefixes = (bcash: any) => {
    /**
     * Original:
        main.keyPrefix = {
            privkey: 0x80,
            xpubkey: 0x0488b21e,
            xprivkey: 0x0488ade4,
            xpubkey58: 'xpub',
            xprivkey58: 'xprv',
            coinType: 0
        };

        main.addressPrefix = {
            pubkeyhash: 0x00,
            scripthash: 0x05,
            cashaddr: 'bitcoincash'
        };
    */
    bcash.networks.regtest.keyPrefix = {
        privkey: 0xef,
        xpubkey: 0x043587cf,
        xprivkey: 0x04358394,
        xpubkey58: 'tpub',
        xprivkey58: 'tprv',
        coinType: 1
    };

    bcash.networks.regtest.addressPrefix = {
        pubkeyhash: 0x6f,
        scripthash: 0xc4,
        cashaddr: 'bchreg'
    };
}