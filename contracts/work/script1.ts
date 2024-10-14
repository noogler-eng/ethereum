import hre from "hardhat";
import abi from "./abi";

const main = async()=>{

    if(!process.env.PRIVATE_KEY) return;
    const provider = new hre.ethers.JsonRpcProvider('https://rpc-amoy.polygon.technology/');
    const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const contractInstance = new hre.ethers.Contract('0xFEC145ef4D9BB7090F2DdbF1f03000321e5091E9', abi, provider);
    const newContractInstance = await contractInstance.connect(wallet);

    // @ts-ignore
    const txn = await newContractInstance.train(1);
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
// hash: 0x438688c087ce871607496f4773223dca4f8223bab8b624a9a4661175c60ecd54
// from: 0x0db6adab06fF57252E2d6364ce6CCcC554320c9c
