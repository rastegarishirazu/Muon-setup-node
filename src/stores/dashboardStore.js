import { defineStore } from "pinia";
import {
  approve,
  checkApproved,
  stake,
  mint,
  newAddNode,
  getBalanceaOfTokenTest,
  rewardChecker,
} from "@/utils/transactions";
import { getNodeInfo, checkIP } from "@/utils/fetch";
import moment from "moment";
import { ValidateIPaddress } from "@/utils/formatChecker";
const mainChainId = 0x61;

const STEPS = {
  mint: 1,
  approve: 2,
  addNode: 3,
  newNode: 4,
  beforHaveNode: 5,
  haveNode: 6,
};

export const useDashboardStore = defineStore("dashboardStore", {
  state: () => ({
    provider: null,
    nodeIpStatus: "",
    cardLoading: true,
    copySnackbar: false,
    dialog: false,
    steps: STEPS,
    heightSize: Number,
    account: "",
    addressShow: "connect Wallet",
    web3: "",
    currntIdChain: "",
    isCorrectChain: false,
    isConnected: false,
    e1: 1,
    isApproved: false,
    stakeAmount: 1000,
    peerId: "",
    nodeAddress: "",
    totalStake: 0,
    haveNode: false,
    tokenTestBalance: 0,
    haveEnoughTokenTEst: false,
    mintAmount: 1000,
    nativeTokenBalance: 0,
    nodeInfo: {},
    btnLoading: false,
    nodeIsActive: "Loading...",
    nodeUptime: "",
    rewardAmount: 0,
    downNodeTimes: [],
    nodeIPInput: "",
    checkHaveNodeInterval: Object,
    dialogContext: { text: String },
    nodeDetailsDialogModel: false,
    stakerAddress: "",
    isIPValid: true,
    ipCheckLoading: false,
    minMint: [
      (value) => !!value || "Required.",
      (value) => (value && value <= 1000 && value > 0) || "min:1 , max:1000",
    ],
    minStakeAmount: [
      (value) => !!value || "Required.",
      (value) =>
        (value && value >= 1000 - totalStake) || "At least 1000 test tokens",
    ],
  }),

  // computed
  getters: {},

  // method
  actions: {
    addressToShort(address) {
      return (
        address.slice(0, 4) +
        "..." +
        address.slice(address.length - 4, address.length)
      );
    },
    getNativeBalance() {
      this.web3.eth.getBalance(this.account).then((res) => {
        const balance = this.web3.utils.fromWei(res);
        this.nativeTokenBalance = Number(balance);
        if (res === "0") {
          this.dialog = true;
          this.dialogContext.text = `
          <h4
                  class="myFont blackText--text text-h6 mt-10 underlite_dialog"
                >
                  Not enough gas...
                </h4>
                <p class="myFont blackText--text text-center mt-5">
                  You need more TEST BNB as gas tokens to use the dashboard.<br />
                  Use the following faucet to get some.
                </p>

                <a
                  class="primaryOrange--text"
                  target="_blank"
                  href="https://testnet.bnbchain.org/faucet-smart"
                  >BNB Smart Chain Faucet</a
                >
          `;
        }
      });
    },
    mint() {
      this.btnLoading = true;
      mint(this.account, this.web3, this.mintAmount)
        .then((res) => {
          this.getTokenTestBalance();
          this.e1 = this.steps.approve;
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
    getTokenTestBalance() {
      getBalanceaOfTokenTest(this.account, this.web3).then((res) => {
        this.tokenTestBalance = res;
      });
    },
    rewardCheck(flag = true) {
      if (flag) {
        rewardChecker(this.account, this.web3).then((res) => {
          this.rewardAmount = Number(res).toFixed(4);
          this.rewardCheck(false);
        });
      } else {
        setTimeout(() => {
          rewardChecker(this.account, this.web3).then((res) => {
            this.rewardAmount = Number(res).toFixed(4);
          });
          this.rewardCheck(false);
        }, 15000);
      }
    },
    checkHaveNode(cardLoadingRefresh = true) {
      if (this.account) {
        if (cardLoadingRefresh) {
          this.cardLoading = true;
        }
        getNodeInfo(this.account)
          // getNodeInfo(28)
          .then((res) => {
            res = res["result"];
            if (res && res != "node not found") {
              this.haveNode = true;
              this.nodeIsActive = "Loading...";
              this.nodeInfo["isNew"] = res["node"]["isNew"];
              if (this.e1 === this.steps.newNode) {
                this.e1 = this.nodeInfo["isNew"]
                  ? this.steps.newNode
                  : this.steps.beforHaveNode;
              } else {
                this.e1 = this.nodeInfo["isNew"]
                  ? this.steps.newNode
                  : this.steps.haveNode;
              }
              this.nodeInfo["active"] = res["node"]["active"];
              const tests = res["node"]["tests"];
              this.nodeInfo["nodeAddress"] = res["node"]["nodeAddress"];
              this.nodeInfo["id"] = res["node"]["id"];
              this.nodeInfo["peerId"] = res["node"]["peerId"];
              this.nodeInfo["startTime"] = moment(
                res["node"]["startTime"] * 1000
              );
              if (res["node"]["endTime"]) {
                this.nodeInfo["endTime"] = moment(
                  res["node"]["endTime"] * 1000
                );
                this.nodeIsActive = "Exited";
              } else {
                this.nodeInfo["endTime"] = false;
              }
              this.nodeInfo["rewardAmount"] = Number(
                this.web3.utils.fromWei(
                  String(res["reward"]["earned"]),
                  "ether"
                )
              ).toFixed(4);
              this.nodeInfo["nodeIP"] = res["node"]["ip"];
              this.nodeInfo["staked"] = this.web3.utils.fromWei(
                res["reward"]["balance"].toLocaleString("fullwide", {
                  useGrouping: false,
                })
              );
              this.nodeInfo["onlinePercent"] = res["reward"]["onlinePercent"];

              if (this.nodeInfo["active"]) {
                this.nodeIsActive = this.nodeInfo.isNew
                  ? "Your node has been added to the network successfully. Its initialization will take a few minutes."
                  : tests["networking"] && tests["peerInfo"] && tests["status"]
                  ? "Online"
                  : "Offline";
                this.nodeInfo["messages"] = res["messages"];
                this.nodeInfo["rewardPercent"] = res["reward"]["rewardPercent"];
                this.nodeInfo["history"] = res["history"].reverse();

                var messages = [];
                for (var [i, valueFrom] of this.nodeInfo["history"].entries()) {
                  if (!valueFrom["isOnline"]) {
                    var flag = true;
                    var from = valueFrom;
                    // var fromDate = new Date(from["timestamp"] * 1000);
                    var fromDate = moment(from["timestamp"] * 1000);
                    var fromMoment = moment(fromDate);
                    for (var [j, valueTo] of this.nodeInfo["history"]
                      .slice(i)
                      .entries()) {
                      if (valueTo["isOnline"]) {
                        // var toDate = new Date(valueTo["timestamp"] * 1000);
                        var toDate = moment(valueTo["timestamp"] * 1000);
                        var toMoment = moment(toDate);
                        messages.push(
                          `${fromDate.format(
                            "YYYY-M-D H:m:s A"
                          )} until ${toDate.format(
                            "YYYY-M-D H:m:s A"
                          )} for ${toMoment.to(fromMoment, true)}`
                        );
                        flag = false;
                        break;
                      }
                    }
                    if (flag) {
                      messages.push(
                        `${fromDate.format(
                          "YYYY-M-D H:m:s A"
                        )} until now for ${moment().to(fromMoment, true)}`
                      );
                    }
                  }
                }
                this.nodeInfo["downNodeTimes"] = messages;
              }
            } else if (res === "node not found") {
              if (cardLoadingRefresh) {
                this.haveNode = false;
                this.e1 = this.steps.mint;
              }
            } else {
              if (cardLoadingRefresh) {
                this.haveNode = "error";
              }
            }
          })
          .finally(() => {
            this.cardLoading = false;
            if (this.haveNode === "error") {
              this.router.push("/error");
            }
          });
      }
    },
    getNodeAddressPeerIdByIP(ip) {
      if (ip === "aji maji la taraji") {
        this.e1 = 4;
      } else {
        let temp = ip.split("http://");
        ip = temp.length > 1 ? temp[1].split("/")[0] : temp[0].split("/")[0];
        let port = ip.split(":");
        if (port[1]) {
          ip = port[0];
          port = ":" + port[1];
        } else {
          port = "";
        }
        if (ValidateIPaddress(ip)) {
          this.ipCheckLoading = true;
          console.log(ip + port);
          checkIP(ip + port)
            .then((res) => {
              if (res.success) {
                if ("staker" in res.result) {
                  this.stakerAddress = res.result.staker;
                  this.nodeAddress = "";
                  this.peerId = "";
                  this.nodeIpStatus = "info";
                } else {
                  this.nodeAddress = res.result.address;
                  this.peerId = res.result.peerId;
                  this.stakerAddress = false;
                  this.isIPValid = true;
                  this.nodeIpStatus = "success";
                }
              } else {
                this.isIPValid = false;
                this.nodeAddress = "";
                this.peerId = "";
                this.stakerAddress = "";
                this.nodeIpStatus = "error";
                console.log("bad");
              }
            })
            .finally(() => {
              this.ipCheckLoading = false;
            });
        } else {
          this.nodeIpStatus = "invalidIp";
          this.ipCheckLoading = false;
        }
      }
    },
    addNode() {
      this.btnLoading = true;

      newAddNode(this.account, this.web3, this.nodeAddress, this.peerId)
        .then(() => {
          this.checkHaveNode();
          this.getTokenTestBalance();
          this.e1 = this.steps.newNode;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.btnLoading = true;
        });
    },
    stake() {
      stake(this.account, this.web3, this.stakeAmount);
    },
    checkApproved() {
      checkApproved(this.account, this.web3).then((res) => {
        this.isApproved = res;
      });
    },

    async switchToCorrectChain() {
      try {
        await window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            // params: [{ chainId: this.web3.utils.toHex(mainChainId) }],
            params: [{ chainId: this.web3.utils.toHex(mainChainId) }],
          })
          .then(() => {
            this.checkApproved();
          });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "BNB Smart Chain Testnet",
                chainId: this.web3.utils.toHex(mainChainId),
                nativeCurrency: {
                  name: "tBNB",
                  decimals: 18,
                  symbol: "tBNB",
                },
                rpcUrls: ["https://bsc-testnet.publicnode.com"],
                blockExplorerUrls: ["https://testnet.bscscan.com/"],
              },
            ],
          });
        }
      }
    },
    approve() {
      this.btnLoading = true;
      approve(this.account, this.web3)
        .then((res) => {
          this.checkApproved();
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
    connectToMetamask() {
      ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((res) => {
          if (res.length === 0) {
            console.log("Please connect to MetaMask.");
            this.cardLoading = false;
            console.log(this.cardLoading);
          } else {
            const account = res[0];
            this.account = account;
            this.isConnected = true;
            this.checkApproved();
            this.getNativeBalance();
            this.checkHaveNode();
            this.getTokenTestBalance();
          }
        })
        .catch((err) => {
          this.cardLoading = false;
          if (err.code === 4001) {
            console.log("Plase connect to MetaMask");
          } else {
            console.error(err);
          }
        });
    },

    async copyURL(mytext) {
      try {
        await navigator.clipboard.writeText(mytext);
        this.copySnackbar = true;
      } catch ($e) {
        console.log("Cannot copy");
      }
    },
    checkNetwork() {
      if (this.currntIdChain != mainChainId) {
        this.isCorrectChain = false;
        this.cardLoading = false;
      } else {
        this.isCorrectChain = true;
        ethereum
          .request({ method: "eth_accounts" })
          .then((accounts) => {
            if (accounts.length === 0) {
              console.log("Please connect to MetaMask.");
              this.cardLoading = false;
            } else if (accounts.length && this.isCorrectChain) {
              this.connectToMetamask();
            }
          })
          .catch(console.error);
      }
    },
    startApp(provider) {
      // If the provider returned by detectEthereumProvider is not the same as
      // window.ethereum, something is overwriting it, perhaps another wallet.
      if (provider !== window.ethereum) {
        console.error("Do you have multiple wallets installed?");
      }
      // Access the decentralized web!
    },
    async getChainId() {
      ethereum.request({ method: "eth_chainId" }).then((res) => {
        this.currntIdChain = res;
      });
    },
  },
});
