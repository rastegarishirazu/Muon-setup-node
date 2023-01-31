<template>
  <v-app
    :class="[
      $vuetify.theme.dark ? 'backgorundpic_dark' : 'backgorundpic_light',
    ]"
  >
    <particles></particles>
    <Header
      :addressShow="addressShow"
      :aliceBalance="muonTestTokenShow"
      :connectWallet="connectToMetamask"
      :switchNetwork="switchToCorrectChain"
      :isCorrectChain="isCorrectChain"
      :isConnected="isConnected"
    ></Header>

    <v-main>
      <v-responsive
        width="100%"
        overflow-hidden
        class="overflow-hidden px-5 mt-4"
      >
        <!-- <v-row justify="center" class="my-2">
          <v-col> <h1 class="main_title">ALICE testnet</h1></v-col>
        </v-row> -->
        <v-row
          :class="[
            ' pb-15',
            $vuetify.breakpoint.smAndDown ? '' : 'full_height',
          ]"
        >
          <v-col
            class="mt-15"
            align-self="center"
            md="6"
            cols="12"
            offset-md="3"
          >
            <v-card
              :class="['px-5', $vuetify.theme.dark ? 'backgorundpic_dark' : '']"
              elevation="2"
            >
              <div class="d-flex justify-center" width="100%">
                <div class="title_card_box text-center py-5">
                  <h2 class="title_card_box_font text-h4">Adding a Node</h2>
                  <h3 class="subtitle_card_box_font text-h6">
                    To the ALICE Network
                  </h3>
                </div>
              </div>
              <v-row class="my-10 py-10" justify="center" v-if="cardLoading">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-row>
              <v-row
                class="my-5"
                v-else-if="!haveNode || !isConnected || !isCorrectChain"
              >
                <v-stepper
                  v-if="isCorrectChain && isConnected"
                  v-model="e1"
                  class="full-width my-2"
                  elevation="0"
                >
                  <v-stepper-header class="px-8 stepper_header_text">
                    <v-stepper-step
                      color="primaryOrange"
                      :complete="e1 > steps.mint"
                      :step="steps.mint"
                    >
                      Mint
                    </v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step
                      color="primaryOrange"
                      :complete="e1 > steps.approve"
                      :step="steps.approve"
                    >
                      Approve
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step color="primaryOrange" :step="steps.addNode">
                      Add node
                    </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items class="finger_print_background">
                    <v-stepper-content :step="steps.mint">
                      <v-row class="mt-5 px-5" justify="center">
                        <h5
                          v-if="!haveEnoughTokenTEst"
                          class="text-center px-3 enough_tokens_message py-3"
                        >
                          You don't have enough tokens.<br />
                          You need at least 1000 ALICE..
                        </h5>
                      </v-row>
                      <v-row justify="center">
                        <p class="myFont font-weight-medium">
                          Your ALICE token balance ≈
                          {{ muonTestTokenShow }}
                          <v-btn
                            @click="getTokenTestBalance"
                            class="mt-n1 mx-1"
                            icon
                            ><v-icon>mdi-refresh-circle</v-icon></v-btn
                          >
                        </p>
                      </v-row>

                      <v-row class="" justify="center">
                        <v-col md="8">
                          <span class="text-caption myFont pb-3">Mint:</span>
                          <v-text-field
                            label="Mint amount"
                            solo
                            v-model="mintAmount"
                            :rules="minMint"
                            type="number"
                            step="100"
                            background-color="#e9eff6bf"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row justify="center">
                        <v-col md="4">
                          <v-btn
                            @click="mint"
                            block
                            :disabled="mintAmount > 1000 || mintAmount < 1"
                            color="primary"
                            class="mb-5 mx-2 text-capitalize"
                            >Mint</v-btn
                          >
                        </v-col>
                        <v-col md="4">
                          <v-btn
                            @click="e1 = steps.approve"
                            color="primary"
                            block
                            class="mx-2 text-capitalize"
                            :disabled="!haveEnoughTokenTEst"
                            >Next Step</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-stepper-content>
                    <v-stepper-content :step="steps.approve">
                      <v-row justify="center" class="my-5">
                        <v-btn @click="approve" color="primary" class=""
                          >approve</v-btn
                        >

                        <v-btn @click="checkApproved" class="mx-1" icon
                          ><v-icon>mdi-refresh-circle</v-icon></v-btn
                        >
                      </v-row>
                    </v-stepper-content>

                    <v-stepper-content :step="steps.addNode">
                      <div v-if="!haveNode">
                        <h5
                          v-if="!haveEnoughTokenTEst"
                          class="text-center px-3"
                        >
                          You have't enough token. You need another
                          {{ 1000 - tokenTestBalance }}.
                        </h5>
                        <div class="full-width text-center px-8 mt-5">
                          <p class="myFont font-weight-bold">
                            Note: While adding your node, you will automatically
                            stake 1000 ALICE tokens.
                          </p>
                        </div>
                        <v-row class="mt-5"
                          ><v-text-field
                            :disabled="!haveEnoughTokenTEst"
                            class="px-5"
                            label="Node Address"
                            v-model="nodeAddress"
                            :rules="addressCheck"
                            hide-details="auto"
                          ></v-text-field
                        ></v-row>
                        <v-row class="mb-5"
                          ><v-text-field
                            :disabled="!haveEnoughTokenTEst"
                            class="px-5"
                            label="Peer Id"
                            v-model="peerId"
                            hide-details="auto"
                          ></v-text-field
                        ></v-row>
                        <v-row class="mb-5" justify="space-between">
                          <v-col>
                            <v-btn @click="e1 = 1" color="primary"
                              >back to mint</v-btn
                            >
                          </v-col>
                          <v-col class="text-right">
                            <v-btn
                              :disabled="!haveEnoughTokenTEst"
                              color="primary"
                              @click="addNode"
                            >
                              Add node
                            </v-btn>
                          </v-col>
                        </v-row>
                      </div>
                      <div v-else>
                        <v-row class="my-5" justify="cetner">
                          <v-col cols="10" class="text-center">
                            <v-icon class="text-h1" color="green">
                              mdi-check-decagram
                            </v-icon>
                          </v-col>
                        </v-row>
                      </div>
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>

                <v-col
                  offset=""
                  cols="4"
                  v-if="!isCorrectChain || !isConnected"
                  class="text-center"
                >
                  <div
                    class="setp_box text-center primaryOrange white--text rounded-lg py-3"
                    width="100%"
                  >
                    Step 1
                  </div>
                  <div class="d-flex justify-center">
                    <div class="divider_step_box height-80"></div>
                  </div>
                  <div
                    class="setp_box text-center gray rounded-lg py-3"
                    width="100%"
                  >
                    Step 2
                  </div>
                  <div class="d-flex justify-center">
                    <div class="border-dashed height-80"></div>
                  </div>
                  <div
                    class="setp_box text-center gray rounded-lg py-3"
                    width="100%"
                  >
                    Step 3
                  </div>
                </v-col>
                <v-col
                  offset=""
                  cols="8"
                  v-if="!isCorrectChain || !isConnected"
                >
                  <div class="setp_box">
                    <h5 class="myFont font-weight-light text-h6">
                      Mint 1000 ALICE Tokens
                    </h5>
                    <h6 class="myFont text-caption">
                      to your wallet, using the button below.
                    </h6>
                  </div>
                  <div class="height-80"></div>
                  <div class="step_box">
                    <h5 class="myFont font-weight-light text-h6">
                      Approve the Staking Contract
                    </h5>
                    <h6 class="myFont text-caption">
                      to be able to deposit your tokens.
                    </h6>
                  </div>
                  <div class="height-80"></div>
                  <div class="step_box">
                    <h5 class="myFont font-weight-light text-h6">
                      Add your Node to the Network
                    </h5>
                    <h6 class="myFont text-caption">
                      and start securing the network!
                    </h6>
                  </div>
                </v-col>

                <!-- <v-btn @click="approve" color="success"> approve </v-btn> -->
              </v-row>
              <div v-else>
                <v-row justify="center">
                  <h3 class="myFont py-10 mt-10 black--text text-h5">
                    Your node has been added to the network.
                  </h3>
                </v-row>
                <v-row>
                  <v-col>
                    <ul>
                      <li>Node ID: {{ nodeInfo.id }}</li>
                      <li>Node address: {{ nodeInfo.nodeAddress }}</li>
                      <li>Reward: {{ rewardAmount }}</li>
                    </ul>
                  </v-col>
                  <v-col>
                    <ul>
                      <li>Peer ID: {{ nodeInfo.peerId }}</li>
                      <li>Status: {{ nodeIsActive }}</li>
                    </ul>
                  </v-col>
                </v-row>
              </div>
              <div
                v-if="!isCorrectChain || !isConnected"
                class="d-flex justify-center"
              >
                <div class="footer_card px-10 pt-8">
                  <v-btn
                    v-if="isCorrectChain && !isConnected"
                    block
                    color="primary"
                    @click="connectToMetamask"
                    >connect Wallet</v-btn
                  >
                  <v-btn
                    v-if="!isCorrectChain"
                    block
                    color="primary"
                    @click="switchToCorrectChain"
                  >
                    switch network
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-dialog
          v-if="isCorrectChain && isConnected"
          dark
          v-model="dialog"
          width="500"
        >
          <v-card color="#fff">
            <v-card-text v-if="reapetedNodeAdressDialog">
              <v-row class="mt-5 px-5" justify="center">
                <h4
                  class="myFont blackText--text text-h6 mt-10 underlite_dialog"
                >
                  wrong!
                </h4>
                <p class="myFont blackText--text text-center mt-5">
                  This node address has already been added.
                </p>
              </v-row>
            </v-card-text>
            <v-card-text v-else>
              <v-row class="mt-5 px-5" justify="center">
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
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false"> OK! </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-responsive>
    </v-main>
    <v-footer padless>
      <v-col cols="12" class="text-center myFont">
        <div class="d-flex align-center text-center justify-center">
          <span class="mx-2 myFont">Powered by</span>
          <img src="@/assets/muon-logo1.svg" alt="" />
        </div>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Web3 from "web3";
import {
  approve,
  checkApproved,
  stake,
  mint,
  haveNode,
  newAddNode,
  getBalanceaOfTokenTest,
  nodeAdressIsValid,
  rewardChecker,
} from "@/utils/transactions";
import { getNodeInfo } from "@/utils/fetch";
import particles from "@/components/Particles";
import Header from "@/components/Header.vue";
const mainChainId = 0x61;
const STEPS = {
  mint: 1,
  approve: 2,
  addNode: 3,
};
export default {
  name: "App",

  components: { Header, particles },

  data: () => ({
    cardLoading: false,
    TR: true,
    themeIsDark: false,
    dialog: false,
    steps: STEPS,
    heightSize: Number,
    account: "",
    addressShow: "connect Wallet",
    web3: "",
    currntIdChain: NaN,
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
    haveNode: false,
    mintAmount: 1000,
    nativeTokenBalance: 0,
    nodeInfo: Object,
    nodeIsActive: "Loading...",
    nodeUptime: "",
    reapetedNodeAdressDialog: false,
    rewardAmount: 0,
    minMint: [
      (value) => !!value || "Required.",
      (value) => (value && value <= 1000 && value > 0) || "min:1 , max:1000",
    ],
    minStakeAmount: [
      (value) => !!value || "Required.",
      (value) =>
        (value && value >= 1000 - totalStake) || "At least 1000 test tokens",
    ],
    addressCheck: [
      (value) => !!value || "Required.",
      (value) => (value && value.length === 42) || "The address is wrong.",
    ],
  }),
  watch: {
    themeIsDark(newState, oldState) {
      this.$vuetify.theme.dark = newState;
      localStorage.themeIsDark = newState;
    },
    isConnected(newState, oldState) {
      if (newState) {
        this.getTokenTestBalance();
      } else {
        this.addressShow = "connect Wallet";
      }
    },
    tokenTestBalance(newBalance, oldBalance) {
      if (newBalance >= 1000) {
        this.haveEnoughTokenTEst = true;
      } else {
        this.haveEnoughTokenTEst = false;
      }
    },
    isApproved() {
      if (this.isApproved && this.e1 === this.steps.approve) {
        this.e1 = this.steps.addNode;
      }
    },
    currntIdChain() {
      this.checkNetwork();
    },
    account() {
      if (this.account) {
        this.isConnected = true;
      }
      this.addressShow =
        this.account.slice(0, 4) +
        "..." +
        this.account.slice(this.account.length - 4, this.account.length);
    },
    // isConnected() {
    //   if (this.isConnected) {
    //     this.connectToMetamask();
    //   }
    // },
    e1(newE1, oldE1) {
      if (newE1 === this.steps.addNode) {
        this.checkHaveNode();
        this.getTokenTestBalance();
      }
      if (newE1 === this.steps.approve && this.isApproved) {
        this.e1 = this.steps.addNode;
      }
    },
  },
  methods: {
    moreNodeInfo(nodeId) {
      this.nodeIsActive = "Loading...";
      getNodeInfo(nodeId)
        .then((response) => response.json())
        .then((data) => {
          if (data?.success && data?.result?.nodeInfo?.uptime) {
            this.nodeIsActive = "Active";
            this.nodeUptime = data.result.nodeInfo.uptime;
          } else if (!data.success) {
            this.nodeIsActive = "OFF";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeTheme() {
      this.themeIsDark = !this.themeIsDark;
    },
    getNativeBalance() {
      this.web3.eth.getBalance(this.account).then((res) => {
        const balance = this.web3.utils.fromWei(res);
        this.nativeTokenBalance = Number(balance);
        if (res === "0") {
          this.dialog = true;
        }
      });
    },
    mint() {
      mint(this.account, this.web3, this.mintAmount).then((res) => {
        this.getTokenTestBalance();
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
    checkHaveNode() {
      if (this.account) {
        this.cardLoading = true;
        haveNode(this.account, this.web3)
          .then((res) => {
            if (Number(res[0])) {
              this.rewardCheck();
              this.haveNode = true;
              this.nodeInfo["id"] = res[0];
              this.nodeInfo["nodeAddress"] = res[1];
              this.nodeInfo["peerId"] = res[3];
              this.nodeInfo["active"] = res[4];
              this.moreNodeInfo(res[0]);
            } else {
              this.haveNode = false;
            }
          })
          .finally(() => {
            this.cardLoading = false;
          });
      }
    },
    addNode() {
      nodeAdressIsValid(this.nodeAddress, this.web3).then((res) => {
        if (res[0] > 0) {
          this.reapetedNodeAdressDialog = true;
          this.dialog = true;
        } else {
          newAddNode(this.account, this.web3, this.nodeAddress, this.peerId)
            .then(() => {
              this.checkHaveNode();
              this.getTokenTestBalance();
            })
            .finally(() => {
              this.checkHaveNode();
              this.getTokenTestBalance();
            });
        }
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
    checkNetwork() {
      if (this.currntIdChain != mainChainId) {
        this.isCorrectChain = false;
      } else {
        this.isCorrectChain = true;
        ethereum
          .request({ method: "eth_accounts" })
          .then((res) => {
            if (res.length && this.isCorrectChain) {
              this.connectToMetamask();
            }
          })
          .catch(console.error);
      }
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
                rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545/"],
                blockExplorerUrls: ["https://testnet.bscscan.com/"],
              },
            ],
          });
        }
      }
    },
    approve() {
      approve(this.account, this.web3).then((res) => {
        this.checkApproved();
      });
    },
    connectToMetamask() {
      ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((res) => {
          // this.cardLoading = true;
          const account = res[0];
          this.account = account;
          this.checkApproved();
          this.getNativeBalance();
          this.checkHaveNode();
          this.getTokenTestBalance();
        });
    },
    async getChainId() {
      ethereum.request({ method: "eth_chainId" }).then((res) => {
        this.currntIdChain = res;
      });
    },
  },
  created() {
    document.title = "Join ALICE network";
    this.web3 = new Web3(window.ethereum);
    this.getChainId();
  },
  computed: {
    haveNativeToken() {
      const balance = Number(this.nativeTokenBalance);
      if (balance) return true;
      else return false;
    },
    getHeightSize() {
      return window.innerHeight;
    },
    muonTestTokenShow() {
      if (this.tokenTestBalance) {
        const amount = Number(this.tokenTestBalance);
        return amount.toFixed(2);
      } else {
        return "0";
      }
    },
  },
  mounted() {
    ethereum.on("accountsChanged", async (accounts) => {
      const address = accounts[0];
      this.account = address;
      this.checkApproved();
      this.getTokenTestBalance();
      this.getNativeBalance();
      this.checkHaveNode();
    });

    ethereum.on("disconnect", () => {
      this.isConnected = false;
    });
    ethereum.on("chainChanged", (chainId) => {
      this.currntIdChain = chainId;
    });
    this.checkNetwork();

    if (localStorage.themeIsDark === "true") {
      this.themeIsDark = true;
    }
  },
  updated() {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600&display=swap");

#particles-js {
  max-height: 98%;
}
.myFont {
  font-family: "Montserrat", sans-serif !important;
}
h3 {
  font-family: "Montserrat", sans-serif !important;
  font-weight: 300 !important;
  color: white;
}
.backgorundpic_dark {
  background-color: #313144 !important;
}
.backgorundpic_light {
  background-color: #f5f5f5 !important;
}
.full-width {
  width: 100% !important;
}
.btn-gradiant {
  background: linear-gradient(
    222.13deg,
    #55eaf7 6.63%,
    #52c0e9 50.03%,
    #4e78d2 75.32%,
    #4b4ac4 90.16%
  );
}
.btn_warning {
  background: linear-gradient(90deg, #fac739 -2.48%, #fb0d6a 102.48%);
}
.btn_error {
  background: linear-gradient(90deg, #fac739 -2.48%, #fb0d6a 102.48%);
}
.gradiant_two {
  background: linear-gradient(
    236.98deg,
    #55eaf7 -13.66%,
    #52c0e9 36.8%,
    #4e78d2 66.21%,
    #4b4ac4 83.46%,
    #4a39be 99.27%
  );
}
.yellow_gradiant {
  background: linear-gradient(226.04deg, #f4de1c 13.15%, #f4841c 95.48%);
}
.Muon_Dark_blue {
  background: #4a39be;
}
.old_Muon_Blue {
  background: #5158f6;
}
.footer_gradiant_light {
  background: linear-gradient(
    236.98deg,
    #55eaf7 -13.66%,
    #52c0e9 36.8%,
    #4e78d2 66.21%,
    #4b4ac4 83.46%,
    #4a39be 99.27%
  );
}
.footer_gradiant_dark {
  background: linear-gradient(90deg, #fac739 -2.48%, #fb0d6a 102.48%);
}
.full_height {
  /* min-height: 90vh !important; */
}
.main_title {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  line-height: 44px;
  /* identical to box height */

  text-align: center;
  text-transform: capitalize;

  /* Primary Gradient */

  background: linear-gradient(135deg, #5158f6 0%, #822df5 33.12%, #f3a761 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.title_card_box {
  width: 80%;
  height: 100px;
  margin-top: -50px;
  border-radius: 18px;
  border: 2px solid #5158f6;
  background-color: #ffffff;
  background-image: url("@/assets/presale-header.svg");
  background-repeat: no-repeat;
  background-position: center;
}
.title_card_box_font {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  line-height: 44px;
  text-align: center;

  /* Black */

  color: #323245;
}
.subtitle_card_box_font {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  text-align: center;

  /* Primary */

  color: #5158f6;
}
.v-stepper__header {
  box-shadow: none !important;
}
.stepper_header_text {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  text-align: center;

  /* Black */

  color: #323245;
}
.enough_tokens_message {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 44px;
  text-align: center;

  /* Black */

  color: #323245;
}
.input_fild {
  background: rgba(233, 239, 246, 0.75);
}
.underlite_dialog {
  text-decoration-line: underline;
  text-decoration-color: #5158f6;
  text-decoration-thickness: 9px;
}
.footer_card {
  width: 80%;
  height: 100px;
  margin-bottom: -50px;
  border-radius: 18px;
  border: 2px solid #5158f6;
  background-color: #ffffff;
  background-image: url("@/assets/presale-header.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.divider_step_box {
  border-left: 3px solid #f59569;
}
.border-dashed {
  border-left: 3px dashed #e9eff6;
}
.height-80 {
  height: 40px;
}
.setp_box {
  height: 50px;
  max-height: 50px;
}
.text-small {
  font-size: 10px;
}
.full-width {
  width: 100%;
}
</style>
