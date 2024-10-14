import { ethers } from "ethers";

// url is an api to connect with ethereum-node to out local machine
const JSON_RPC_URL = "https://rpc-amoy.polygon.technology/";
const provider = new ethers.JsonRpcProvider(JSON_RPC_URL);

// address for which the balance will be fetched
const address = "0x0db6adab06fF57252E2d6364ce6CCcC554320c9c";
const main = async () => {
  try {
    const balance = await provider.getBalance(address);
    const balanceInEther = await ethers.formatEther(balance);
    console.log("balanceInEther: ", balanceInEther);

    // getting the total number of transaction happend on this account
    const noOfTxn = await provider.getTransactionCount(address);
    console.log("noOfTxn: ", noOfTxn);
  } catch (error) {
    console.log(error);
  }
};

main();
