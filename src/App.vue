<template>
  <v-app class="backgorundpic_light">
    <Header v-if="!cardLoading"></Header>
    <v-responsive v-if="cardLoading" height="80vh">
      <v-row justify="center" style="height: 100%">
        <v-col align-self="center"></v-col>
        <lottie-vue-player
          ref="anim"
          src="https://lottie.host/1fb3a319-394b-446d-8fce-824aa4f1787c/xjtL4nMuB2.json"
          :autoplay="true"
          :loop="true"
          height="200px"
          class="transparent"
        />
      </v-row>
    </v-responsive>
    <router-view v-else />
    <v-footer app padless color="rgba(0,0,0,0)">
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
import Header from "./components/Header.vue";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { useDashboardStore } from "@/stores/dashboardStore";
import { mapActions, mapWritableState } from "pinia";

export default {
  name: "app",
  components: { Header },

  watch: {
    isConnected(newState, oldState) {
      if (newState) {
        this.getTokenTestBalance();
      } else {
        // this.addressShow = "connect Wallet";
      }
    },
    currntIdChain() {
      this.checkNetwork();
    },
    account(newState, oldState) {
      if (newState) {
        this.isConnected = true;
      }
      this.addressShow =
        this.account.slice(0, 4) +
        "..." +
        this.account.slice(this.account.length - 4, this.account.length);
    },
  },
  methods: {
    ...mapActions(useDashboardStore, [
      "getTokenTestBalance",
      "startApp",
      "getChainId",
      "connectToMetamask",
      "checkNetwork",
    ]),
  },
  async created() {
    this.cardLoading = true;
    this.provider = await detectEthereumProvider();
    if (this.provider) {
      this.startApp(this.provider); // Initialize your app
    } else {
      console.log("Please install MetaMask!");

      this.cardLoading = false;
    }
    this.web3 = new Web3(window.ethereum);
    this.getChainId();
  },

  computed: {
    ...mapWritableState(useDashboardStore, [
      "currntIdChain",
      "addressShow",
      "isConnected",
      "cardLoading",
      "web3",
      "provider",
      "account",
    ]),
  },

  mounted() {
    ethereum.on("accountsChanged", async (accounts) => {
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
        this.cardLoading = false;
      } else {
        const address = accounts[0];
        this.account = address;
        // this.checkApproved();
        // this.getTokenTestBalance();
        // this.getNativeBalance();
        // this.checkHaveNode();
      }
    });

    ethereum.on("disconnect", () => {
      this.isConnected = false;
    });
    ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
      this.currntIdChain = chainId;
      this.checkNetwork();
    });

    if (localStorage.themeIsDark === "true") {
      this.themeIsDark = true;
    }
  },
};
</script>

<style scoped lang="scss">
.backgorundpic_light {
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
