const APPCONFIG = {
  DEFAULT_ITEM_ART: "/assets/images/defaults/song_art.png",
  DEFAULT_USER_AVATAR: "/assets/images/defaults/user_avatar.jpg",
  // SmartContractAddressProxy: "0xCe4C8b5B7C080D0C7067007B3b96A147FF19d8CF",
  SmartContractAddress: "0x39c2b3934f3Ef3253DB40D6D0A11E74b2e290AB1",
  // SmartContractAddressv1: "0xbAc3A78304fe902e87Bdf13F234947FCCb7879fe",
  TOKEN_BASE_URL: process.env.NEXT_PUBLIC_ENV_BASE_URL + "metadata/tokens",
  ITEM_BASE_URL: process.env.NEXT_PUBLIC_ENV_BASE_URL + "metadata",
  ENV_BASE_URL: process.env.NEXT_PUBLIC_ENV_BASE_URL,
  API_BASE_URL: process.env.NEXT_PUBLIC_ENV_BASE_URL + "api/",
  IPFS_ENDPOINT: "https://ipfs.infura.io:5001",
  IPFS_URL: "https://cloudax.infura-ipfs.io/ipfs/",
  OPENSEA_STORE_BASE_URL:
    process.env.NEXT_PUBLIC_ENV_BASE_URL + "metadata/contracts/", // E.g. https://cloudax.xyz/metadata/contracts/cloudax
};

export default APPCONFIG;
