const Contract = {
  address: {
    BSC: {
      MuonTestToken: "0x84102Df4B6Bcb72114532241894B2077428a7f86",
      MuonNodeManager: "0x2efB53c11FC935f6114B3fC37AaFa6a76B263a4E",
      MuonNodeStaking: "0xb48a6aee38427E78851720111092CEAc5B67950a",
    },
  },
  ABI: {
    BSC: {
      MuonTestToken: require("./BSC/MuonTestToken.json"),
      MuonNodeManager: require("./BSC/MuonNodeManager.json"),
      MuonNodeStaking: require("./BSC/MuonNodeStaking.json"),
    },
  },
};

export default Contract;
