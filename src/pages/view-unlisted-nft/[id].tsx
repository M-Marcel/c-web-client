//@ts-nocheck
import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import * as moment from "moment";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { Button, Heading2, Input2 } from "../../components/atoms";
import { CoinIcon } from "../../components/atoms/vectors";
import { Footer, Modal } from "../../components/organisms";
import DashboardLayout from "../../template/DashboardLayout";
import { apiRequest } from "../../functions/offChain/apiRequests";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";

import abi from "../../artifacts/abi.json";

import { INftcard } from "@/src/components/molecules/NftMediumCard";
import { ethers } from "ethers";
import APPCONFIG from "@/src/constants/Config";
import { ActivityLoader } from "@/src/components/lazy-loaders";
import wEthAbi from "@/src/artifacts/wEthAbi.json";

import TimePicker from "react-time-picker/dist/entry.nostyle";
import { SwapCard } from "@/src/components/molecules";

const ViewUnlistedNFT = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"offer" | "addFunds">("offer");
  const [nftPayload, setNftPayload] = useState({
    nft_quantity: "0",
    nft_price: "0.0",
  });

  const [ethInput, setEthInput] = useState("0.0");
  const [wETHInput, setWETHInput] = useState("0.0");

  const [itemDetail, setItemDetail] = useState<INftcard | null>(null);
  const { query, push } = useRouter();
  const { id } = query;
  const [viewNftStage, setViewNftStage] = useState("overview");
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [userId, setUserId] = useState<null | string>(null);
  const [isTransloading, setIsTransLoading] = useState(false);
  const [activities, setActivities] = useState(null);
  // const [dollarRate] = UseConvertEthToDollar();
  const viewNftStages = ["overview", "history"];
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);

  const [dateSelected, setDateSelected] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [timeSelected, setTimeSelected] = useState(
    new Date().toLocaleTimeString()
  );

  const bidExpDates = [
    "1 day",
    "2 days",
    "3 days",
    "4 days",
    "5 days",
    "6 days",
    "7 days",
  ];

  // const nftProperties = [
  //   { label: "dna", value: "human", trait: 19 },
  //   { label: "eyewear", value: "cyber bindi", trait: 16 },
  //   { label: "hair", value: "blind curtains", trait: 1 },
  //   { label: "eye color", value: "black binds", trait: 20 },
  // ];

  /**
   * Fetch user details
   * @date 12/15/2022 - 12:01:11 PM
   *
   * @async
   * @returns {*}
   */

  const makeOffer = async (event) => {
    event.preventDefault();
    // @dev here is the actual wETh balance for the smart contract call "balanceInWEth"

    setIsTransLoading((prev) => !prev);
    if (Number(nftOfferPayload.quantity) > itemDetail.listing_remaining) {
      toast.error(
        "The quantity you specified is more than the listed item quantity"
      );
      setNftOfferPayload({ ...nftOfferPayload, quantity: 1 });
      setIsTransLoading((prev) => !prev);
      setShowModal((prev) => !prev);
      return;
    }
    {
      //@ts-ignore
      var formData = {
        listing_id: itemDetail._id,
        offer_start_date: date.startDate,
        offer_end_date: date.endDate,
        amount: nftOfferPayload.price * nftOfferPayload.quantity,
        offer_quantity: nftOfferPayload.quantity,
        offer_time: timeSelected,
        // bidder: buyer,
      };

      if (nftOfferPayload.price > balanceInWEth) {
        toast(
          "Insufficient balance " +
            balanceInWEth +
            " to complete an offer of " +
            nftOfferPayload.price
        );
        toast("Add or swap eth for wEth");
        setIsTransLoading(false);
        // alert("Insufficient wETh balance, add or swap eth for wEth")
      } else {
        if (nftOfferPayload.price != 0) {
          toast("Approve wEth");
          const provider = new ethers.providers.Web3Provider(
            (window as any).ethereum
          );
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            APPCONFIG.wEthAddress_testnet,
            wEthAbi,
            signer
          );

          var tnx = null;
          try {
            const transaction = await contract.approve(
              APPCONFIG.SmartContractAddress,
              ethers.utils.parseUnits(nftOfferPayload.price.toString(), "ether")
            );
            tnx = await transaction.wait();
            toast("Approval Completed");
          } catch (err) {
            toast("Transaction cancelled!");
            toast(err.message);
          }
          const HEADER = "authenticated";
          const REQUEST_URL = "nft-offer/make_offer?type=unlisted";
          const METHOD = "POST";
          const DATA = formData;
          // toast("Finalizing the transaction...");
          apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then(function (
            response
          ) {
            if (response.status == 200 || response.status == 201) {
              toast(response.data.message);
              setIsTransLoading(false);
              push("");
            } else {
              toast(response.data.error);
              setIsTransLoading(false);
            }
          });
        } else {
          toast("You can place an offer of 0 ETH");
          setIsTransLoading(false);
        }
      }
    }

    // setShowModal((prev) => !prev);
  };

  const fetchUser = async () => {
    const HEADER = "authenticated";
    const REQUEST_URL = "user/my_profile";
    const METHOD = "GET";
    const DATA = {};
    apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
      if (response.status == 400) {
        var error = response.data.error;
        toast(error);
        return;
      } else if (response.status == 401) {
        toast("Unauthorized request!");
        return;
      } else if (response.status == 200) {
        setUserId(response.data.data._id);
      } else {
        toast("Something went wrong, please try again!87");
        return;
      }
    });
  };

  /**
   * Fetch item Activities
   * @date 12/15/2022 - 12:00:06 PM
   *
   * @async
   * @returns {*}
   */
  const fetchActivities = async () => {
    try {
      var REQUEST_URL =
        "/activities?content_id=" + id + "&&page=" + currentPage;
      const HEADER = {};
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          return;
        } else if (response.status == 401) {
          toast("Unauthorized request!");
          return;
        } else if (response.status == 200) {
          if (activities !== null && activities.length > 0) {
            for (
              let index = 0;
              index < response.data.data.activities.length;
              index++
            ) {
              setActivities((prev) => [
                ...prev,
                response.data.data.activities[index],
              ]);
            }
          } else {
            setActivities(response.data.data.activities);
          }
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
          setNextPage(response.data.nextPage);
        } else {
          toast("Something went wrong, please try again!88");
          return;
        }
      });
    } catch (error) {
      toast("Something went wrong, please try again!89");
      return;
    }
  };

  /**
   * Handles buy functionality
   * @date 12/15/2022 - 11:59:42 AM
   *
   * @async
   * @returns {*}
   */

  const handleBuy = async () => {
    setIsTransLoading((prev) => !prev);
    {
      /*write your payment info here*/
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        APPCONFIG.SmartContractAddress,
        abi,
        signer
      );

      const priceListed = ethers.utils.parseUnits(
        itemDetail.listing_price.toString()
      );

      const price = ethers.utils.parseUnits(
        itemDetail.listing_price.toString(),
        "ether"
      );

      var tnx = null;
      var buyer = connectedAddress;
      var trackCopyBaseUrl = "";
      var soldItemCopyId = "";
      var amount = itemDetail.listing_price as string;

      if (itemDetail.relisted && itemDetail.relisted === true) {
        toast("Please approve this transaction!");
        const transaction = await contract.buyNft(
          itemDetail.token_address,
          itemDetail.token_id,
          {
            value: price,
            gasPrice: 20000000,
          }
        );
        tnx = await transaction.wait();

        buyer = connectedAddress;
        trackCopyBaseUrl = "null";
        soldItemCopyId = itemDetail.token_id;
      } else if (!itemDetail.relisted || itemDetail.relisted === false) {
        toast("Please approve this transaction!");

        const item_base_uri = `${APPCONFIG.TOKEN_BASE_URL}/${itemDetail._id}`;
        const transaction = await contract.buyItemCopy(
          itemDetail.listed_by.address,
          priceListed,
          itemDetail.item_supply,
          itemDetail.listing_royalty,
          itemDetail._id,
          item_base_uri,
          {
            value: price,
            gasPrice: 20000000,
          }
        );
        tnx = await transaction.wait();
        // var amount = price;

        try {
          if (tnx.events[0]) {
            if (tnx.events[4]) {
              soldItemCopyId = tnx.events[3].args[0].toNumber();
              buyer = tnx.events[3].args[3];
              trackCopyBaseUrl = tnx.events[3].args[5];
              // console.log(
              //   "Log 5: soldItemCopyIdTop",
              //   tnx.events[3].args[0].toNumber()
              // );
              // console.log("buyer", tnx.events[3].args[3]);
              // console.log("buytrackCopyBaseUrl", tnx.events[3].args[5]);
            } else {
              soldItemCopyId = tnx.events[1].args[0].toNumber();
              buyer = tnx.events[1].args[3];
              trackCopyBaseUrl = tnx.events[1].args[5];
              // console.log(
              //   "Log 3: soldItemCopyIdTop",
              //   tnx.events[1].args[0].toNumber()
              // );
              // console.log("buyer", tnx.events[1].args[3]);
              // console.log("buytrackCopyBaseUrl-2", tnx.events[1].args[5]);
            }
          } else {
            toast("We were unable to complete your transaction!");
            setIsTransLoading((prev) => !prev);
            return;
          }
        } catch (error) {
          setIsTransLoading((prev) => !prev);
          return;
        }
      }

      //@ts-ignore
      var formData = {
        listing_id: itemDetail._id,
        item_copy_id: soldItemCopyId,
        item_copy_base_url: trackCopyBaseUrl,
        amount: amount,
        buyer: buyer,
      };
      const HEADER = "authenticated";
      const REQUEST_URL = "nft-listing/buy";
      const METHOD = "POST";
      const DATA = formData;
      toast("Finalizing the transaction...");
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then(function (response) {
        if (response.status == 200 || response.status == 201) {
          toast(response.data.message);
          setIsTransLoading(false);
          push("/profile");
        } else {
          toast(response.data.error);
          setIsTransLoading(false);
        }
      });
    }
  };

  const handleOffer = async () => {
    //Write bid function here
    setShowModal((prev) => !prev);
  };

  /**
   * Fetch item details
   * @date 12/15/2022 - 11:57:42 AM
   *
   * @async
   * @param {string} id
   * @returns {*}
   */
  const fetchItemDetail = async (id: string): any => {
    if (id !== undefined) {
      const HEADER = {};
      const REQUEST_URL = "nft-item/detail/" + id;
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          // push("/");
          return;
        } else if (response.status == 200) {
          if (response.data.data == null) {
            // push("/");
          }
          setItemDetail(response.data.data);
          fetchActivities();
        } else {
          toast("Something went wrong, please try again!90");
          return;
        }
      });
    }
  };

  useEffect(() => {
    fetchItemDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentPage]);

  const handleRangeSelection = (ranges: any) => {
    setDateSelected(ranges.selection);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNftPayload({
      ...nftPayload,
      [name]: value,
    });
  };
  //write your function to handle eth swap
  const handleEthSwap = (e) => {
    // setShowModal((prev) => !prev);
    setModalType("offer");
  };

  return (
    <DashboardLayout isLoading={!itemDetail}>
      <ToastContainer />
      {itemDetail !== null ? (
        <div className="space-y-8">
          <div className="view-wrapper-hero">
            <div className="view-hero-img">
              <Image
                priority
                src={itemDetail.item_art_url}
                alt={itemDetail.item_title}
                layout="fill"
                objectFit="cover"
                className="rounded-2xl"
                placeholder="blur"
                blurDataURL="/images/placeholder.png"
              />
            </div>
            <div className="space-y-6 lg:space-y-8 flex flex-col">
              <>
                <div className="flex items-center">
                  <div className="h-[3.125rem] w-[3.125rem] relative mr-4">
                    <Image
                      src={
                        itemDetail && itemDetail.collection_id
                          ? itemDetail.collection_id.collectionLogoImage
                          : "/images/placeholder.png"
                      }
                      alt="colx-img"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                      placeholder="blur"
                      blurDataURL="/images/placeholder.png"
                    />
                  </div>
                  <span className="text-xl  lg:text-3xl lg:mr-1">
                    {itemDetail && itemDetail.collection_id
                      ? itemDetail.collection_id.name
                      : ""}
                  </span>
                  <div className="h-6 w-6 relative">
                    <Image
                      src="/images/verify.svg"
                      alt="colx-img"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </div>
                </div>
                <span className="text-4xl lg:text-5xl font-bold">
                  {itemDetail.item_title}
                </span>
              </>
              <div className="view-hero-nft-owner">
                <div className="flex items-center gap-x-4 w-1/3">
                  <div className="relative h-14 w-14">
                    <Image
                      src="/images/avatar.png"
                      alt="creator-img"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-txt-2">Creator</span>
                    <span>
                      {itemDetail.user_id &&
                      itemDetail.user_id &&
                      itemDetail.user_id.username &&
                      itemDetail.user_id.username.length > 0
                        ? itemDetail.user_id.username
                        : " ---- "}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-x-4">
                  <div className="relative h-14 w-14">
                    <Image
                      src="/images/avatar.png"
                      alt="owner-img"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-txt-2">Current Owner</span>
                    <span>
                      {itemDetail.user_id &&
                      itemDetail.user_id &&
                      itemDetail.user_id.username &&
                      itemDetail.user_id.username.length > 0
                        ? itemDetail.user_id.username
                        : " ---- "}
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="view-hero-nft-cta-wrapper"> */}
              {/* <div className="flex w-full gap-x-6">
                    <div className="p-4 bg-bg-5 rounded-md w-1/2">
                      <span className="text-txt-2 text-xl block mb-4">
                        Highest floor bid
                      </span>
                      <div>
                        <span className="flex items-center  text-[1.5rem] gap-x-1">
                          <CoinIcon />
                          51k
                        </span>
                        <span className="text-xl font-medium flex items-center mt-2 text-txt-2 gap-x-2">
                          by
                          <span className="earnings-card-history">
                            0x7a20d...9257
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-lg font-medium">
                    Last sale price 10.8 ETH
                  </span> */}
              {/* <div className="flex flex-col gap-y-4 w-full"> */}
              {/* <div className="flex gap-x-5 w-full"> */}
              {/* <div className="w-full space-y-4"> */}
              {/* <Button
                  title="Make an offer"
                  wt="w-full"
                  onClick={() => {
                    setShowModal((prev) => !prev);
                  }}
                /> */}
              {/* <Button
                            title="Place a bid"
                            outline2
                            wt="w-full"
                            onClick={() => {
                              setModaltype("bid");
                              setShowModal((prev) => !prev);
                            }}
                          /> */}
              {/* </div> */}

              {/* <span className="h-[3.625rem] w-[3.625rem] grid place-items-center bg-bg-5 rounded-md">
                        <CartIcon />
                      </span> */}
              {/* </div> */}
              {/* <Button
                      title="Place a bid"
                      wt="w-full"
                      outline2
                      onClick={() => {
                        setModaltype("bid");
                        setShowModal((prev) => !prev);
                      }}
                    /> */}
              {/* </div> */}
              {/* </div> */}
            </div>
            {/* <div className="flex gap-x-6 mt-6 items-center">
                <span className="flex gap-x-2 items-center">
                  <LikeIcon /> 298
                </span>
                <span className="view-hero-nft-link">
                  <Image
                    src="/icon-svg/discord.svg"
                    alt="view-nft-links"
                    layout="fill"
                    objectFit="contain"
                  />
                </span>
                <span className="view-hero-nft-link">
                  <Image
                    src="/icon-svg/twitter.svg"
                    alt="view-nft-links"
                    layout="fill"
                    objectFit="contain"
                  />
                </span>
                <span className="view-hero-nft-link">
                  <Image
                    src="/icon-svg/telegram.svg"
                    alt="view-nft-links"
                    layout="fill"
                    objectFit="contain"
                  />
                </span>
                <span className="view-hero-nft-link border border-border-1-line p-4 rounded-md">
                  <Image
                    src="/icon-svg/options.svg"
                    alt="view-nft-links"
                    layout="fill"
                    objectFit="cover"
                  />
                </span>
              </div> */}
          </div>
          {/*Stages Mode*/}
          <div className="flex gap-x-10 items-center border-b-[0.1px] border-border-2-line">
            {viewNftStages.map((stage) => (
              <span
                key={stage}
                onClick={() => setViewNftStage(stage)}
                className={clsx(
                  "view-nft-stage",
                  stage === viewNftStage && "text-white border-b-[2.5px]"
                )}
              >
                {stage}
              </span>
            ))}
          </div>
          <div className="view-nft-stages">
            {viewNftStage === "overview" ? (
              <div>
                <div className="view-nft-description space-y-3">
                  <h2 className="text-2xl font-bold ">Description</h2>
                  <div className="flex flex-col">
                    <p className="text-txt-2 lg:w-1/2">
                      {/*@ts-ignore*/}
                      {itemDetail.item_description}
                    </p>
                  </div>
                  {/* <span className="flex items-center gap-x-2 text-txt-3 font-medium">
                      See more
                      <span>
                        <CaretDown color="lightgray" />
                      </span>
                    </span> */}

                  <div className="view-nft-details">
                    <h2 className="text-2xl font-bold my-4">Details</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-x-2">
                        <CoinIcon />{" "}
                        <span className="block font-medium ml-2">Ethereum</span>{" "}
                        <span className="text-txt-2">(ERC-721)</span>
                      </div>
                      {/* <div className="flex items-center gap-x-2">
                        <StatIcon />{" "}
                        <span className="block font-medium">
                          View on Etherscan
                        </span>
                        <span className="relative h-5 w-5 cursor-pointer">
                          <Image
                            src="/vectors/export.svg"
                            alt="external link"
                            layout="fill"
                            objectFit="cover"
                          />
                        </span>
                      </div> */}
                      {/* <div className="flex items-center gap-x-2">
                          <EyeIcon />{" "}
                          <span className="block font-medium">
                            Open original
                          </span>{" "}
                          <span className="relative h-5 w-5 cursor-pointer">
                            <Image
                              src="/vectors/export.svg"
                              alt="external link"
                              layout="fill"
                              objectFit="cover"
                            />
                          </span>
                        </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : viewNftStage === "properties" ? (
              <div className="flex items-center gap-x-5">
                {nftProperties.map(({ label, trait, value }) => (
                  <div
                    key={value}
                    className="flex flex-col items-center bg-bg-5 p-4 rounded-lg"
                  >
                    <span className="uppercase text-xs font-medium earnings-card-history">
                      {label}
                    </span>
                    <span className="capitalize text-lg font-medium ">
                      {value}
                    </span>
                    <span className=" text-[0.625rem] text-txt-2">
                      {trait}% have this trait
                    </span>
                  </div>
                ))}
              </div>
            ) : viewNftStage === "bids" ? (
              <div className="flex flex-col gap-y-6">
                {/* {nftBids.map(({ bidder, expiresIn, imgUrl, time }) => (
                    <div
                      key={bidder}
                      className="flex items-center justify-between bg-bg-5 py-4 pl-6 pr-8 rounded-xl"
                    >
                      <div className="flex items-center gap-x-4">
                        <div className="h-16 w-16 relative">
                          <Image
                            src={imgUrl}
                            alt={bidder}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <span className="text-xl font-bold">{bidder}</span>
                          <div className="flex items-center gap-x-1">
                            <span className="font-medium text-txt-2">
                              {time} ago
                            </span>
                            <span className="h-1 w-1 rounded-full bg-txt-2"></span>
                            <span className="font-medium text-txt-2">
                              Expires in {expiresIn}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-txt-2"></span>
                            <span className="font-medium earnings-card-history">
                              Floor bid
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="flex text-xl font-bold">
                          <CoinIcon /> 4.5k
                        </span>
                        <span className="text-txt-2">$5,954,532</span>
                      </div>
                    </div>
                  ))} */}
                <Heading2 title="There's no bidding" />
              </div>
            ) : viewNftStage === "history" ? (
              <div className="flex flex-col gap-y-6 overflow-auto">
                {activities === null ? (
                  Array(12)
                    .fill(0)
                    .map((_, i) => (
                      <ActivityLoader
                        key={"buy-nft-activity-skeleton-key" + i}
                      />
                    ))
                ) : activities.length === 0 ? (
                  <Heading2 title="No activities!!!" />
                ) : activities.length > 0 ? (
                  activities.map(
                    ({
                      _id,
                      listed_item,
                      to_user_id,
                      from_user_id,
                      created_item,
                      resell_item_id,
                      activity_type,
                      createdAt,
                      created_item_listed,
                    }) => (
                      <div
                        key={_id}
                        className="flex items-center justify-between bg-bg-5 py-4 pl-6 pr-8 rounded-xl"
                      >
                        <div className="flex items-center gap-x-4">
                          <div className="h-16 w-16 relative">
                            {resell_item_id ? (
                              <Image
                                src={
                                  resell_item_id &&
                                  resell_item_id !== undefined &&
                                  resell_item_id !== null
                                    ? resell_item_id.item_art_url
                                    : ""
                                }
                                alt=""
                                layout="fill"
                                objectFit="contain"
                                className="rounded-full"
                              />
                            ) : created_item ? (
                              <Image
                                src={
                                  created_item &&
                                  created_item !== undefined &&
                                  created_item !== null
                                    ? created_item.item_art_url
                                    : ""
                                }
                                alt=""
                                layout="fill"
                                objectFit="contain"
                                className="rounded-full"
                              />
                            ) : listed_item ? (
                              <Image
                                src={
                                  created_item_listed &&
                                  created_item_listed !== undefined &&
                                  created_item_listed !== null
                                    ? created_item_listed.item_art_url
                                    : ""
                                }
                                alt=""
                                layout="fill"
                                objectFit="contain"
                                className="rounded-full"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-x-2">
                              <span className="text-xl font-bold">
                                {from_user_id &&
                                from_user_id !== undefined &&
                                from_user_id.username &&
                                from_user_id.username !== undefined
                                  ? from_user_id.username
                                  : "----"}
                              </span>
                              <span className="lg:text-xl font-bold text-txt-2">
                                {activity_type === "newly_created_item"
                                  ? "created"
                                  : activity_type === "updated_item"
                                  ? "updated"
                                  : activity_type === "newly_listed_item"
                                  ? "listed"
                                  : activity_type === "updated_listing"
                                  ? "bupdated a listed"
                                  : activity_type === "new_mint"
                                  ? "minted"
                                  : activity_type === "new_sales"
                                  ? "purchased"
                                  : activity_type === "new_mint"
                                  ? "minted"
                                  : activity_type === "cancelled_listing"
                                  ? "delisted"
                                  : ""}
                              </span>
                              <span className="transaction-card-span">
                                <b>
                                  {resell_item_id &&
                                  resell_item_id !== undefined &&
                                  resell_item_id !== null
                                    ? resell_item_id.item_title
                                    : created_item_listed &&
                                      created_item_listed !== undefined &&
                                      created_item_listed !== null
                                    ? created_item_listed.item_title
                                    : created_item &&
                                      created_item !== undefined &&
                                      created_item !== null
                                    ? created_item.item_title
                                    : ""}
                                </b>
                              </span>
                              {to_user_id && (
                                <span className="text-xl font-bold">
                                  {to_user_id &&
                                  to_user_id !== undefined &&
                                  to_user_id.username &&
                                  to_user_id.username !== undefined
                                    ? to_user_id.username
                                    : "----"}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-x-2">
                              <span className="font-medium text-txt-2">
                                {moment(createdAt).format(
                                  "ddd, MMM Do YYYY, hh:mm:ss"
                                )}
                              </span>
                              <span className="font-medium text-txt-2">
                                {/* {time} */}
                              </span>
                              {/* {icon && ( */}
                              {/*   <span className="relative h-5 w-5 cursor-pointer"> */}
                              {/*     <Image */}
                              {/*       src={icon} */}
                              {/*       alt={txn} */}
                              {/*       layout="fill" */}
                              {/*       objectFit="cover" */}
                              {/*     /> */}
                              {/*   </span> */}
                              {/* )} */}
                            </div>
                          </div>
                        </div>
                        <div>
                          {/* <span className="flex text-xl font-bold"> */}
                          {/*   <CoinIcon /> 4.5k */}
                          {/* </span> */}
                          {/* <span className="text-txt-2">$5,954,532</span> */}
                        </div>
                      </div>
                    )
                  )
                ) : null}
              </div>
            ) : null}
            <div className="mt-8">
              {nextPage < totalPages ? (
                <Button
                  title="Load More"
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : null}

      <Modal
        title={modalType === "offer" ? "Make an offer" : "Add funds"}
        openModal={showModal}
        closeModal={setShowModal}
        modalWt={modalType === "addFunds" ? "w-[40rem] md:w-fit" : "w-[40rem]"}
        modalHt={
          modalType === "addFunds"
            ? "h-full sm:h-[60%] my-auto md:h-fit overflow-y-auto"
            : "h-full sm:h-[60%] my-auto md:h-fit lg:h-[80%] overflow-y-auto"
        }
      >
        {modalType === "offer" ? (
          <div className="flex flex-col items-center max-w-[85%] mx-auto gap-y-5">
            <span className="font-bold text-txt-2 text-base max-w-[80%] text-center">
              You are about to make an offer for{" "}
              <span className="text-white">
                {itemDetail !== null && itemDetail.item_title}{" "}
              </span>
              from{" "}
              <span className="text-white">
                {itemDetail !== null && itemDetail.collection_id.name}
              </span>{" "}
              collection
            </span>
            {/* <div className="flex items-center justify-between w-full bg-bg-5 py-4 px-6 rounded-[1.25rem]">
              <div className="flex gap-x-3 items-center">
                <span className="block relative h-14 w-14">
                  <Image
                    src="/logos/coinbase-logo.png"
                    alt="wallet-logo"
                    layout="fill"
                    className="rounded-full"
                  />
                </span>
                <div className="flex flex-col">
                  <span className="text-lg font-medium">Metamask</span>
                  <span className="text-txt-2 font-medium">
                    {connectedAddress}{" "}
                  </span>
                </div>
              </div>
              <span className="text-positive-color bg-[#00800022] py-3 px-4 rounded-3xl">
                Connected
              </span>
            </div> */}
            <form action="#" onSubmit={(e) => makeOffer(e)} className="w-full">
              <div className="create-new-nft-wrapper-2 w-full mb-4">
                <div className="create-new-nft-wrapper-2 w-full space-y-6">
                  <Input2
                    name="nft_quantity"
                    placeholder="0"
                    label="Item Quantity"
                    onChange={handleFieldChange}
                    value={nftPayload.nft_quantity}
                  />

                  <>
                    <Input2
                      name="nft_price"
                      placeholder="0.00"
                      label="Your Offer"
                      onChange={handleFieldChange}
                      value={nftPayload.nft_price}
                    />
                    <p>
                      <span className="font-bold text-txt-2 text-base">
                        Insufficient wETH balance,{" "}
                      </span>

                      <span
                        className="earnings-card-history cursor-pointer font-bold"
                        onClick={() => setModalType((prev) => "addFunds")}
                      >
                        Add funds or swap
                      </span>
                    </p>
                  </>
                </div>
              </div>
              {/* <div className="create-new-nft-wrapper-2 w-full">
              <span className="create-new-nft-wrapper-2-label">
                Offer expiration
              </span>
              <Select
                title={bidingExpDates}
                lists={bidExpDates}
                onClick={setBidingExpDates}
              />
            </div> */}
              <div className="create-new-nft-wrapper-2 w-full">
                <span className="create-new-nft-wrapper-2-label">
                  Offer duration
                </span>
                <div className="bidder-date-wrapper">
                  <DateRange
                    ranges={[dateSelected]}
                    onChange={handleRangeSelection}
                    showMonthAndYearPickers={false}
                  />
                  <div className="flex items-center justify-between">
                    <span className="create-new-nft-wrapper-2-label">
                      Select time
                    </span>
                    <TimePicker
                      onChange={setTimeSelected}
                      value={timeSelected}
                    />
                  </div>

                  {/* <Input2
                  type="time"
                  value={timeSelected}
                  onChange={handleTimeChange}
                /> */}
                </div>

                {/* <Input2 type="datetime-local" /> */}
                {/* <Select
                title={bidingExpDates}
                lists={bidExpDates}
                onClick={setBidingExpDates}
              /> */}
              </div>
              {/* <div className="create-new-nft-wrapper-2 w-full">
              <Input2
                label="Quantity"
                name="quantity"
                placeholder="1"
                onChange={handleFieldChange}
                value={nftPayload.coinPrice}
              />
            </div> */}
              <div className="space-y-5 w-full mt-12">
                <div className="flex justify-between items-center w-full">
                  <span className="text-txt-2">Balance</span>
                  <span className="flex gap-x-2 items-center">
                    <CoinIcon />
                    47.8
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-txt-2">Floor Price</span>
                  <span className="flex gap-x-2 items-center">
                    <CoinIcon />
                    0.7
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-txt-2">Best Offer</span>
                  <span className="flex gap-x-2 items-center">
                    <CoinIcon />
                    3.2
                  </span>
                </div>
              </div>
              <div className="mt-12 lg:mt-10 w-full">
                <Button
                  title="Make offer"
                  onClick={(e) => makeOffer(e)}
                  wt="w-full"
                  isDisabled={isTransloading}
                />
              </div>
            </form>
          </div>
        ) : (
          <SwapCard
            ethValue={ethInput}
            wETHvalue={wETHInput}
            setEthValue={setEthInput}
            setWETHvalue={setWETHInput}
            handleEthSwap={handleEthSwap}
          />
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default ViewUnlistedNFT;
