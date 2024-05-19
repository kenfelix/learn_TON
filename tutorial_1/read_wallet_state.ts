import { mnemonicToWalletKey } from '@ton/crypto';
import { fromNano, TonClient, WalletContractV4 } from '@ton/ton';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { config } from "dotenv"

config();

async function main() {
    const mnemonic = process.env.WALLET_MNEMONIC;

    if (!mnemonic) {
        throw new Error("WALLET_MNEMONIC is not set in the environment variables");
    }
    
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ workchain: 0, publicKey: key.publicKey });
    
    const endpoint = await getHttpEndpoint({ network: "testnet" });
    const client = new TonClient({ endpoint });

    const balance = await client.getBalance(wallet.address);
    console.log("balance:", fromNano(balance));

    const walletContract = client.open(wallet);
    const seqno = await walletContract.getSeqno();

    console.log("seqno:", seqno)

}

main();