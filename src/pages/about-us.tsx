/* eslint-disable react/jsx-key */
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { Heading2 } from "../components/atoms";
import { BlogCard } from "../components/molecules";
import NftHeader from "../components/molecules/NftHeader";
import { Footer } from "../components/organisms";
import DashboardLayout from "../template/DashboardLayout";

const AboutUs = () => {
  const aboutUs = [
    {
      name: "Founded",
      value: "2022",
      image: "/images/about-us-calendar-2.svg",
    },
    {
      name: "Employees",
      value: "650+",
      image: "/images/about-us-profile-user.svg",
    },
    {
      name: "Collections",
      value: "2M+",
      image: "/images/about-us-shapes.svg",
    },
    {
      name: "NFTs",
      value: "80M+",
      image: "/images/about-us-magicpen.svg",
    },
    {
      name: "Volume",
      value: "$20B+",
      image: "/images/about-us-additem.svg",
    },
  ];
  const blogSection = [
    {
      name: "Introducing Cloudax",
      content:
        "Cloudax is an integrated blockchain ecosystem that consists of 4 core products: A Crypto banking wallet, NFT Marketplace, Web3 Launchpad, and A decentralized exchange.",
      image: "/images/blog-img.svg",
    },
    {
      name: "Cloudax Presale – How to Participate",
      content:
        "Cloudax presale is here, and you are here indicating that you have decided to invest in your future by taking part in the CLDX token sale.",
      image: "/images/blog-presale.svg",
    },
    {
      name: "Stake and Earn - How to Stake $CLDX",
      content:
        "To be announced soon. It would be the biggest token launch of the year.",
      image: "/images/blog-stake.svg",
    },
  ];
  return (
    <DashboardLayout>
      <div className="sub-layout-wrapper scrollbar-hide">
        <div className="center space-y-[3rem]">
          <Heading2 title="About us" />
          <section className="bg-[url('/images/about-us-bg.svg')] bg-cover h-64 w-full grid place-content-center">
            <h1 className=" text-[2.7rem] lg:text-6xl font-bold text-center max-w-5xl leading-snug">
              Making it easier to participate in the cloud-based economy
            </h1>
          </section>
          <article className="flex flex-col gap-y-14">
            <p className="text-xl bg-bg-3 rounded-3xl p-6 lg:p-12 leading-relaxed">
              Cloudax is focusing her innovation on &quot; ease of access,
              security, compatibility, and simplicity&quot; - we want our users
              to have the best experience collecting NFTs - Non-Fungible Tokens.
              Since the first NFT was minted in 2014 by Kevin McCoy, the concept
              has attracted interest from diverse fields, but none could capture
              the idea the way Cloudax has. We are making it easier for everyone
              to participate in this cloud-based economy. We&quot;re expanding
              our scope to contain whatever and widening our reach to include
              whomever.
            </p>
            <p className="text-xl bg-bg-3 rounded-3xl p-6 lg:p-12 leading-relaxed">
              Cloudax innovative NFT Marketplace is broad enough to cover
              whatever you are passionate about; Art, Photography, Real Estate,
              Virtual World, Music, Games, etc. we offer a variety of categories
              that will suit your needs. You can find the best creators and
              digital goods in our innovative marketplace.
            </p>
            <p className="text-xl bg-bg-3 rounded-3xl p-6 lg:p-12 leading-relaxed">
              We are passionate about NFT because of its uniqueness. According
              to Wikipedia, “NFT is a unique digital identifier that cannot be
              copied, substituted, or subdivided, recorded in a blockchain, and
              used to certify authenticity and ownership.” Our NFT Marketplace
              is part of the Cloudax Ecosystem.
            </p>
          </article>
          {/* <section className="flex justify-around">
            {aboutUs.map(({ image, name, value }) => (
              <div
                key={"about-us-section" + name}
                className="flex flex-col items-center"
              >
                <div className="relative h-14 w-14 mb-3">
                  <Image
                    src={image}
                    alt={name + "img"}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <span className="text-2xl font-bold">{value}</span>
                <span className="text-lg text-txt-2">{name}</span>
              </div>
            ))}
          </section> */}
          {/* <section className="lg:w-[80vw] overflow-hidden">
            <NftHeader heading="Blog" />
            <div className="flex gap-x-14 w-[100%] overflow-auto scrollbar-hide">
              {blogSection.map(({ content, image, name }) => (
                <div key={"about-us-blog-section - " + name}>
                  <BlogCard
                    content={content}
                    image={image}
                    name={name}
                    wt="w-[32rem] cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </section> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AboutUs;
