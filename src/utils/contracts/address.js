const Contract = {
  address: {
    BSC: {
      MuonTestToken: "0x84102Df4B6Bcb72114532241894B2077428a7f86",
      MuonNodeManager: "0x2efB53c11FC935f6114B3fC37AaFa6a76B263a4E",
      MuonNodeStaking: "0x8d8377edf14314b4c9c35c671955b63f92cf4bdc",
      Minter: "0x4ABC07AAB67eE61546D82b2142a92042B2ee8624",
    },
  },
  ABI: {
    BSC: {
      MuonTestToken: require("./BSC/MuonTestToken.json"),
      MuonNodeManager: require("./BSC/MuonNodeManager.json"),
      MuonNodeStaking: require("./BSC/MuonNodeStaking.json"),
      Minter: require("./BSC/Minter.json"),
    },
  },
};

export default Contract;
