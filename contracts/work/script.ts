import hre from "hardhat";
import abi from "./abi";

const main = async()=>{

    if(!process.env.PRIVATE_KEY) return;
    const provider = new hre.ethers.JsonRpcProvider('https://rpc-amoy.polygon.technology/');
    const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const contractInstance = new hre.ethers.Contract('0xFEC145ef4D9BB7090F2DdbF1f03000321e5091E9', abi, provider);
    const newContractInstance = await contractInstance.connect(wallet);

    // @ts-ignore
    const txn = await newContractInstance.mint('sharad');
    await txn.wait();

    console.log(txn.toJSON());
    return;
}

main().then(()=>{
    console.log("scripts runs successfully! ");
}).catch((error)=>{
    console.log("scripts runs unsuccessfully! ", error);
})

// sudo npx hardhat run  work/script.ts
// hash: 0xa7d2ee61f346f585087c33ab2109581bc2d9e2a036e477b282479014886de989
// from: 0x0db6adab06fF57252E2d6364ce6CCcC554320c9c

// hash: 0x5480dfb83d92643951070e14fea3b759e70cab9b1b3c86b7630b6f804630e86a
// from: 0x0db6adab06fF57252E2d6364ce6CCcC554320c9c