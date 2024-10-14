/// importing ethers library here
const { ethers } = require("ethers");

import dotenv from "dotenv";
dotenv.config();

// taking an mainnet ethereum
if (!process.env.API_KEY) throw new Error("Mainnet api key is not found");
const JSON_RPC_URL = process.env.API_KEY;
const provider = new ethers.JsonRpcProvider(JSON_RPC_URL);

const main = async () => {
  const network = await provider.getNetwork();
  console.log(`\n ${network} \n`);
  console.log(network);

  const block = await provider.getBlock();
  console.log(`\n ${block} \n`);

  const gasPrice = await provider.getGasPrice();
  console.log(`\n ${gasPrice} \n`);
  console.log(gasPrice);

  const feeData = await provider.getFeeData();
  console.log(`\n ${feeData} \n`);
  console.log(feeData);

//   const txhash = "";
//   const transaction = await provider.getTransaction(txhash);
//   const transactionReciept = await provider.getTransactionReceipt(txhash);
//   console.log(transaction);
//   console.log(transactionReciept);
};

main();