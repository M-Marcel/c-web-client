/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useRouter } from "next/router";
import clsx from "clsx";

import { EditIcon, LikeIcon } from "@/src/components/atoms/vectors";
// import { Nftcard } from "./NftMediumCard";
import Image from "next/image";
import UseConvertEthToDollar from "@/src/hooks/useEthConvertToDollar";
import { useEffect, useState } from "react";
import { apiRequest } from "@/src/functions/offChain/apiRequests";
import { useTimeCountDown } from "@/src/hooks/useTimeCountDown";
import * as moment from "moment";
import APPCONFIG from "@/src/constants/Config";
import UseHandleImgError from "@/src/hooks/useHandleImgError";
// Partial<Pick<INftcard, "name" | "imgUrl" | "price">> & {
//   time?: boolean;

const NftCard2 = ({
  _id,
  item_title,
  item_art_url,
  item_price,
  item_supply,
  item_remaining,
  item_id,
  resell_item_id,
  listing_price,
  listing_quantity,
  listing_remaining,
  maxWidth,
  user_id,
  listing_type,
  auction_end_date,
  starting_bidding_price,
  to = "buy-view-nft",
}: Partial<Pick<INftcard, "name" | "imgUrl" | "price">> & {
  time?: boolean;
  to?: string;
  maxWidth?: string;
  user_id?: string;
}) => {
  const [userId, setUserId] = useState("");
  const [auctionEndDate, setAuctionEndDate] = useState(null);
  const { handleImgError, imgError } = UseHandleImgError();
  const { time } = useTimeCountDown(auctionEndDate);
  const [dollarRate] = UseConvertEthToDollar();
  const { push } = useRouter();

  const fetchUserId = async () => {
    // try {
    var REQUEST_URL = "/user/auth/loggedIn";
    const HEADER = "authenticated";
    const METHOD = "GET";
    const DATA = {};
    apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
      if (response.status == 401) {
        return;
      } else if (response.status == 200) {
        setUserId(response.data.user._id);
      } else {
        return;
      }
    });
    // } catch (error) {
    //   toast("Something went wrong, please try again!");
    //   return;
    // }
  };

  useEffect(() => {
    setAuctionEndDate(
      auction_end_date ? moment(auction_end_date).format("MMMM D YYYY") : null
    );
    fetchUserId();
    // return () => {
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsx(
        "rounded-[0.975rem] bg-white w-full lg:max-w-full cursor-pointer relative",
        maxWidth
      )}
    >
      {user_id === userId ? (
        <div
          className="h-12 w-12 p-4 grid place-content-center cursor-pointer mr-4 bg-bg-4 absolute right-0 top-4 z-10 rounded-md"
          onClick={() =>
            push(
              listing_price
                ? `/view-listed-user-nft/${_id}`
                : `/view-created-user-nft/${_id}`
            )
          }
        >
          <EditIcon />
        </div>
      ) : null}
      <div className="nmc-wrapper-img" onClick={() => push(`/${to}/${_id}`)}>
        {item_id ? (
          <Image
            src={
              imgError
                ? APPCONFIG.DEFAULT_NFT_ART
                : item_art_url === undefined ||
                  item_art_url === null ||
                  (item_art_url === "" &&
                    item_id !== undefined &&
                    item_id !== null &&
                    item_id !== "")
                ? item_id.item_art_url
                : APPCONFIG.DEFAULT_NFT_ART
            }
            alt={item_title}
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            className="rounded-t-xl"
            onError={handleImgError}
          />
        ) : resell_item_id ? (
          <Image
            src={
              imgError
                ? APPCONFIG.DEFAULT_NFT_ART
                : resell_item_id.item_art_url !== undefined &&
                  resell_item_id.item_art_url !== null &&
                  resell_item_id.item_art_url !== ""
                ? resell_item_id.item_art_url
                : APPCONFIG.DEFAULT_NFT_ART
            }
            alt={resell_item_id.item_title}
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            className="rounded-t-xl"
            onError={handleImgError}
          />
        ) : item_art_url ? (
          <Image
            src={
              imgError
                ? APPCONFIG.DEFAULT_NFT_ART
                : item_art_url !== undefined || item_art_url !== null
                ? item_art_url
                : APPCONFIG.DEFAULT_NFT_ART
            }
            alt={item_title}
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
            className="rounded-t-xl"
            onError={handleImgError}
          />
        ) : (
          ""
        )}

        {/* <img src={item_art_url} alt={item_title} /> */}
      </div>
      <div className="nmc-sub-wrapper flex justify-between items-center">
        <div className="flex flex-col gap-y-[0.3rem] p-2">
          <span className="font-bold text-black text-xl">
            {item_id
              ? item_id.item_title
              : resell_item_id
              ? resell_item_id.item_title
              : item_title
              ? item_title
              : ""}
          </span>
          <span className="nmc-sub-wrapper-2-owner">
            {item_supply === undefined ||
            item_supply === null ||
            (item_title === "" &&
              item_id !== undefined &&
              item_id !== null &&
              item_id !== "")
              ? listing_remaining + "/" + listing_quantity
              : item_remaining + "/" + item_supply}
          </span>
        </div>
        {listing_type === "auction" ? (
          <div className="flex flex-col gap-y-2 bg-[#F9F9FA] py-2 px-[0.625rem] rounded-lg w-[52%]">
            <div className="flex justify-between">
              <span className=" text-txt-4 font-bold">Time Left:</span>
              <span className=" text-black font-bold">{`${
                time.days.toString().length < 2 ? "0" + time.days : time.days
              }:${
                time.hours.toString().length < 2 ? "0" + time.hours : time.hours
              }:${
                time.minutes.toString().length < 2
                  ? "0" + time.minutes
                  : time.minutes
              }:${
                time.seconds.toString().length < 2
                  ? "0" + time.seconds
                  : time.seconds
              }`}</span>
            </div>
            <div className="flex gap-x-1 justify-between">
              <span className=" text-txt-4 font-bold">Min bid:</span>
              <div className="flex gap-x-1 items-center w-max">
                <span className="relative h-6 w-3">
                  <Image
                    src="/icon-svg/eth-dark-icon.svg"
                    alt="coin-svg"
                    layout="fill"
                  />
                </span>
                <span className=" text-black font-bold">
                  {starting_bidding_price}
                </span>
              </div>
            </div>
          </div>
        ) : item_price !== undefined ? (
          <div className="p-2">
            <span className="text-black flex items-center text-lg">
              <span className="h-6 w-3 relative">
                <Image
                  src="/icon-svg/eth-dark-icon.svg"
                  alt="ethereum coin"
                  layout="fill"
                />
              </span>
              {item_price !== undefined
                ? item_price
                : listing_price !== undefined
                ? listing_price
                : 0}
            </span>
            {dollarRate ? (
              <span className="text-black flex items-center text-lg ">
                <span className="text-lg text-black font-bold">$</span>
                {(
                  (item_price !== undefined
                    ? item_price
                    : listing_price !== undefined
                    ? listing_price
                    : 0) * dollarRate
                ).toFixed(2)}
              </span>
            ) : (
              ""
            )}
          </div>
        ) : listing_price !== undefined ? (
          <div className="p-2">
            <span className="text-black flex items-center text-lg">
              <span className="h-6 w-3 relative">
                <Image
                  src="/icon-svg/eth-dark-icon.svg"
                  alt="ethereum coin"
                  layout="fill"
                />
              </span>
              {listing_price ? listing_price : 0}
            </span>
            {dollarRate ? (
              <span className="text-black flex items-center text-lg ">
                <span className="text-lg text-black font-bold">$</span>
                {((listing_price ? listing_price : 0) * dollarRate).toFixed(2)}
              </span>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NftCard2;
