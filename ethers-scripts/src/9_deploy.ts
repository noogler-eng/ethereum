const { ethers } = require("ethers");

import dotenv from "dotenv";
dotenv.config();

// taking an mainnet ethereum
if (!process.env.API_KEY) throw new Error("Mainnet api key is not found");
const JSON_RPC_URL = process.env.API_KEY;
const provider = new ethers.JsonRpcProvider(JSON_RPC_URL);

const main = async () => {
  // first way of deploying the contract using hardhat
  const contract = await ethers.getContractFactory("contractName");
  // constructor_arg are given here
  const deployedContract = await contract.deploy('constructor_arg');
  console.log(`Contract Deployed to ${deployedContract.target}`);

  // second way of deploying a contract
  // intializing wallet so that we could sign any transaction
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // on compilation we will get bytecode and abi
  const bytecode = "";
  const abi: [] = [];
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  // way to send ether to the contract at time of deployement
  // check for pareint here ....
  await factory.deploy(parseInt("10"));
  const info = await factory.getDeployTransaction();
  console.log(info);
};
main();