// @ts-nocheck
import { ethers } from "ethers";
import { disconnectWallet } from "./authFunction";
import APPCONFIG from "@/src/constants/Config";
import wEthAbi from "@/src/artifacts/wEthAbi.json";

export const getNetworkDetails = async () => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const { chainId } = await provider.getNetwork();
  return chainId;
};

export const findEvents = (
  eventName: string,
  eventsList: [],
  addArgs: boolean
) => {
  if (eventsList.length > 0) {
    for (var i = 0; i <= eventsList.length; i++) {
      if (
        eventsList[i] &&
        eventsList[i] !== undefined &&
        eventsList[i].event &&
        eventsList[i].event !== undefined &&
        eventsList[i].event == eventName
      ) {
        if (addArgs !== undefined && addArgs == true) {
          return eventsList[i].args;
        } else {
          return true;
        }
      }
    }
    return false;
  }
};

//@ts-ignore
export const findTrnxHash = (eventName, eventsList) => {
  if (eventsList.length > 0) {
    for (var i = 0; i <= eventsList.length; i++) {
      if (
        eventsList[i] &&
        eventsList[i] !== undefined &&
        eventsList[i].event &&
        eventsList[i].event !== undefined &&
        eventsList[i].event == eventName
      ) {
        return eventsList[i].transactionHash;
      }
    }
    return null;
  }
};

export const account_listener = () => {
  try {
    if (!(window as any).ethereum) {
      //check if Metamask wallet is not installed
      return;
    }
    if (
      typeof (window as any).ethereum === "undefined" ||
      (window as any).ethereum === null ||
      (window as any).ethereum === "undefined" ||
      (window as any).ethereum === ""
    ) {
      return;
    } else {
      (window as any).ethereum.on("accountsChanged", function () {
        disconnectWallet();
      });

      (window as any).ethereum.on("networkChanged", function () {
        disconnectWallet();
      });
    }
  } catch (error) {
    return;
  }
};

export const getWalletBalance = async (address: string) => {
  var balanceInEth = 0 + " ETH";
  const balance = getNetworkDetails().then((chainId) => {
    if (chainId) {
      // const provider = new ethers.providers.JsonRpcProvider('');
      // [In reply to Boniface]
      // const provider = new ethers.providers.AlchemyProvider("rinkeby", 'g5UObLj-OFZHyAD_nrEmGZNS0zPiPFKz')
      try{
        const provider = new ethers.providers.InfuraProvider(
          "goerli",
          process.env.NEXT_PUBLIC_INFURA_ID
        );
        if (address !== null) {
          return provider.getBalance(address).then((balance) => {
            // convert a currency unit from wei to ether
            balanceInEth = ethers.utils.formatEther(balance);
            balanceInEth = Number(
              Math.round(parseFloat(balanceInEth + "e" + 5)) + "e-" + 5
            ).toFixed(5); //Balance in 5 decimal places
            balanceInEth = balanceInEth + " ETH";
            return balanceInEth;
          });
        } else {
          return balanceInEth;
        }
      }
      catch(err){
        return balanceInEth;
      }
      }
      else {
        return balanceInEth;
      }
      
  });
  return balance; //Response from the variable chainId is assigned to the right variable
};

export const getWalletWEthBalance = async (address: string) => {
  var balanceInEth = 0 + " WETH";

  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    APPCONFIG.wEthAddress_testnet,
    wEthAbi,
    signer
  );

  if (address !== null) {
    return contract.balanceOf(address).then((balance) => {
      // convert a currency unit from wei to ether
      balanceInEth = ethers.utils.formatEther(balance);

      balanceInEth = Number(
        Math.round(parseFloat(balanceInEth + "e" + 5)) + "e-" + 5
      ).toFixed(5); //Balance in 5 decimal places
      // balanceInEth = balanceInEth + " ETH";

      return balanceInEth;
    });
  } else {
    return balanceInEth;
  }
};

export const swapEthforWEth = async (amount: number) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    APPCONFIG.wEthAddress_testnet,
    wEthAbi,
    signer
  );
  if (amount !== null) {
    const coreAmount = ethers.utils.parseUnits(amount.toString(), "ether");
    const transaction = await contract.deposit({ value: coreAmount });
    const tnx = await transaction.wait();
  }
};

export const swapWEthforEth = async (amount: number) => {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    APPCONFIG.wEthAddress_testnet,
    wEthAbi,
    signer
  );
  if (amount !== null) {
    const coreAmount = ethers.utils.parseUnits(amount.toString(), "ether");
    const transaction = await contract.withdraw(coreAmount);
    const tnx = await transaction.wait();
  }
};
