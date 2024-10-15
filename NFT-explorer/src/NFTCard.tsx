import { BorderBeam } from "@/components/ui/border-beam";

export default function NFTCard({
  nft,
}: {
  nft: {
    image: string;
    name: string;
    slug: string;
  };
}) {
    console.log(nft);
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl bg-transparent">
      <div className="p-4 rounded-xl border">
        <div className="flex flex-col">
          <img
            src={nft.image}
            height={150}
            width={200}
            className="rounded-xl"
          />
          <div className="flex flex-col py-2">
            <h2 className="text-lg font-semibold pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-lg font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
              {nft.name}
            </h2>
            <p>{nft.slug}</p>
          </div>
        </div>
      </div>
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
  );
}
