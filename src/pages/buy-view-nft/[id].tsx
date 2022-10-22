import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Button, Input2, Select } from "../../components/atoms";
import {
  CaretDown,
  CartIcon,
  CoinIcon,
  LikeIcon,
  StatIcon,
} from "../../components/atoms/vectors";
import { Footer2, Modal } from "../../components/organisms";
import DashboardLayout from "../../template/DashboardLayout";
import EyeIcon from "@/src/components/atoms/vectors/eye-icon";

const ViewNft = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModaltype] = useState("buy");

  const [viewNftStage, setViewNftStage] = useState("overview");
  const nftOwnersInfo = [
    {
      label: "Creator",
      value: "0x7a20d...9257",
      img: "/images/nftsample2.png",
    },
    { label: "Current Owner", value: "Jakes💸", img: "/images/nftsample3.png" },
  ];
  const viewNftStages = ["overview", "properties", "bids", "history"];
  const nftProperties = [
    { label: "dna", value: "human", trait: 19 },
    { label: "eyewear", value: "cyber bindi", trait: 16 },
    { label: "hair", value: "blind curtains", trait: 1 },
    { label: "eye color", value: "black binds", trait: 20 },
  ];
  const nftBids = [
    {
      imgUrl: "/images/nftsample2.png",
      bidder: "Qweqwe58",
      time: "1 week",
      expiresIn: "7 days",
    },
    {
      imgUrl: "/images/nftsample3.png",
      bidder: "dkizzr",
      time: "2 weeks",
      expiresIn: "5 weeks",
    },
    {
      imgUrl: "/images/nftsample2.png",
      bidder: "jakes",
      time: "4 weeks",
      expiresIn: "7 weeks",
    },
  ];
  const nftHistory = [
    {
      imgUrl: "/images/nftsample2.png",
      owner: "0x19f...1138",
      date: "02/09/2022",
      txn: "listed for",
      time: "10:52",
    },
    {
      imgUrl: "/images/profile-nft.png",
      owner: "zara",
      receiver: "0x19f...1138",
      date: "02/08/2022",
      txn: "transferred to",
      time: "19:56",
      icon: "/vectors/export.svg",
    },
    {
      imgUrl: "/images/nftsample3.png",
      owner: "jakes💸",
      date: "02/09/2022",
      txn: "purchased for",
      time: "10:52",
    },
    {
      imgUrl: "/images/nftsample2.png",
      owner: "0xb4d...002d",
      date: "02/08/2022",
      txn: "accepted bid",
      time: "19:56",
      icon: "/vectors/export.svg",
    },
  ];

  const handleBuy = () => {
    {
      /*write your payment info here*/
    }
    setShowModal((prev) => !prev);
  };
  const handleBid = () => {
    {
      /*write your bid info here*/
    }
    setShowModal((prev) => !prev);
    setModaltype("buy");
  };
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper">
        <div className="center space-y-8">
          <div className="view-wrapper-hero grid-cols-[0.5fr_1fr]">
            <div className="relative">
              <Image
                src="/images/buyNftSample.png"
                alt="buy-nft-sample"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-5">
                  <div className="h-[2.125rem] w-[2.125rem] relative mr-4">
                    <Image
                      src="/images/colx_id.png"
                      alt="colx-img"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </div>
                  <span className="text-lg mr-1">CloneX</span>
                  <div className="h-5 w-5 relative">
                    <Image
                      src="/images/verify.svg"
                      alt="colx-img"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                  </div>
                </div>
                <span className="text-2xl font-bold">CloneX #3119</span>
              </div>
              <div className="view-hero-nft-owner">
                {nftOwnersInfo.map(({ img, label, value }) => (
                  <div key={value} className="flex items-center gap-x-4">
                    <div className="relative h-14 w-14">
                      <Image
                        src={img}
                        alt={label + value}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-txt-2">{label}</span>
                      <span>{value}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="view-hero-nft-cta-wrapper">
                <div className="flex w-full gap-x-6">
                  <div className="p-3 bg-bg-5 rounded-[1.25rem] w-full">
                    <span className="text-txt-2 block mb-4">Price</span>
                    <div className="">
                      <span className="flex items-center text-[1.5rem] -ml-2">
                        <CoinIcon />
                        6.95
                      </span>
                      <span className="text-lg block mt-2">$5,954,532</span>
                    </div>
                  </div>
                  <div className="p-3 bg-bg-5 rounded-[1.25rem] w-full">
                    <span className="text-txt-2 block mb-4">
                      Highest floor bid
                    </span>
                    <div>
                      <span className="flex items-center -ml-2 text-[1.5rem]">
                        <CoinIcon />
                        51k
                      </span>
                      <span className="text-lg flex items-center mt-2 text-txt-2 gap-x-2">
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
                </span>
                <div className="w-full flex flex-col gap-y-4">
                  <div className="flex gap-x-5">
                    <Button
                      title="Buy now"
                      twClasses="w-full"
                      onClick={() => {
                        setModaltype("buy");
                        setShowModal((prev) => !prev);
                      }}
                    />
                    <span className="h-[3.625rem] w-[3.625rem] grid place-items-center bg-bg-5 rounded-md">
                      <CartIcon />
                    </span>
                  </div>
                  <Button
                    title="Place a bid"
                    twClasses="w-full"
                    outline2
                    onClick={() => {
                      setModaltype("bid");
                      setShowModal((prev) => !prev);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-x-6 mt-6 items-center">
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
            </div>
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
                    <p className="text-txt-2">
                      20,000 next-gen Avatars, by RTFKT and Takashi Murakami 🌸
                    </p>
                    <p className="text-txt-2">
                      If you own a clone without any Murakami trait please read
                      the terms regarding RTFKT - Owned Content...
                    </p>
                  </div>
                  <span className="flex items-center gap-x-2 text-txt-3 font-medium">
                    See more
                    <span>
                      <CaretDown color="lightgray" />
                    </span>
                  </span>

                  <div className="view-nft-details">
                    <h2 className="text-2xl font-bold my-4">Details</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-x-2">
                        <CoinIcon />{" "}
                        <span className="block font-medium ml-2">Ethereum</span>{" "}
                        <span className="text-txt-2">(ERC-721)</span>
                      </div>
                      <div className="flex items-center gap-x-2">
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
                      </div>
                      <div className="flex items-center gap-x-2">
                        <EyeIcon />{" "}
                        <span className="block font-medium">Open original</span>{" "}
                        <span className="relative h-5 w-5 cursor-pointer">
                          <Image
                            src="/vectors/export.svg"
                            alt="external link"
                            layout="fill"
                            objectFit="cover"
                          />
                        </span>
                      </div>
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
                {nftBids.map(({ bidder, expiresIn, imgUrl, time }) => (
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
                ))}
              </div>
            ) : viewNftStage === "history" ? (
              <div className="flex flex-col gap-y-6">
                {nftHistory.map(
                  ({ imgUrl, time, date, owner, txn, icon, receiver }) => (
                    <div
                      key={owner}
                      className="flex items-center justify-between bg-bg-5 py-4 pl-6 pr-8 rounded-xl"
                    >
                      <div className="flex items-center gap-x-4">
                        <div className="h-16 w-16 relative">
                          <Image
                            src={imgUrl}
                            alt={owner}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-x-2">
                            <span className="text-xl font-bold">{owner}</span>
                            <span className="text-xl font-bold text-txt-2">
                              {txn}
                            </span>
                            {receiver && (
                              <span className="text-xl font-bold">
                                {receiver}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-x-2">
                            <span className="font-medium text-txt-2">
                              {date}
                            </span>
                            <span className="font-medium text-txt-2">
                              {time}
                            </span>
                            {icon && (
                              <span className="relative h-5 w-5 cursor-pointer">
                                <Image
                                  src={icon}
                                  alt={txn}
                                  layout="fill"
                                  objectFit="cover"
                                />
                              </span>
                            )}
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
                  )
                )}
              </div>
            ) : null}
          </div>
        </div>
        <Footer2 />
      </div>
      <Modal
        title={modalType === "buy" ? "Checkout" : "Place a bid"}
        openModal={showModal}
        closeModal={setShowModal}
        modalWt="w-[40rem]"
      >
        {modalType === "bid" ? (
          <div className="flex flex-col items-center max-w-[85%] mx-auto gap-y-5">
            <span className="font-bold text-txt-2 text-base max-w-[80%] text-center">
              You are about to place a bid for{" "}
              <span className="text-txt-2">Express Depot </span>
              from <span className="text-txt-2">Town Star collection.</span>
            </span>
            <div className="flex items-center justify-between w-full bg-bg-5 py-4 px-6 rounded-[1.25rem]">
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
                  <span className="text-lg font-medium">Coinbase</span>
                  <span className="text-txt-2 font-medium">0xb4d...002d </span>
                </div>
              </div>
              <span className="text-positive-color bg-[#00800022] py-3 px-4 rounded-3xl">
                Connected
              </span>
            </div>

            <div className="create-new-nft-wrapper-2 w-full">
              <span className="create-new-nft-wrapper-2-label">Your bid</span>
              <div className="create-new-nft-price">
                <Select title="ETH" icon={<CoinIcon />} />
                <Input2
                  name="coinPrice"
                  placeholder="0.00"
                  // onChange={handleFieldChange}
                  // value={nftPayload.coinPrice}
                />
              </div>
            </div>
            <div className="create-new-nft-wrapper-2 w-full">
              <span className="create-new-nft-wrapper-2-label">
                Bid expiration
              </span>
              <Select title="7 days" />
            </div>
            <div className="create-new-nft-wrapper-2 w-full">
              <Input2
                label="Quantity"
                name="quantity"
                placeholder="1"
                // onChange={handleFieldChange}
                // value={nftPayload.coinPrice}
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-txt-2">Balance</span>
              <span className="flex">
                <CoinIcon />
                47.8
              </span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-txt-2">Service Fee (0%)</span>
              <span className="flex">
                <CoinIcon />0
              </span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-txt-2">You Will Pay</span>
              <span className="flex">
                <CoinIcon />
                6.95
              </span>
            </div>
            <Button title="Place bid" onClick={handleBid} twClasses="w-full" />
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-[85%] mx-auto gap-y-5">
            <span className="font-bold flex gap-x-1 ">
              You are about to purchase
              <span className="text-txt-2">CloneX#821</span>
              from
              <span className="text-txt-2">Jakes💸</span>
            </span>
            <div className="flex items-center justify-between w-full bg-bg-5 py-4 px-6 rounded-[1.25rem]">
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
                  <span className="text-lg font-medium">Coinbase</span>
                  <span className="text-txt-2 font-medium">0xb4d...002d </span>
                </div>
              </div>
              <span className="text-positive-color bg-[#00800022] py-3 px-4 rounded-3xl">
                Connected
              </span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-txt-2">Balance</span>
              <span className="flex">
                <CoinIcon />
                47.8
              </span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-txt-2">Service Fee (0%)</span>
              <span className="flex">
                <CoinIcon />0
              </span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-txt-2">You Will Pay</span>
              <span className="flex">
                <CoinIcon />
                6.95
              </span>
            </div>
            <Button title="Pay" onClick={handleBuy} />
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default ViewNft;