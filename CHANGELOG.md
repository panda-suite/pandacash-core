# pandacash-core Release Notes & Changelog

## v0.3.0
* :hammer: Combined BCH node provider and wallet provider into a single bchjs instance, per bchjs version 0.1.0-alpha.3.
* :bug: Normalised bcash address/private key notations, so they work with other libraries.
* :sparkles: Added `pandaCashCore.stopNode()` function
* :hammer: Now stops the running bcash client when trying to start a new one.

## v0.2.0
* :hammer: Refactored account generation into a PandaAccount class.
* :sparkles: PandaCashCore `server.listen()` now returns a Promise, in addition to having a callback function.
* :rotating_light: Added basic tests for connection and PandaAccount.
* :books: Added several example scripts under the `examples/` folder.

## v0.1.0
* :tada: Extracted `pandacash-core` from `pandacash-cli`.

## Earlier Changelog for pandacash-cli:

### v0.4.1
* :art: Separated Wallet RPC from regular node RPC, and replaced internal RPC API with bchjs.
* :fire: Removed `seedAccounts` parameter.
* :bug: Fixed a bug where generated accounts were not working with bcash.

### v0.4.0
* :sparkles: Enabled pandacash to be imported as a node module into other projects.
* :fire: Removed rest.bitcoin.com API functionality for now.

### v0.3.0
* :boom: Moved node implementation from a Bitcoin-ABC docker image to nodeJS based node implementation bcash.

### v0.2.1
* :bug: Fixed REST API breaking because rest.bitcoin.com updated, and locked the version of this dependency to 1.10.0
* :whale: Changed Dockerfile source image to node:8
* :zap: Added logging of options when debug flag is enabled.

### v0.2.0
* :books: Added documentation section for troubleshooting.
* :hammer: Refactored docker commands in code to be more dynamic.
* :sparkles: Added the following command line options:
  * `-a` or `--accounts`: Specify the number of accounts to generate at startup.
  * `-m` or `--mnemonic`: bip39 mnemonic phrase for generating a PRNG seed, which is in turn used for hierarchical deterministic (HD) account generation.
  * `--debug`: Show debug output from the bitcoin node.

### v0.1.1
* :bug: Fixed a bug where the REST API would not start up.

### v0.1.0
* :tada: Initial release, finished hackathon build.
