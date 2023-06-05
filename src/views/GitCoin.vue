<template>
  <v-main class="mb-10">
    <v-responsive v-if="gitcoinStep === 'loading'" height="75vh">
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
              <backToVerification v-if="gitcoinStep != 3"></backToVerification>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col class="d-flex justify-center width-570 pt-0">
              <v-card width="570" min-height="500" elevation="0" class="rounded-lg pb-5">
                <v-toolbar elevation="0">
                  <h5 class="text-18 weight-500">Gitcoin passport verification</h5>
                </v-toolbar>

                <v-card-text>
                  <v-row justify="center">
                    <v-col class="max-width-page">

                      <v-row v-if="gitcoinStep === 1" justify="center">
                        <v-col cols="12" align-self="center" class="text-center">
                          <img width="84px" src="@/assets/verification/gitcoin.svg" alt="" />
                          <v-row class="mt-1">
                            <v-col cols="2"><b class="text-18 weight-600">Step 1:</b></v-col>
                            <v-col class="pl-0">
                              <p class="text-18 font-weight-regular text-left">
                                Head over to <a @click="openWindow('https://passport.gitcoin.co')">passport.gitcoin.co</a>
                                and follow the provided instructions. Achieving a score
                                of 15 or above is necessary to pass the verification.
                              </p>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col offset="2" class="px-0">
                              <div class="card-warning rounded-sm pa-2">
                                <v-row>
                                  <v-col align-self="center" cols="1">

                                    <v-icon class="icon_font" color="#F59569">fas
                                      fa-circle-exclamation</v-icon>
                                  </v-col>
                                  <v-col align-self="center">
                                    <p class="text-body-2 mb-0 text-left">We recommend linking your Staking Address to
                                      your Gitcoin
                                      Passport for an optimal verification experience.</p>
                                  </v-col>
                                </v-row>
                              </div>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col class="d-flex justify-center">
                              <v-btn elevation="0" x-large class="rounded-sm px-15 py-4 text-body-1 font-weight-medium"
                                color="primary" @click="gitcoinStep = 2">
                                Next Step
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row v-else-if="gitcoinStep === 2" justify="center">
                        <v-col cols="12" align-self="center" class="text-center">
                          <img width="84px" src="@/assets/verification/gitcoin.svg" alt="" />

                          <v-row class="mt-1">
                            <v-col cols="2"><b class="text-18 weight-600">Step 2:</b></v-col>
                            <v-col class="pl-0">
                              <p class="text-18 font-weight-regular text-left">
                                Select the address used in your Gitcoin Passport, then click 'Verify Score' to check your
                                eligibily.
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
                            <v-col offset="2" class="d-flex px-0">
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
                          <v-row v-if="gitCoinErrorMsg">
                            <v-col offset="2" class="px-0">
                              <div class="card-error rounded-sm pa-2">
                                <v-row>
                                  <v-col align-self="center" cols="1">

                                    <v-icon class="icon_font" color="#FF3A5D">fas
                                      fa-circle-xmark</v-icon>
                                  </v-col>
                                  <v-col align-self="center">
                                    <p class="text-body-2 mb-0 text-left">{{ gitCoinErrorMsg }}</p>
                                  </v-col>
                                </v-row>
                              </div>
                            </v-col>
                          </v-row>


                          <v-row>
                            <v-col class="d-flex justify-center">
                              <v-btn :loading="gitCoinLoading" :disabled="!isConnected" elevation="0" x-large
                                class="rounded-sm px-15 py-4 text-body-1 font-weight-medium" color="primary"
                                @click="gitCoinVerify($route.params.staker)">
                                Verify score
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>

                      <v-row v-else-if="gitcoinStep === 3" justify="center">
                        <v-col cols="10" align-self="center" class="text-center">
                          <v-badge bottom color="green" icon="mdi-check" overlap offset-x="20" offset-y="40">
                            <img width="84px" src="@/assets/verification/gitcoin.svg" alt="" />
                          </v-badge>

                          <p class="text-18 font-weight-regular mt-10">
                            Congratulations! <br>
                            You've passed the Gitcoin Passport verification.
                            You now have the access to run Alice Starter node.
                          </p>

                          <v-row class="mt-15">
                            <v-col class="d-flex justify-center">
                              <backToVerification></backToVerification>
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
  name: "gitCoin",
  components: { BackToVerification, StakerAndSignerIsNotSameDialog },
  watch: {

  },
  methods: {
    openWindow(url) {
      window.open(url, '_blank')
    },
    ...mapActions(useVerificationsStore, ['gitCoinVerify']),
    ...mapActions(useDashboardStore, ["connectToMetamask"]),
  },
  created() {
    if (this.gitcoinStep != 2) {
      this.gitcoinStep = 1;
    }
  },
  computed: {
    ...mapState(useVerificationsStore, ["gitcoinStep", 'presaleLoading', 'gitCoinErrorMsg', 'gitCoinLoading']),
    ...mapState(useDashboardStore, ["addressShow"]),
    ...mapWritableState(useVerificationsStore, [
      "snackbarErorr",
      "snackbarErorrMsg",
      "gitcoinStep",
    ]),
    ...mapWritableState(useDashboardStore, ['isConnected'])
  },
};
</script>

<style scoped>
.wallet-connected {
  width: 374px;
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

.card-warning {
  width: 370px;
  background-color: rgba(245, 149, 105, 0.2);
}

.card-error {
  width: 370px;
  background-color: rgba(255, 58, 93, 0.2);
}
</style>
