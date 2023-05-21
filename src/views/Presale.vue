<template>
  <v-main class="mb-10">
    <v-responsive v-if="preslaeStep === 'loading'" height="75vh">
      <v-row justify="center" style="height: 100%">
        <v-col align-self="center"></v-col>
        <lottie-vue-player ref="anim" src="https://lottie.host/1fb3a319-394b-446d-8fce-824aa4f1787c/xjtL4nMuB2.json"
          :autoplay="true" :loop="true" height="200px" class="transparent" />
      </v-row>
    </v-responsive>
    <v-responsive v-else width="100%" min-height="80vh">
      <v-row justify="center" class="full-height">
        <v-col align-self="center" class="max-width-1032">

          <v-row justify="center">
            <v-col class="width-570 text-right ">
              <backToVerification v-if="preslaeStep === 1"></backToVerification>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center width-570 pt-0">
              <v-card width="570" min-height="500" elevation="0" class="rounded-lg pb-5">
                <v-toolbar elevation="0">
                  <h5 class="text-18 weight-500">Muon Presale Participation</h5>
                </v-toolbar>

                <v-card-text>
                  <v-row justify="center">
                    <v-col class="max-width-page">

                      <v-row v-if="preslaeStep === 1" justify="center">
                        <v-col cols="10" align-self="center" class="text-center">
                          <img width="84px" src="@/assets/verification/Wallet.svg" alt="" />
                          <v-row class="mt-1">
                            <v-col class="pl-0">
                              <p class="text-18 font-weight-regular text-left">
                                Open your Metamask and select the address you used for the presale. Then use the "Verify
                                Address" button to verify the ownership of the address.
                              </p>
                            </v-col>
                          </v-row>
                          <v-row v-if="!isConnected">
                            <v-col class="d-flex justify-center">
                              <v-btn elevation="0" class="rounded-sm mt-2 py-4 text-body-1 font-weight-medium"
                                color="primary" @click="connectToMetamask">
                                Connect wallet
                              </v-btn>
                            </v-col>
                          </v-row>
                          <v-row v-else class="mt-5">
                            <v-col>
                              <div class="wallet-connected d-inline-flex justify-space-between align-center px-6">
                                <div class="text-left">
                                  <b class="text-body-1 font-weight-reguler">
                                    wallet connected
                                  </b>
                                  <br />
                                  <b class="text-body-1 font-weight-medium primary--text">{{ addressShow }}</b>
                                </div>
                                <v-btn @click="isConnected = false" elevation="0"
                                  class="rounded-sm text-body-1 font-weight-medium primary--text"
                                  color="#5158F621">Disconnect</v-btn>
                              </div>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col class="d-flex justify-center">
                              <v-btn :disabled="!isConnected" elevation="0"
                                class="rounded-sm py-4 text-body-1 font-weight-medium" color="primary"
                                @click="presaleVerified($route.params.staker)" :loading="presaleLoading">
                                Verify address
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row v-else-if="preslaeStep === 2" justify="center">
                        <v-col cols="10" align-self="center" class="text-center">
                          <v-badge bottom color="green" icon="mdi-check" overlap offset-x="20" offset-y="15">
                            <img width="84px" src="@/assets/verification/Wallet.svg" alt="" />
                          </v-badge>

                          <p class="text-18 font-weight-regular mt-10">
                            Congratulations! <br />
                            You passed Presale Participation verification. You are
                            granted access to run an Alice Starter node.
                          </p>

                          <v-row class="mt-15">
                            <v-col class="d-flex justify-center">
                              <backToVerification></backToVerification>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row v-else-if="preslaeStep === 3" justify="center">
                        <v-col cols="10" align-self="center" class="text-center">
                          <v-badge bottom color="red" icon="mdi-close" overlap offset-x="20" offset-y="15">
                            <img width="84px" src="@/assets/verification/Wallet.svg" alt="" />
                          </v-badge>

                          <p class="text-18 font-weight-regular mt-10">
                            Sorry. This address is not among the presale participants.
                            Please try a different verification method or connect to
                            another wallet.
                          </p>

                          <v-row class="mt-15">
                            <v-col class="d-flex justify-center">
                              <backToVerification></backToVerification>
                              <v-btn elevation="0" class="rounded-sm text-body-1 font-weight-medium primary--text mx-2"
                                color="#5158F621" @click="preslaeStep = 1">Try another address</v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-responsive>
    <StakerAndSignerIsNotSameDialog></StakerAndSignerIsNotSameDialog>
  </v-main>
</template>

<script>
import { useDashboardStore } from "@/stores/dashboardStore";
import { useVerificationsStore } from "@/stores/verifications";
import { mapActions, mapState, mapWritableState } from "pinia";
import BackToVerification from "@/components/BackToVerification.vue";
import StakerAndSignerIsNotSameDialog from "@/components/StakerAndSignerIsNotSameDialog.vue";
export default {
  name: "apiVerify",
  components: { BackToVerification, StakerAndSignerIsNotSameDialog },
  watch: {
  },
  methods: {
    ...mapActions(useVerificationsStore, ["presaleVerified", "closePopup"]),
    ...mapActions(useDashboardStore, ["connectToMetamask"]),
  },
  created() {
    if (this.preslaeStep != 2) {
      this.preslaeStep = 1;
    }
  },
  computed: {
    ...mapState(useVerificationsStore, ["preslaeStep", 'presaleLoading']),
    ...mapState(useDashboardStore, ["addressShow", "isConnected"]),
    ...mapWritableState(useVerificationsStore, [
      "snackbarErorr",
      "snackbarErorrMsg",
      "preslaeStep",
    ]),
    ...mapWritableState(useDashboardStore, ['isConnected'])
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

.width-570 {
  width: 570px;
  max-width: 570px;
}
</style>
