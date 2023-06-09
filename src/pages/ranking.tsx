import { useState } from "react";
import { Heading2, Select } from "../components/atoms";
import { NftList, Tab2 } from "../components/molecules";
import { Footer } from "../components/organisms";
import DashboardLayout from "../template/DashboardLayout";

const Ranking = () => {
  const [currentTab, setCurrentTab] = useState("1 h");
  const [currentChain, setCurrentChain] = useState("on chain");

  const tabs = ["1 h", "6 h", "24 h", "1 w", "1 m", "All"];

  const chainSelect = ["on chain", "off chain"];

  const rankings = [
    { imgUrl: "/images/ape.png", owner: "CloneX", verified: true },
    { imgUrl: "/images/ape.png", owner: "Vibey Ape", verified: true },
    { imgUrl: "/images/ape.png", owner: "Griggs", verified: false },
    { imgUrl: "/images/ape.png", owner: "Pickle Ape", verified: false },
    { imgUrl: "/images/ape.png", owner: "Ape", verified: false },
    { imgUrl: "/images/ape.png", owner: "Pickle", verified: false },
  ];
  const listHeadings = ["collection", "volume", "floor price"];
  return (
    <DashboardLayout>
      <div className="collection-page-top">
        <div className="collection-page-sub-top">
          <Heading2 title="Ranking" />
          <Select
            title="All chains"
            lists={chainSelect}
            onClick={setCurrentChain}
            placeholder={currentChain}
          />
        </div>
        <Tab2 tabs={tabs} activeTab={currentTab} setActiveTab={setCurrentTab} />
      </div>
      <div className="collection-page-lists">
        <NftList
          headings={listHeadings}
          lists={rankings}
          url="/single-collection"
        />
      </div>
    </DashboardLayout>
  );
};

export default Ranking;
