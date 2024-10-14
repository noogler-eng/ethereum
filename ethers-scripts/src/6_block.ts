import { ethers } from "ethers";

import dotenv from "dotenv";
dotenv.config();

if (!process.env.API_KEY) throw new Error("Mainnet api key is not found");
const JSON_RPC_URL = process.env.API_KEY;
const provider = new ethers.JsonRpcProvider(JSON_RPC_URL);

const main = async () => {
  try {
    const blockNo = await provider.getBlockNumber();
    const blockInfo = await provider.getBlock(blockNo);
    console.log("block info: ", blockInfo);

    const blockWithTxns = await blockInfo?.transactions;
    console.log("txns -> ", blockWithTxns);

    if (!blockWithTxns) return;
    // promise.all needs an array to return
    const txnsInfo = await Promise.all(
      blockWithTxns.slice(0, 2).map(async (txn) => {
        const txnInfo = await provider.getTransaction(txn);
        return txnInfo;
      })
    );

    console.log(txnsInfo);
  } catch (error) {
    console.log(error);
  }
};

main();

// [
//     TransactionResponse {
//       provider: JsonRpcProvider {},
//       blockNumber: 20964349,
//       blockHash: '0x144340828090ff6ccbfcd2e6b6fd9d4eb84cc0a7b9497b1017522323a8e1ebc3',
//       index: 0,
//       hash: '0xcbd80918c554904f3270136e215b42802fb3e5e11b4a50f5d7ec7f3003a99f14',
//       type: 2,
//       to: '0x3328F7f4A1D1C57c35df56bBf0c9dCAFCA309C49',
//       from: '0x0Bb454C2d4e642A5C18f1B3db4D020ba202907DF',
//       nonce: 5454,
//       gasLimit: 539721n,
//       gasPrice: 193844647267n,
//       maxPriorityFeePerGas: 151000000000n,
//       maxFeePerGas: 198844647267n,
//       maxFeePerBlobGas: null,
//       data: '0x0162e2d000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001600000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000003400000000000000000000000000000000000000000000000000000000670d282300000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000001663298588fe3b644dace6cd671a3277eba3a873',
//       value: 1000000000000000000n,
//       chainId: 1n,
//       signature: Signature { r: "0xef9888e24ef8261d05ceba2cbc56f205f39ce3ef4b290a13cefc52a61c9ae363", s: "0x61d1a04a4e2a6c1acb6f03c7376a3da9f1807935e1b2a2bc58cd4a79da8c0cc8", yParity: 1, networkV: null },
//       accessList: [],
//       blobVersionedHashes: null
//     },
//     TransactionResponse {
//       provider: JsonRpcProvider {},
//       blockNumber: 20964349,
//       blockHash: '0x144340828090ff6ccbfcd2e6b6fd9d4eb84cc0a7b9497b1017522323a8e1ebc3',
//       index: 1,
//       hash: '0x8ad34a6cf91bfe24eba5f78cd685af33c562f27175e105cf9ab70ce62f5cade1',
//       type: 2,
//       to: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
//       from: '0x192a25D7aa74a1bf15192Ae6e3170276ECED6f31',
//       nonce: 5953,
//       gasLimit: 351040n,
//       gasPrice: 120844647267n,
//       maxPriorityFeePerGas: 78000000000n,
//       maxFeePerGas: 200000000000n,
//       maxFeePerBlobGas: null,
//       data: '0xb6f9de950000000000000000000000000000000000000000000000001d2a2d553842a6520000000000000000000000000000000000000000000000000000000000000080000000000000000000000000192a25d7aa74a1bf15192ae6e3170276eced6f3100000000000000000000000000000000000000000000000000000000670d28320000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000f043c183fb63745cccf568e6bebb4da97341049',
//       value: 500000000000000000n,
//       chainId: 1n,
//       signature: Signature { r: "0x03427908468c7424f2555504e6bb8dec9791da4d0f32b2ae54b07dd4f28b01f2", s: "0x7fac0132e39c99d8c7d3b1eb19975015087a8dd3bde905e257d069df7e5cdfc4", yParity: 0, networkV: null },
//       accessList: [],
//       blobVersionedHashes: null
//     }
//   ]
