//@ts-nocheck
import { ITransactionCard } from "@/src/utilities/types";
import Image from "next/image";
import React from "react";
import { CoinIcon } from "../atoms/vectors";
import * as moment from "moment";
import APPCONFIG from "@/src/constants/Config";

const TransactionCard = ({
  listed_item,
  to_user_id,
  from_user_id,
  created_item,
  activity_type,
  createdAt,
  created_item_listed,
  resell_item_id,
}: // activity_type,
// ITransactionCard &
{
  to_user_id: string;
  from_user_id: string;
  listed_item: string;
  created_item: string;
  created_item_listed: string;
  resell_item_id: string;
  activity_type: string;
  createdAt: string;
}) => {
  var item = null;
  var item_price = null;
  var activityType = null;
  if (listed_item && listed_item !== null) {
    item = listed_item;
    item_price = listed_item.listing_price;
  }
  if (created_item && created_item !== null) {
    item = created_item;
    item_price = created_item.item_price;
  }

  switch (activity_type) {
    case "newly_created_item":
      activityType = "item created";
      break;

    case "updated_item":
      activityType = "item updated";
      break;

    case "newly_listed_item":
      activityType = "item listed";
      break;

    case "updated_listing":
      activityType = "listing updated";
      break;

    case "new_mint":
      activityType = "item minted";
      break;

    case "new_sales":
      activityType = "item sold";
      break;
    case "cancelled_listing":
      activityType = "item cancelled";
      break;

    default:
    // code block
  }

  return (
    <div className="total-earning-card-wrapper">
      <div className="transaction-card-details">
        <div className="transaction-card-img">
          {created_item ? (
            <Image
              src={
                created_item &&
                created_item !== undefined &&
                created_item !== null
                  ? created_item.item_art_url
                  : APPCONFIG.DEFAULT_NFT_ART
              }
              alt=""
              layout="fill"
              className="rounded-full"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
            />
          ) : resell_item_id ? (
            <Image
              src={
                resell_item_id &&
                resell_item_id !== undefined &&
                resell_item_id.item_art_url
                  ? resell_item_id.item_art_url
                  : APPCONFIG.DEFAULT_NFT_ART
              }
              alt=""
              layout="fill"
              className="rounded-full"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
            />
          ) : created_item_listed ? (
            <Image
              src={
                created_item_listed &&
                created_item_listed !== undefined &&
                created_item_listed !== null
                  ? created_item_listed.item_art_url
                  : "/images/profile-nft.png"
              }
              alt=""
              layout="fill"
              className="rounded-full"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
            />
          ) : (
            ""
          )}
        </div>
        <div className="transaction-card">
          {activity_type === "newly_created_item" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                created new item{" "}
                <b>
                  {created_item &&
                  created_item !== undefined &&
                  created_item !== null
                    ? created_item.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : activity_type === "updated_item" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                updated an item{" "}
                <b>
                  {created_item &&
                  created_item !== undefined &&
                  created_item !== null
                    ? created_item.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : activity_type === "newly_listed_item" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                recently listed an item{" "}
                <b>
                  {created_item_listed &&
                  created_item_listed !== undefined &&
                  created_item_listed !== null
                    ? created_item_listed.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : activity_type === "updated_listing" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                recently updated an item{" "}
                <b>
                  {listed_item &&
                  listed_item !== undefined &&
                  listed_item !== null &&
                  created_item_listed !== undefined &&
                  created_item_listed !== null
                    ? created_item_listed.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : activity_type === "new_mint" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                recently minted an item{" "}
                <b>
                  {created_item_listed &&
                  created_item_listed !== undefined &&
                  created_item_listed !== null
                    ? created_item_listed.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : activity_type === "new_sales" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                recently purchased an item{" "}
                <b>
                  {created_item_listed &&
                  created_item_listed !== undefined &&
                  created_item_listed !== null
                    ? created_item_listed.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : activity_type === "cancelled_listing" ? (
            <p className="transaction-card-p">
              {from_user_id &&
              from_user_id !== undefined &&
              from_user_id.username &&
              from_user_id.username !== undefined
                ? from_user_id.username
                : ""}
              <span className="transaction-card-span">
                {" "}
                recently cancelled an item{" "}
                <b>
                  {created_item_listed &&
                  created_item_listed !== undefined &&
                  created_item_listed !== null
                    ? created_item_listed.item_title
                    : ""}
                </b>
              </span>
            </p>
          ) : null}

          <div className="total-earning-transaction-date-time">
            <span className="total-earning-transaction-date">
              {moment(createdAt).format("ddd, MMM Do YYYY, hh:mm:ss")},
            </span>{" "}
            <span className="total-earning-transaction-time">10:52</span>
          </div>
        </div>
      </div>
      {/* <div className="total-earning-bal"> */}
      {/*   <span className="total-earning-coin-sold"> */}
      {/*     <CoinIcon /> 4.5k */}
      {/*   </span> */}
      {/*   <span className="total-earning-coin-sold-receiver">$5,954,532</span> */}
      {/* </div> */}
    </div>
  );
};

export default TransactionCard;
