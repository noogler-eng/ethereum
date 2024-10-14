import { ethers, TransactionRequest, TransactionResponse } from "ethers";

import dotenv from "dotenv";
dotenv.config();

// using polygon amoy chain for transfer
if (!process.env.API_KEY_AMOY) throw new Error("API key not found!");
const JSON_RPC_URL = `${process.env.API_KEY_AMOY}`;
const provider = new ethers.JsonRpcProvider(JSON_RPC_URL);

// contains public address of accounts
const sender = "0x0db6adab06fF57252E2d6364ce6CCcC554320c9c";
const recepient = "0x402f0616C8Be9C3FA9749Fc12CAcCCAe75343DF1";

if (!process.env.PRIVATE_KEY) throw new Error("private key not found!");

// initlilizing the instance of wallet
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const main = async () => {
  let balance_address_sender = await provider.getBalance(sender);
  let balance_address_receipent = await provider.getBalance(recepient);
  console.log(
    "balance before: s ::: r ",
    ethers.formatEther(balance_address_sender),
    ethers.formatEther(balance_address_receipent)
  );

  // using our wallet for transaction
  // go to definitions for this for better understanding of which function to use
  const txnReq: TransactionRequest = {
    to: recepient,
    from: sender,
    value: ethers.parseEther("0.2"),
  };
  const tx: TransactionResponse = await wallet.sendTransaction(txnReq);
  await tx.wait();
  console.log("transaction hash: ", tx.hash);
  console.log("transaction in JSON: ", tx.toJSON());

  balance_address_sender = await provider.getBalance(sender);
  balance_address_receipent = await provider.getBalance(recepient);
  console.log(
    "balance after: s ::: r ",
    ethers.formatEther(balance_address_sender),
    ethers.formatEther(balance_address_receipent)
  );

};
main();
