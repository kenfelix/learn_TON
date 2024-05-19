import { mnemonicToWalletKey } from '@ton/crypto';
import { WalletContractV4 } from '@ton/ton';
import { config } from "dotenv"

config();

async function main() {
    const mnemonic = process.env.WALLET_MNEMONIC;

    if (!mnemonic) {
        throw new Error("WALLET_MNEMONIC is not set in the environment variables");
    }
    
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ workchain: 0, publicKey: key.publicKey });
    
    console.log(wallet.address.toString({ testOnly: true }));
    console.log("workchain:", wallet.address.workChain);

}

main();