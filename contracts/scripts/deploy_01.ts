import hre from "hardhat";

const deploy = async()=>{
    try{
        const MyNFTContract = await hre.ethers.getContractFactory('MY_NFT');
        const MyNFT = await MyNFTContract.deploy();
        console.log("contract deployed address: ", MyNFT.target);
        const tx = await MyNFT.deploymentTransaction();
        console.log('transaction hash: ', tx?.hash);
    }catch(error){
        console.log(error);
    }
}

deploy().then(()=>{
    console.log("scripts runs successfully! ");
}).catch((error)=>{
    console.log("scripts runs unsuccessfully! ", error);
})

// deployed at: 0x9ea80Bd15200E151925DF6f8aa3DD57D8A04318A
// contract hash: 0x91529782e2ae9aca1c33430963c16ecc275389ffa35f9f8696af3c7c579f4ca5