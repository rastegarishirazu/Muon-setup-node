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
      <h2 v-if="this.haveNode === 'error'" class="text-center mt-5">
        something went wrong. please try again later.
      </h2>
      <v-responsive
        v-else
        width="100%"
        overflow-hidden
        class="overflow-hidden px-5 mt-4"
      >
        <!-- <v-row justify="center" class="my-2">
      <v-col> <h1 class="main_title">ALICE testnet</h1></v-col>
    </v-row> -->
        <v-row class="mt-2" justify="center">
          <v-col md="5">
            <div class="d-flex justify-center" width="100%">
              <div class="title_card_box text-center py-5 mt-1">
                <h2 class="title_card_box_font text-h4">Adding a Node</h2>
                <h3 class="subtitle_card_box_font text-h6">
                  To the ALICE Network
                </h3>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="cardLoading" justify="center">
          <lottie-vue-player
            ref="anim"
            src="https://lottie.host/1fb3a319-394b-446d-8fce-824aa4f1787c/xjtL4nMuB2.json"
            :autoplay="true"
            :loop="true"
            height="200px"
            class="transparent"
          />
        </v-row>
        <v-row v-else-if="e1 <= steps.addNode" justify="center" class="mt-10">
          <v-col md="5" xl="3" align-self="center">
            <v-row>
              <v-col md="3" class="text-center">
                <div
                  :class="[
                    'setp_box',
                    'height-step-box',
                    'text-center',
                    'rounded-lg',
                    'py-3',
                    'primaryOrange',
                    'white--text',
                  ]"
                  width="100%"
                >
                  Step 1
                </div>
                <div class="d-flex justify-center">
                  <div
                    :class="[
                      'height-steps',
                      e1 > steps.mint ? 'divider_step_box' : 'border-dashed',
                    ]"
                  ></div>
                </div>
                <div
                  :class="[
                    'setp_box',
                    'height-step-box',
                    'text-center',
                    'rounded-lg',
                    'py-3',
                    e1 > steps.mint ? 'primaryOrange white--text' : 'gray',
                  ]"
                  width="100%"
                >
                  Step 2
                </div>
                <div class="d-flex justify-center">
                  <div
                    :class="[
                      'height-steps',
                      e1 > steps.approve ? 'divider_step_box' : 'border-dashed',
                    ]"
                  ></div>
                </div>
                <div
                  :class="[
                    'setp_box',
                    'height-step-box',
                    'text-center',
                    'rounded-lg',
                    'py-3',
                    e1 > steps.approve ? 'primaryOrange white--text' : 'gray',
                  ]"
                  width="100%"
                >
                  Step 3
                </div>
              </v-col>
              <v-col>
                <div class="height-step-box">
                  <h4
                    :class="[
                      'text-subtitle-1',
                      { 'font-weight-black': e1 === steps.mint },
                    ]"
                  >
                    Mint 1000 Alice Tokens
                  </h4>
                  <h5 class="font-weight-regular">to your wallet</h5>
                </div>
                <div class="height-steps"></div>
                <div class="height-step-box">
                  <h4
                    :class="[
                      'text-subtitle-1',
                      { 'font-weight-black': e1 == steps.approve },
                    ]"
                  >
                    Approve the Staking Contract
                  </h4>
                  <h5 class="font-weight-regular">
                    to be able to deposit your tokens
                  </h5>
                </div>
                <div class="height-steps"></div>
                <div class="height-step-box">
                  <h4
                    :class="[
                      'text-subtitle-1',
                      { 'font-weight-black': e1 == steps.addNode },
                    ]"
                  >
                    Add your Node to the Network
                  </h4>
                  <h5 class="font-weight-regular">
                    and start securing the network!
                  </h5>
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-col md="4" xl="3">
            <v-card elevation="0" class="px-2 rounded-lg input-card-min-height">
              <v-container class="full-height">
                <v-row class="input-card-min-height d-flex">
                  <v-col v-if="e1 === steps.mint" cols="12">
                    <div class="mint-level">
                      <div
                        v-if="!haveEnoughTokenTEst"
                        class="lightPrimaryOrange rounded-lg px-2 mt-5"
                      >
                        <v-row>
                          <v-col cols="2">
                            <v-icon color="primaryOrange" class="text-h3">
                              mdi-alert-circle
                            </v-icon>
                          </v-col>
                          <v-col>
                            <p class="mb-0">
                              You don't have enough tokens. You need at least
                              <b> 1000 ALICE</b>
                            </p>
                          </v-col>
                        </v-row>
                      </div>
                      <p class="mt-5 font-weight-regular">
                        Your <b>ALICE</b> token balance:
                        <b>{{ muonTestTokenShow }}</b>
                        <v-btn
                          @click="getTokenTestBalance"
                          class="ml-2"
                          icon
                          color="success"
                        >
                          <v-icon color="black" class="gray rounded-lg"
                            >mdi-refresh</v-icon
                          >
                        </v-btn>
                      </p>
                      <p class="mt-10">Token amount (min: 1000)</p>
                      <v-text-field
                        solo
                        flat
                        v-model="mintAmount"
                        :rules="minMint"
                        class="rounded-lg"
                        name="name"
                        label="Enter Amount you wish to mint"
                        id="id"
                        background-color="gray"
                      ></v-text-field>
                      <v-row>
                        <v-col cols="9">
                          <v-btn
                            block
                            large
                            :loading="btnLoading"
                            :disabled="mintAmount > 1000 || mintAmount < 1"
                            @click="mint"
                            color="primary"
                            elevation="0"
                            class="rounded-lg"
                            >Mint ALICE</v-btn
                          >
                        </v-col>
                        <v-col cols="3">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-bind="attrs"
                                v-on="on"
                                @click="($event) => (e1 = steps.approve)"
                                block
                                large
                                color="gray"
                                elevation="0"
                                :disabled="!haveEnoughTokenTEst"
                              >
                                <v-icon color="black" class="gray rounded-lg">
                                  mdi-arrow-right-top-bold
                                </v-icon>
                              </v-btn>
                            </template>
                            <span>Next Step</span>
                          </v-tooltip>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                  <v-col v-if="e1 === steps.approve" align-self="end" cols="12">
                    <div class="">
                      <lottie-vue-player
                        ref="anim"
                        src="https://lottie.host/868900ff-6aee-4393-a1e8-b60ad88620b1/T2cHITcdet.json"
                        :autoplay="true"
                      />
                      <p
                        class="text-center mb-10 font-weight-medium text-subtitle-2"
                      >
                        Now you need to approve the <br />
                        staking contract to use the tokens
                      </p>
                      <v-row>
                        <v-col cols="10"
                          ><v-btn
                            :loading="btnLoading"
                            @click="approve"
                            elevation="0"
                            block
                            color="primary"
                            >Approve</v-btn
                          ></v-col
                        >
                        <v-col cols="2" class="pl-0"
                          ><v-btn
                            @click="checkApproved"
                            block
                            color="gray"
                            elevation="0"
                          >
                            <v-icon color="black" class="gray rounded-lg">
                              mdi-refresh
                            </v-icon>
                          </v-btn></v-col
                        >
                      </v-row>
                    </div>
                  </v-col>
                  <v-col v-if="e1 === steps.addNode" cols="12">
                    <div class="lightInfo rounded-lg px-2 mt-2">
                      <v-row>
                        <v-col cols="2">
                          <v-icon color="info" class="text-h3">
                            mdi-alert-box
                          </v-icon>
                        </v-col>
                        <v-col align-self="center">
                          <p class="mb-0 text-caption font-weight-bold">
                            While adding your node. you will automatically stake
                            1000 ALICE tokens
                          </p>
                        </v-col>
                      </v-row>
                    </div>
                    <v-row>
                      <v-col cols="12" class="mt-15">
                        <span>Node IP</span>
                        <v-text-field
                          v-model="nodeIPInput"
                          solo
                          flat
                          class="rounded-lg"
                          name="name"
                          label="Enter your node IP"
                          id="id"
                          background-color="gray"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row class="mt-8">
                      <v-col cols="3">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              v-on="on"
                              @click="($event) => (e1 = steps.mint)"
                              block
                              large
                              color="gray"
                              elevation="0"
                            >
                              <v-icon color="black" class="gray rounded-lg">
                                mdi-arrow-left-top-bold
                              </v-icon>
                            </v-btn>
                          </template>
                          <span>Back to mint</span>
                        </v-tooltip>
                      </v-col>
                      <v-col cols="9" class="pl-0">
                        <v-btn
                          :loading="btnLoading"
                          elevation="0"
                          block
                          large
                          color="primary"
                          class="font-weight-bold"
                        >
                          Add node
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col md="10" cols="12">
            <v-scroll-x-reverse-transition>
              <v-card
                v-show="!cardLoading && e1 >= steps.newNode"
                width="100%"
                height="500px"
                transition="slide-x-transition"
                elevation="0"
                class="px-2 rounded-lg"
              >
                <v-row justify="center" v-if="e1 === steps.newNode">
                  <v-col md="4" class="text-center" align-self="end">
                    <lottie-vue-player
                      ref="anim"
                      src="https://lottie.host/d93bca6a-cfea-4e40-a6b9-4d191832b2ef/uWgbTRaCzm.json"
                      :autoplay="true"
                      height="200"
                      class="transparent"
                    />
                    <h3 class="blackText--text font-weight-bold">
                      Your node has been added <br />
                      to Alice network
                    </h3>
                    <v-row justify="center">
                      <v-col
                        cols="9"
                        class="text-right pr-0"
                        align-self="center"
                      >
                        <h5 class="primary--text text-body-1">
                          Preparing your dashboard
                        </h5>
                      </v-col>
                      <v-col cols="3" class="text-left pl-0">
                        <lottie-vue-player
                          ref="anim"
                          src="https://lottie.host/1fb3a319-394b-446d-8fce-824aa4f1787c/xjtL4nMuB2.json"
                          :autoplay="true"
                          :loop="true"
                          class="transparent ml-n2"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row class="full-height" justify="center">
                  <v-col
                    md="4"
                    align-self="center"
                    height="500px"
                    class="text-center"
                  >
                    <h5 class="info--text text-body-1">
                      Your dashboard is ready!
                      <v-icon color="green">mdi-check</v-icon>
                    </h5>
                    <v-btn
                      block
                      large
                      color="primary"
                      class="mt-5 font-weight-bold rounded-lg"
                      elevation="0"
                      >Launch my dashboard</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-scroll-x-reverse-transition>
          </v-col>
        </v-row>

        <v-dialog
          v-if="isCorrectChain && isConnected"
          dark
          v-model="dialog"
          width="500"
        >
          <v-card color="#fff">
            <v-card-text>
              <v-row
                v-html="dialogContext.text"
                class="mt-5 px-5"
                justify="center"
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
  newAddNode,
  getBalanceaOfTokenTest,
  nodeAdressIsValid,
  rewardChecker,
} from "@/utils/transactions";
import { getNodeInfo, checkIP } from "@/utils/fetch";
import particles from "@/components/Particles";
import moment from "moment";
import Header from "@/components/Header.vue";
const mainChainId = 0x61;
const STEPS = {
  mint: 1,
  approve: 2,
  addNode: 3,
  newNode: 4,
  beforHaveNode: 5,
  haveNode: 6,
};

export default {
  name: "App",

  components: { Header, particles },

  data: () => ({
    testEl: 1, // remove it befor build
    cardLoading: true,
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
    mintAmount: 1000,
    nativeTokenBalance: 0,
    nodeInfo: Object,
    btnLoading: false,
    nodeIsActive: "Loading...",
    nodeUptime: "",
    rewardAmount: 0,
    downNodeTimes: [],
    nodeIPInput: "",
    dialogContext: { text: String },
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
    changeTheme() {
      this.themeIsDark = !this.themeIsDark;
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
    checkHaveNode() {
      if (this.account) {
        this.cardLoading = true;
        getNodeInfo(this.account)
          // getNodeInfo(9099)
          .then((res) => {
            res = res["result"];
            if (res && res != "node not found") {
              this.haveNode = true;
              this.nodeIsActive = "Loading...";
              this.nodeInfo["isNew"] = res["node"]["isNew"];
              this.e1 = this.nodeInfo["isNew"]
                ? this.steps.newNode
                : this.steps.beforHaveNode;
              this.nodeInfo["active"] = res["node"]["active"];
              const tests = res["node"]["tests"];
              this.nodeInfo["nodeAddress"] = res["node"]["nodeAddress"];
              this.nodeInfo["id"] = res["node"]["id"];
              this.nodeInfo["peerId"] = res["node"]["peerId"];
              this.nodeInfo["startTime"] = new Date(
                res["node"]["startTime"] * 1000
              )
                .toISOString()
                .split("T")[0];
              this.nodeInfo["entTime"] = new Date(res["node"]["endTime"] * 1000)
                .toISOString()
                .split("T")[0];
              if (this.nodeInfo["active"]) {
                this.nodeIsActive = this.nodeInfo.isNew
                  ? "Your node has been added to the network successfully. Its initialization will take a few minutes."
                  : tests["networking"] && tests["peerInfo"] && tests["status"]
                  ? "Active"
                  : "OFF";
                this.nodeInfo["nodeIP"] = res["node"]["ip"];
                this.nodeInfo["messages"] = res["messages"];
                this.nodeInfo["rewardAmount"] = Number(
                  this.web3.utils.fromWei(
                    String(res["reward"]["earned"]),
                    "ether"
                  )
                ).toFixed(4);
                this.nodeInfo["rewardAmount"];
                this.nodeInfo["onlinePercent"] = res["reward"]["onlinePercent"];
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
                this.downNodeTimes = messages;
                console.log(this.downNodeTimes);
              }
            } else if (res === "node not found") {
              this.haveNode = false;
            } else {
              this.haveNode = "error";
            }
          })
          .finally(() => {
            this.cardLoading = false;
          });
      }
    },
    addNode() {
      this.btnLoading = true;
      checkIP(this.nodeIPInput).then((res) => {
        if (res && res.success) {
          newAddNode(
            this.account,
            this.web3,
            res.result.nodeAddress,
            res.result.peerId
          )
            .then(() => {
              this.checkHaveNode();
              this.getTokenTestBalance();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.btnLoading = true;
            });
        } else if (res) {
          this.dialogContext.text = `
          <h4
                  class="myFont blackText--text text-h6 mt-10 underlite_dialog"
                >
                  wrong!
                </h4>
                <p class="myFont blackText--text text-center mt-5">
                  ${res.result.message}
                </p>
          `;
          this.dialog = true;
          this.btnLoading = false;
        } else {
          this.haveNode = "error";
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
                rpcUrls: ["https://bsc-testnet.public.blastapi.io"],
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
    console.log("v1.0.2");
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
.v-application {
  font-family: "Montserrat", sans-serif !important;
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
  box-shadow: 0 0 10px 1px #5159f66e;
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
.height-steps {
  height: 60px;
}
.setp_box {
  max-height: 50px;
}
.height-step-box {
  height: 50px;
}
.text-small {
  font-size: 10px;
}
.full-width {
  width: 100%;
}
.input-card-min-height {
  min-height: 280px;
}
.full-height {
  height: 100%;
}
.transparent {
  background: none;
}
</style>
