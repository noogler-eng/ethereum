import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchNFT(
  contractAddress: string | null,
  type: "owner" | "collection"
) {
  // getting NFT's by collection
  const [nfts, setNfts] = useState<any>();
  const [isloading, setLoading] = useState<boolean>(false);
  const [iserror, setError] = useState<Error | null>(null);

  useEffect(() => {
    getNFTs();
  }, [contractAddress, type]);

  if (!import.meta.env.VITE_API_KEY) throw new Error("Invalid API_KEY!");

  const getNFTs = async () => {
    try {
      setLoading(true);
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v3/${
        import.meta.env.VITE_API_KEY
      }`;

      console.log(type, contractAddress)

      if (type == "collection") {
        const advancedUrl = `${baseURL}/getNFTsForCollection?contractAddress=${
          contractAddress || "0x32973908FaeE0Bf825A343000fE412ebE56F802A"
        }&withMetadata=${true}&limits=100`;
        const NFT_Data = await axios.get(advancedUrl);
        setNfts(NFT_Data.data.nfts);
      } else {
        const advancedUrl = `${baseURL}/getNFTsForOwner?owner=${
          contractAddress || "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
        }&withMetadata=${true}`;
        const NFT_Data = await axios.get(advancedUrl);
        setNfts(NFT_Data.data.ownedNfts);
      }

      setLoading(false);
    } catch (error: any) {
      setNfts(null);
      setError(error);
    }
  };

  return { nfts, isloading, iserror };
}
