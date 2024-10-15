import { useRef, useState } from "react";
import useFetchNFT from "./hooks/FtechNFT";
import { Input } from "@/components/ui/input";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShineBorder from "@/components/ui/shine-border";
import SparklesText from "@/components/ui/sparkles-text";
import NFTCard from "./NFTCard";

function App() {
  const [address, setAddress] = useState<string>("");
  const [type, setType] = useState<"owner" | "collection">("collection");
  const { nfts, isloading, iserror } = useFetchNFT(address, type);
  const inputRef = useRef(null);

  const handelData = (e: any) => {
    e.preventDefault();
    //@ts-ignore
    if (inputRef.current == null || !inputRef.current.value) return;
    // @ts-ignore
    setAddress(inputRef.current.value);
  };

  if (iserror) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181818] text-white">
        <h1 className="text-3xl font-semibold">
          <span className="text-8xl">Oops!</span>
          <br /> 500, there is some error in server side
        </h1>
      </div>
    );
  }

  if (isloading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#181818] text-white">
        <h1 className="text-3xl font-semibold">
          <span className="text-8xl">Loading!</span>
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-[#181818] text-white">
      <div className="flex justify-between items-center p-4">
        <div className="text-3xl">
          <SparklesText text="NFT's" sparklesCount={4} />
        </div>
        <form className="flex gap-2 items-center">
          <Tabs defaultValue={type} className="w-[400px]">
            <TabsList>
              <TabsTrigger value="owner" onClick={() => setType("owner")}>
                Owner
              </TabsTrigger>
              <TabsTrigger
                value="collection"
                onClick={() => setType("collection")}
              >
                Collection
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Input type="text" placeholder={type} ref={inputRef} id="address" />
          <RainbowButton type="submit" color="white" onClick={handelData}>
            search
          </RainbowButton>
        </form>
      </div>
      <div className="flex flex-col items-center min-h-screen justify-center">
        <div className="my-10">
          <ShineBorder
            className="text-center text-5xl font-bold capitalize bg-[#181818] text-white"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            Get to All the Mainnet NFT's
          </ShineBorder>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center mb-10">
          {nfts != null &&
            nfts?.map((item: any, index: any) => {
              const data = {
                image: item?.image.originalUrl || "",
                name: item?.name || "",
                slug: item?.collection?.slug,
              };
              return <NFTCard nft={data} key={index}/>;
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
