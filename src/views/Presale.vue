<template>
  <v-main>
    <v-responsive v-if="preslaeStep === 'loading'" height="75vh">
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
    <v-row v-else justify="center">
      <v-col class="max-width-page">
        <v-row v-if="preslaeStep === 1" justify="center" style="height: 100%">
          <v-col cols="10" align-self="center" class="text-center">
            <img width="84px" src="@/assets/verification/Wallet.svg" alt="" />
            <v-row class="mt-5">
              <v-col cols="2" class="px-0">
                <b class="font-18 weight-600">Step 1:</b>
              </v-col>
              <v-col>
                <p class="text-18 font-weight-regular">
                  Connect the wallet you used in the presale
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn
                  elevation="0"
                  class="rounded-sm mt-2 py-4 text-body-1 font-weight-medium"
                  color="primary"
                  @click="connectToMetamask"
                >
                  Connect wallet
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row
          v-else-if="preslaeStep === 2"
          justify="center"
          style="height: 100%"
        >
          <v-col cols="10" align-self="center" class="text-center">
            <img width="84px" src="@/assets/verification/Wallet.svg" alt="" />

            <v-row class="mt-5">
              <v-col cols="2" class="px-0">
                <b class="font-18 weight-600">Step 1:</b>
              </v-col>
              <v-col class="pl-0">
                <p class="text-18 font-weight-regular text-left">
                  Go to your wallet and select the address you used for the
                  presale. If this is the same address you're currently using
                  for the Alice dashboard, skip this step
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn
                  elevation="0"
                  class="rounded-sm mt-2 py-4 text-body-1 font-weight-medium"
                  color="primary"
                  @click="preslaeStep = 3"
                >
                  Got it! next step
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row
          v-else-if="preslaeStep === 3"
          justify="center"
          style="height: 100%"
        >
          <v-col cols="10" align-self="center" class="text-center">
            <img width="84px" src="@/assets/verification/Wallet.svg" alt="" />
            <v-row class="mt-5">
              <v-col>
                <div
                  class="wallet-connected d-inline-flex justify-space-between align-center px-6"
                >
                  <div class="text-left">
                    <b class="text-body-1 font-weight-reguler">
                      wallet connected
                    </b>
                    <br />
                    <b class="text-body-1 font-weight-medium primary--text">{{
                      addressShow
                    }}</b>
                  </div>
                  <v-btn
                    elevation="0"
                    class="rounded-sm text-body-1 font-weight-medium primary--text"
                    color="#5158F621"
                    >Disconnect</v-btn
                  >
                </div>
              </v-col>
            </v-row>
            <v-row class="mt-5">
              <v-col cols="2" class="px-0">
                <b class="font-18 weight-600">Step 2:</b>
              </v-col>
              <v-col class="pl-0">
                <p class="text-18 font-weight-regular text-left">
                  Sign your wallet signature to verify the address
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn
                  elevation="0"
                  class="rounded-sm py-4 text-body-1 font-weight-medium"
                  color="primary"
                  @click="presaleVerified($route.params.staker)"
                  :loading="brigthIdLoading"
                >
                  Verify address
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row
          v-else-if="preslaeStep === 4"
          justify="center"
          style="height: 100%"
        >
          <v-col cols="10" align-self="center" class="text-center">
            <v-badge
              bottom
              color="green"
              icon="mdi-check"
              overlap
              offset-x="20"
              offset-y="15"
            >
              <img width="84px" src="@/assets/verification/Wallet.svg" alt="" />
            </v-badge>

            <p class="text-18 font-weight-regular mt-10">
              Congratulations! <br />
              You passed Presale participants verification Your access granted
              to run Alice Starter node
            </p>

            <v-row class="mt-15">
              <v-col class="d-flex justify-center">
                <v-btn
                  elevation="0"
                  class="rounded-sm text-body-1 font-weight-medium primary--text"
                  color="#5158F621"
                  @click="$router.push('/verification')"
                  >Back to verification center</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row
          v-else-if="preslaeStep === 5"
          justify="center"
          style="height: 100%"
        >
          <v-col cols="10" align-self="center" class="text-center">
            <v-badge
              bottom
              color="red"
              icon="mdi-close"
              overlap
              offset-x="20"
              offset-y="15"
            >
              <img width="84px" src="@/assets/verification/Wallet.svg" alt="" />
            </v-badge>

            <p class="text-18 font-weight-regular mt-10">
              Sorry, this address is not among the presale participants. Please
              try a different verification method or connect to another wallet
            </p>

            <v-row class="mt-15">
              <v-col class="d-flex justify-center">
                <v-btn
                  elevation="0"
                  class="rounded-sm text-body-1 font-weight-medium primary--text mx-2"
                  color="#5158F621"
                  @click="$router.push('/verification')"
                  >Back to verification center</v-btn
                >
                <v-btn
                  elevation="0"
                  class="rounded-sm text-body-1 font-weight-medium primary--text mx-2"
                  color="#5158F621"
                  @click="preslaeStep = 2"
                  >Try another address</v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { useDashboardStore } from "@/stores/dashboardStore";
import { useVerificationsStore } from "@/stores/verifications";
import { mapActions, mapState, mapWritableState } from "pinia";

export default {
  name: "apiVerify",
  components: {},
  watch: {
    isConnected(newVal, OldVal) {
      if (!newVal) {
        this.preslaeStep = 1;
      }
    },
  },
  methods: {
    ...mapActions(useVerificationsStore, ["presaleVerified", "closePopup"]),
    ...mapActions(useDashboardStore, ["connectToMetamask"]),
  },
  created() {
    if (!this.isConnected) {
      this.preslaeStep = 1;
    }
  },
  computed: {
    ...mapState(useVerificationsStore, ["preslaeStep"]),
    ...mapState(useDashboardStore, ["addressShow", "isConnected"]),
    ...mapWritableState(useVerificationsStore, [
      "snackbarErorr",
      "snackbarErorrMsg",
      "preslaeStep",
    ]),
  },
};
</script>

<style scoped>
.wallet-connected {
  width: 412px;
  min-height: 92px;
  background-color: #5158f621;
  border-radius: 10px;
}
.max-width-page {
  max-width: 600px;
}
</style>
