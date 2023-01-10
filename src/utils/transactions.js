import Web3 from "web3";
import Contract from "./contracts/address";
const myWeb3 = new Web3();
const muonTestnetTokenAddress = Contract.address.BSC.MuonTestToken;
const muonTestnetTokenABI = Contract.ABI.BSC.MuonTestToken;

const stakingContractAdress = Contract.address.BSC.MuonNodeStaking;
const stakingCOntractABI = Contract.ABI.BSC.MuonNodeStaking;

const nodeManagerAddress = Contract.address.BSC.MuonNodeManager;
const nodeManagerABI = Contract.ABI.BSC.MuonNodeManager;

const DECIMAL = Math.pow(10, 18);
const MAXUINT256 = myWeb3.utils.toBN(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);

const approve = (account, web3) => {
  const contract = new web3.eth.Contract(
    muonTestnetTokenABI,
    muonTestnetTokenAddress
  );
  const res = contract.methods
    .approve(stakingContractAdress, MAXUINT256)
    .send({ from: account });
  return res;
};

const checkApproved = async (account, web3) => {
  const contract = new web3.eth.Contract(
    muonTestnetTokenABI,
    muonTestnetTokenAddress
  );
  const value = await contract.methods
    .allowance(account, stakingContractAdress)
    .call();
  console.log(typeof value);
  if (value >= 1000 * DECIMAL) {
    return true;
  }
  return false;
};

const stake = async (account, web3, amount) => {
  const contract = new web3.eth.Contract(
    stakingCOntractABI,
    stakingContractAdress
  );
  let strAmount = String(amount);
  let add = strAmount + "000000000000000000";
  // let finalAmount = BigInt(add);
  contract.methods.stake(add).send({ from: account });
};
const addMuonNode = async (account, web3, nodeAddress, peerId) => {
  const contract = new web3.eth.Contract(
    stakingCOntractABI,
    stakingContractAdress
  );
  contract.methods.addMuonNode(nodeAddress, peerId).send({ from: account });
};
const howMuchStake = async (account, web3) => {
  const contract = new web3.eth.Contract(
    stakingCOntractABI,
    stakingContractAdress
  );
  let res = await contract.methods.users(account).call();
  res = res / DECIMAL;
  return res;
};

const haveNode = async (account, web3) => {
  const contract = new web3.eth.Contract(nodeManagerAddress, nodeManagerABI);
  const res = await contract.methods.addMuonNode(account).call();
  if (res > 0) {
    return res;
  }
  return false;
};

const newAddNode = async (account, web3, nodeAddress, peerId) => {
  const contract = new web3.eth.Contract(
    stakingCOntractABI,
    stakingContractAdress
  );
  contract.methods
    .addMuonNode(nodeAddress, peerId, myWeb3.utils.toWei("1000", "ether"))
    .send({ from: account });
};

const getBalanceaOfTokenTest = async (account, web3) => {
  const contract = new web3.eth.Contract(
    muonTestnetTokenABI,
    muonTestnetTokenAddress
  );
  const res = await contract.methods.balanceOf(account).call();
  const balance = myWeb3.utils.fromWei(res, "ether");
  return balance;
};

const mint = async (account, web3, amount) => {
  const contract = new web3.eth.Contract(
    muonTestnetTokenABI,
    muonTestnetTokenAddress
  );
  const amountForTrx = myWeb3.utils.toWei(String(amount), "ether");
  const res = await contract.methods
    .mint(account, amountForTrx)
    .send({ from: account });
  return res;
};

export {
  approve,
  checkApproved,
  stake,
  addMuonNode,
  howMuchStake,
  haveNode,
  newAddNode,
  getBalanceaOfTokenTest,
  mint,
};
