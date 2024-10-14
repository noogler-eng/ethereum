import { EnsResolver, ethers } from "ethers";

import dotenv from "dotenv";
dotenv.config();

// taking an mainnet polygon
if (!process.env.API_KEY) throw new Error("Mainnet api key is not found");
const JSON_RPC_URL = process.env.API_KEY;
const provider = new ethers.JsonRpcProvider(JSON_RPC_URL);

const ens = "vitalik.eth";

const main = async () => {
  // getting the address from ens name
  const address = await provider.resolveName(ens);
  console.log("address: ", address);

  if (!address) return;
  const ensNameFromAddress = await provider.lookupAddress(address);
  console.log("ensNameFromAddress: ", ensNameFromAddress);

  const resolver: EnsResolver | null = await provider.getResolver(ens);
  console.log(resolver);

  const email: string | undefined | null = await resolver?.getText("email");
  console.log(email);

  const avatar = await resolver?.getAvatar();
  console.log(`The avatar of the ${ens} is ${avatar}`);

  const contentHash = await resolver?.getContentHash();
  console.log(`The content hash of ${ens} is ${contentHash}`);
  // The content hash of vitalik.eth is ipfs://QmQNrahkWBsEULrHGEoJpYwKPUKJZN9oMEEjoc9g53uETL
  // how to view ipfs on web - https://ipfs.io/ipfs/QmQNrahkWBsEULrHGEoJpYwKPUKJZN9oMEEjoc9g53uETL/
};

main();
