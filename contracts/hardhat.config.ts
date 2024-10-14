import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.PRIVATE_KEY) throw new Error("Unable to Fecth PRIVATE_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    amoy: {
      url: 'https://rpc-amoy.polygon.technology/',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  // etherscan: {
  //   apiKey: POLYGONSCAN_API,
  // },
};

export default config;
