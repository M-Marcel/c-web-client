import { Dispatch, SetStateAction, useState } from "react";
import ConnectWalletStage1 from "./ConnectWalletStage1";
import ConnectWalletTab from "./ConnectWalletTab";

interface IConnectWallet {
  stage: number;
  setStage: Dispatch<SetStateAction<number>>;
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
}

const ConnectWallet = ({
  stage,
  setStage,
  activeTab,
  setActiveTab,
}: IConnectWallet) => {
  return (
    <div className="w-full">
      <ConnectWalletTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 0 ? (
        <ConnectWalletStage1 stage={stage} setStage={setStage} />
      ) : activeTab === 1 ? (
        // <ConnectWalletStage1 />
        <div>tab 2</div>
      ) : activeTab === 2 ? (
        // <ConnectWalletStage1 />
        <div>tab 3</div>
      ) : activeTab === 3 ? (
        // <ConnectWalletStage1 />
        <div>tab 4</div>
      ) : // <ConnectWalletStage1 />
      null}
    </div>
  );
};

export default ConnectWallet;
