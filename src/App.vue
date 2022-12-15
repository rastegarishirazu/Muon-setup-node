<template>
  <v-app class="backgorundpic">
    <v-main>
      <v-responsive width="100%" overflow-hidden class="overflow-hidden px-5">
        <v-row
          class="mt-5"
          :justify="$vuetify.breakpoint.smAndDown ? 'center' : ''"
        >
          <v-col md="6" cols="12" offset-md="3">
            <v-card class="px-5 backgorundpic" elevation="15" dark>
              <v-card-title class="myFont font-weight-bold text--white"
                >Setup a Muon Testnet node</v-card-title
              >
              <v-card-text>
                <h3>1. Approve staking contract to use your tokens</h3>
                <h3>2. Add the node on MuonNodesStaking contract</h3>
                <h3>Note: You need 1000 Muon test token</h3>
              </v-card-text>
              <v-divider class="mx-4"></v-divider>
              <v-card-title class="myFont">Go through the steps. </v-card-title>
              <v-row class="my-5">
                <v-stepper
                  v-if="isCorrectChain && isConnected"
                  v-model="e1"
                  class="full-width my-2"
                >
                  <v-stepper-header class="Muon_Dark_blue">
                    <v-stepper-step :complete="e1 > 1" step="1">
                      Approve
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-divider></v-divider>

                    <v-stepper-step step="2"> Add Muon node </v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-items class="old_Muon_Blue">
                    <v-stepper-content step="1">
                      <v-row justify="center" class="my-5">
                        <v-btn @click="approve" class="btn_warning"
                          >approve</v-btn
                        >
                      </v-row>

                      <v-btn color="primary" @click="ckeckApproved">
                        Check
                      </v-btn>

                      <!-- <v-btn @click="ckeckApproved" text class="gradiant_two">
                        ckeckApproved
                      </v-btn> -->
                    </v-stepper-content>

                    <v-stepper-content step="2">
                      <div v-if="!haveNode">
                        <h5
                          v-if="!haveEnoughTokenTEst"
                          class="text-center px-3"
                        >
                          You have't enough token. You need another
                          {{ 1000 - tokenTestBalance }}.
                        </h5>
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

                        <v-btn
                          :disabled="!haveEnoughTokenTEst"
                          class="btn_warning"
                          @click="addNode"
                        >
                          Add node
                        </v-btn>
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

                      <!-- <v-btn @click="e1 = 2" text> back to stake </v-btn> -->
                    </v-stepper-content>
                  </v-stepper-items>
                </v-stepper>
                <v-col v-if="!isCorrectChain">
                  <v-row class="my-5" justify="center">
                    Switch your network to Mumbai
                  </v-row>
                  <v-row class="my-5" justify="center">
                    <v-btn @click="switchToCorrectChain" class="btn_error">
                      switch newtork
                    </v-btn>
                  </v-row>
                </v-col>
                <v-col v-if="isCorrectChain && !isConnected">
                  <v-row class="my-5" justify="center">
                    Connect your wallet
                  </v-row>
                  <v-row class="my-5" justify="center">
                    <v-btn @click="connectToMetamask" class="btn-gradiant">
                      <v-icon class="mr-1">mdi-wallet</v-icon>
                      connect Wallet
                    </v-btn>
                  </v-row>
                </v-col>
                <!-- <v-btn @click="approve" color="success"> approve </v-btn> -->
              </v-row>
            </v-card>
          </v-col>
          <v-col
            md="2"
            cols="4"
            :order="$vuetify.breakpoint.smAndDown ? 'first' : 'last'"
          >
            <v-btn @click="connectToMetamask" class="btn-gradiant" block
              ><v-icon class="mr-1">mdi-wallet</v-icon>{{ addressShow }}</v-btn
            >
          </v-col>
        </v-row>
      </v-responsive>
    </v-main>
    <v-footer padless class="footer_gradiant" dark
      ><v-col cols="12" class="text-center">©Muon 2022</v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Web3 from "web3";
import {
  approve,
  ckeckApproved,
  stake,
  addMuonNode,
  haveNode,
  newAddNode,
  getBalanceaOfTokenTest,
} from "./utils/transactions";
const mainChainId = 0x13881;
export default {
  name: "App",

  components: {},

  data: () => ({
    //
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
    tokenTestBalance(newBalance, oldBalance) {
      if (newBalance > 1000) {
        this.haveEnoughTokenTEst = true;
      } else {
        this.haveEnoughTokenTEst = false;
      }
    },
    isApproved() {
      if (this.isApproved) {
        this.e1 = 2;
      } else {
        this.e1 = 1;
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
    e1() {
      if (this.e1 === 2) {
        this.checkHaveNode();
        this.getTokenTestBalance();
      }
    },
  },
  methods: {
    getTokenTestBalance() {
      getBalanceaOfTokenTest(this.account, this.web3).then((res) => {
        this.tokenTestBalance = res;
      });
    },
    checkHaveNode() {
      haveNode(this.account, this.web3).then((res) => {
        this.haveNode = res;
      });
    },
    addNode() {
      // addMuonNode(this.account, this.web3, this.nodeAddress, this.peerId);
      newAddNode(this.account, this.web3, this.nodeAddress, this.peerId);
    },
    stake() {
      stake(this.account, this.web3, this.stakeAmount);
    },
    ckeckApproved() {
      ckeckApproved(this.account, this.web3).then((res) => {
        this.isApproved = res;
      });
    },
    checkNetwork() {
      if (this.currntIdChain != 0x13881) {
        this.isCorrectChain = false;
      } else {
        this.isCorrectChain = true;
      }
    },
    async switchToCorrectChain() {
      try {
        await window.ethereum
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: this.web3.utils.toHex(mainChainId) }],
          })
          .then(async () => {
            this.ckeckApproved();
          });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Polygon Mainnet",
                chainId: this.web3.utils.toHex(mainChainId),
                nativeCurrency: {
                  name: "MATIC",
                  decimals: 18,
                  symbol: "MATIC",
                },
                rpcUrls: ["https://polygon-rpc.com/"],
              },
            ],
          });
        }
      }
    },
    approve() {
      return approve(this.account, this.web3);
    },
    connectToMetamask() {
      ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((res) => {
          const account = res[0];
          this.account = account;
          this.ckeckApproved();
        });
    },
    async getChainId() {
      ethereum.request({ method: "eth_chainId" }).then((res) => {
        this.currntIdChain = res;
      });
    },
  },
  async beforeCreate() {},
  async created() {
    document.title = "Muon add node";
    this.web3 = new Web3(window.ethereum);
    this.getChainId();
  },
  computed: {
    getHeightSize() {
      return window.innerHeight;
    },
  },
  async mounted() {
    ethereum.on("accountsChanged", async (accounts) => {
      const address = accounts[0];
      this.account = address;
      console.log(this.account);
      this.ckeckApproved();
      this.getTokenTestBalance();
    });
    ethereum.on("chainChanged", (chainId) => {
      this.currntIdChain = chainId;
    });

    this.checkNetwork();
  },
  updated() {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600&display=swap");

.myFont {
  font-family: "Montserrat", sans-serif !important;
}
h3 {
  font-family: "Montserrat", sans-serif !important;
  font-weight: 300 !important;
  color: white;
}
.backgorundpic {
  background-color: #313144 !important;
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
.footer_gradiant {
  background: linear-gradient(
    236.98deg,
    #55eaf7 -13.66%,
    #52c0e9 36.8%,
    #4e78d2 66.21%,
    #4b4ac4 83.46%,
    #4a39be 99.27%
  );
}
</style>
