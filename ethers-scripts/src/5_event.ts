import { ethers } from "ethers";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.API_KEY) throw new Error("Mainnet api key is not found");
const JSON_RPC_URL = process.env.API_KEY;
const provider = new ethers.JsonRpcProvider(JSON_RPC_URL);

if (!process.env.PRIVATE_KEY) throw new Error("private key is not found");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// mainnet deployed address
const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const abi = [
  "function name() view returns (string)",
  "event Transfer(address indexed from , address indexed to , uint amount)",
];

// we are only in read mode
const contrat = new ethers.Contract(address, abi, provider);

const main = async () => {
  const block = await provider.getBlockNumber();
  const name = await contrat.name();
  console.log('token name: ',name);

  // it requires the name of the event and the range of BlockNo between which logged events are to be fetched
  // @params event name, fromBlock, toBlock
  const transferEvent = await contrat.queryFilter("Transfer", block-1, block);
  console.log(transferEvent);

  

};
main();


// output 
// token name:  Dai Stablecoin
// [
//   EventLog {
//     provider: JsonRpcProvider {},
//     transactionHash: '0xcbd769ba9ceea5aea9982a115e1271b7a872bfe6456011f4859a4e7d2a6b9a7a',
//     blockHash: '0x29f1fd6d65b2ef82a6805e5e64dba0e1acc184fe9b16b493f33f85d2e5c295c4',
//     blockNumber: 20964231,
//     removed: false,
//     address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
//     data: '0x000000000000000000000000000000000000000000000040ec1aebb21e30e400',
//     topics: [
//       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//       '0x000000000000000000000000124ce7d5df4ff74e96ac4d520cdab7983e20a521',
//       '0x0000000000000000000000002a5e9fe832da87b80a7465501744709685386314'
//     ],
//     index: 441,
//     transactionIndex: 112,
//     interface: Interface {
//       fragments: [Array],
//       deploy: [ConstructorFragment],
//       fallback: null,
//       receive: false
//     },
//     fragment: EventFragment {
//       type: 'event',
//       inputs: [Array],
//       name: 'Transfer',
//       anonymous: false
//     },
//     args: Result(3) [
//       '0x124Ce7d5dF4FF74E96ac4d520cDaB7983e20A521',
//       '0x2a5e9fE832DA87b80A7465501744709685386314',
//       1197604790410000000000n
//     ]
//   },
//   EventLog {
//     provider: JsonRpcProvider {},
//     transactionHash: '0xef168ecfd3f38f9194c9fd3f5c32427bae0a53a5e8527c110a9f0b5b3906d1c8',
//     blockHash: '0x29f1fd6d65b2ef82a6805e5e64dba0e1acc184fe9b16b493f33f85d2e5c295c4',
//     blockNumber: 20964231,
//     removed: false,
//     address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
//     data: '0x00000000000000000000000000000000000000000000000ad78ebc5ac6200000',
//     topics: [
//       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//       '0x0000000000000000000000003969128699bfee510261cf836ef1a2976ede6ddc',
//       '0x000000000000000000000000cdd37ada79f589c15bd4f8fd2083dc88e34a2af2'
//     ],
//     index: 478,
//     transactionIndex: 136,
//     interface: Interface {
//       fragments: [Array],
//       deploy: [ConstructorFragment],
//       fallback: null,
//       receive: false
//     },
//     fragment: EventFragment {
//       type: 'event',
//       inputs: [Array],
//       name: 'Transfer',
//       anonymous: false
//     },
//     args: Result(3) [
//       '0x3969128699bFee510261CF836Ef1a2976Ede6DDc',
//       '0xcDd37Ada79F589c15bD4f8fD2083dc88E34A2af2',
//       200000000000000000000n
//     ]
//   }
// ]