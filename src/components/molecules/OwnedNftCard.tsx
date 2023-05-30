/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useRouter } from "next/router";

import { LikeIcon } from "@/src/components/atoms/vectors";
// import { Nftcard } from "./NftMediumCard";
import Image from "next/image";
import APPCONFIG from "../../constants/Config";

// Partial<Pick<INftcard, "name" | "imgUrl" | "price">> & {
//   time?: boolean;

const OwnedNftCard = ({
  rawMetadata,
  name,
  tokenId,
  contract,
  to = "buy-view-nft",
}: {
  rawMetadata: object;
  name: string;
  tokenId: string;
  contract: object;
  to?: string;
}) => {
  const { push } = useRouter();

  const openLink = () =>{
      if(rawMetadata && rawMetadata.cloudax_token 
       && rawMetadata.cloudax_token._id
       && rawMetadata.cloudax_token._id.lenght > 0){
        push(`/buy-view-nft/${rawMetadata.cloudax_token._id}`)
      }
      else{
        push(`/${to}/${contract.address}?tokenId=${tokenId}`)
      }
  }
  return (
    <div
      className="nmc-wrapper cursor-pointer"
      onClick={() => openLink()}
    >
      <div className="nmc-wrapper-img">
            <Image
              src={
                rawMetadata &&
                rawMetadata.image !== undefined &&
                rawMetadata.image !== null 
                  ? rawMetadata.image
                  : APPCONFIG.DEFAULT_NFT_ART
              }
              alt={rawMetadata &&
                rawMetadata.image !== undefined &&
                rawMetadata.image !== null
                ? rawMetadata.name : ""
              }
              layout="fill"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
              objectFit="cover"
              className="rounded-t-[0.975rem]"
            />
      </div>
      <div className="nmc-sub-wrapper flex justify-between">
        <div className="flex flex-col gap-y-[0.3rem] p-2">
          <span className="font-bold text-black text-xl">
            {
            rawMetadata &&
            rawMetadata !== undefined &&
            rawMetadata !== null &&
            rawMetadata.name !== undefined &&
            rawMetadata.name !== null
              ? rawMetadata.name
              : name+" - "+tokenId
              }
          </span>
          {/* <span className="nmc-sub-wrapper-2-owner"> */}
          {/*   {item_supply === undefined || */}
          {/*   item_title === null || */}
          {/*   (item_title === "" && */}
          {/*     item_id !== undefined && */}
          {/*     item_id !== null && */}
          {/*     item_id !== "") */}
          {/*     ? item_id.item_supply + "/" + item_id.item_supply */}
          {/*     : item_supply + "/" + item_supply} */}
          {/* </span> */}
        </div>
      </div>
    </div>
  );
};

export default OwnedNftCard;
