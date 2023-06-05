<template>
  <v-dialog width="570px" v-model="brightIdDialog">
    <v-card min-height="602px" class="rounded-lg pb-5" :loading="brigthIdLoading">
      <v-toolbar elevation="0">
        <h5 class="text-18 weight-500">BrightID Meet verification</h5>
        <v-spacer></v-spacer>
        <v-btn flat icon color="primary" @click="brightIdDialog = false">
          <v-icon color="#193154">fa fa-xmark</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text v-if="brightIdStep === 1" class="text-black">
        <v-row>
          <v-col class="d-flex justify-center mt-9">
            <img width="84px" src="@/assets/verification/brightIdLogo.svg" alt="" />
          </v-col>
        </v-row>
        <h5 class="text-18 font-weight-regular mt-11">
          <b class="text-18 weight-600">Step 1:</b> Download BrightID app
          and create an account.
        </h5>
        <v-row class="mt-2">
          <v-col class="text-center">
            <a class="mx-2"
              href="https://play.google.com/store/apps/details?id=org.brightid&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img
                width="162px" height="48px" alt="Get it on Google Play" src="@/assets/verification/googlePlay.svg" /></a>
            <a class="mx-2" href="https://play.google.com/store/apps/details?id=org.brightid"><img width="162px"
                height="48px" alt="Get it on Google Play" src="@/assets/verification/appStore.svg" /></a>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-if="brightIdStep === 1" class="card-actions">
        <v-row class="full-width" justify="center">
          <v-col class="pb-0" cols="9">
            <p>Need help? Check our <a
                @click="openWindow('https://docs.muon.net/muon-network/muon-nodes/joining-alice-testnet/uniqueness-verification/brightid-meet-verification')">
                step-by-step guide</a>.</p>
            <v-btn x-large elevation="0" block class="rounded-sm  py-4 px-15 text-h6 text-normal" color="primary"
              @click="brightIdStep = 2">
              I have a BrightID Account
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
      <v-card-text v-if="brightIdStep === 2" class="text-black">
        <v-row>
          <v-col class="d-flex justify-center mt-9">
            <img width="84px" src="@/assets/verification/brightIdLogo.svg" alt="" />
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col cols="2"><b class="text-18 weight-600">Step 2:</b></v-col>
          <v-col class="px-0">
            <p class="text-18 font-weight-regular pr-5">
              Join a verification party at
              <a class="black--text text-decoration-underline" @click="openWindow('https://meet.brightid.org')">
                meet.brightid.org</a>
              and choose one of the meetings that fit your
              schedule. Once you have successfully participated in a meeting, you will be granted the Meet Verification
              badge
              in your BrightID app.
            </p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-if="brightIdStep === 2" class="card-actions">
        <div class="card-warning rounded-sm pa-2">
          <v-row>
            <v-col align-self="center" cols="1">

              <v-icon class="icon_font" color="#F59569">fas
                fa-circle-exclamation</v-icon>
            </v-col>
            <v-col align-self="center">
              <p class="text-body-2 mb-0">Please note that it typically takes about 1 hour to receive you badge after the
                meeting.</p>
            </v-col>
          </v-row>
        </div>
        <v-btn x-large elevation="0" class="rounded-sm mt-2  py-4 px-15 text-h6 text-normal" color="primary"
          @click="brightIdStep = 3">
          I have a Meet Verification badge
        </v-btn>
      </v-card-actions>
      <v-card-text class="text-black" v-if="brightIdStep === 3">
        <v-row>
          <v-col class="d-flex justify-center mt-9">
            <img width="84px" src="@/assets/verification/brightIdLogo.svg" alt="" />
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col cols="2"><b class="text-18 weight-600">Step 3:</b></v-col>
          <v-col class="px-0">
            <p class="text-18 font-weight-regular pr-5">
              Please verify your staking address.
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2"></v-col>
          <v-col class="d-flex justify-start px-0">
            <div class="wallet-connected d-inline-flex justify-space-between align-center px-6">
              <div class="text-left">
                <b class="text-body-1 font-weight-reguler">
                  wallet connected
                </b>
                <br />
                <b class="text-body-1 font-weight-medium primary--text">{{ addressShow }}</b>
              </div>
              <v-btn @click="isConnected = false" elevation="0"
                class="rounded-sm text-body-1 font-weight-medium primary--text" color="#5158F621">Disconnect</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-if="brightIdStep === 3" class="card-actions">
        <v-btn :loading="brigthIdLoading" x-large elevation="0" class="rounded-sm mt-2  py-4 px-15 text-h6 text-normal"
          color="primary" @click="brightIdVerification">
          Verify Address
        </v-btn>
      </v-card-actions>
      <v-card-text v-if="brightIdStep === 4" style="margin-bottom: 90px;">
        <v-row>
          <v-col cols="2"><b class="text-18 weight-600">Step 4:</b></v-col>
          <v-col class="px-0">
            <p class="text-18 font-weight-regular pr-5">
              Open the app and scan the QR Code below.
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <qr-code
              :text="`brightid://link-verification/http:%2F%2Fbrightid2.idealmoney.io/Muon/${brightIdContextId}`"></qr-code>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2"><b class="text-18 weight-600">Step 4:</b></v-col>
          <v-col class="px-0">
            <p class="text-18 font-weight-regular pr-5">
              After scanning the QR code, wait until you see the "Successfully linked" message in the app.
              next, click on the "Verify Link" button to complete the linking process.
            </p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-if="brightIdStep === 4" class="card-actions">
        <v-btn :loading="brigthIdLoading" x-large elevation="0" class="rounded-sm mt-2  py-4 px-15 text-h6 text-normal"
          color="primary" @click="checkBrightIdStatus">
          Verify Link
        </v-btn>
      </v-card-actions>
      <v-card-text class="text-black" v-if="brightIdStep === 5">
        <v-row class="mt-15">
          <v-col class="d-flex justify-center">
            <v-badge bottom color="green" icon="mdi-check" overlap offset-x="20" offset-y="20">
              <img width="84px" src="@/assets/verification/brightIdLogo.svg" alt="" />
            </v-badge>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col class="text-center">
            <p class="text-18">
              Congratulations! <br />
              You passed BrightID Meet verification. <br />
              You are granted access to run an Alice Starter node.
            </p>
            <v-btn elevation="0" class="rounded-sm mt-10 py-3 px-6 text-body-1 font-weight-medium primary--text"
              color="#5158F621" @click="closeBrightIdDialog">
              Back to verification center
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-black" v-if="brightIdStep === 6">
        <v-row class="mt-15">
          <v-col class="d-flex justify-center">
            <v-badge bottom color="red" icon="mdi-close" overlap offset-x="20" offset-y="20">
              <img width="84px" src="@/assets/verification/brightIdLogo.svg" alt="" />
            </v-badge>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col class="text-center px-15">
            <p v-if="errorMessage" class="text-18">
              {{ errorMessage }}
            </p>
            <p v-else class="text-18">
              Sorry. Your verification process was unsuccessful. Please try
              again, or contact our <a href="#">Tech Support</a> for further
              assistance.
            </p>
            <v-btn elevation="0" class="rounded-sm mt-10 py-3 px-6 text-body-1 font-weight-medium primary--text"
              color="#5158F621" @click="brightIdDialog = false">
              Back to verification center
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { useDashboardStore } from "@/stores/dashboardStore";
import { useVerificationsStore } from "@/stores/verifications";
import { mapActions, mapWritableState, mapState } from "pinia";
import VueQRCodeComponent from "vue-qrcode-component";

export default {
  name: "verificationTelegram",
  components: { "qr-code": VueQRCodeComponent },
  watch: {
    brightIdDialog(newVal, oldVal) {
      if (!newVal) {
        this.brightIdStep = 1
        window.clearInterval(this.brighitIdIntervalRequest)
        this.brigthIdLoading = false
        this.errorMessage = ""
      }
    }
  },
  methods: {
    ...mapActions(useVerificationsStore, [
      "checkBrightIdStatus",
      "brightIdVerification",
    ]),
    openWindow(url) {
      window.open(url, '_blank')
    },
    closeBrightIdDialog() {
      this.brightIdDialog = false, this.brightIdStep = 1
    }
  },
  computed: {
    ...mapWritableState(useVerificationsStore, [
      "brightIdDialog",
      "brightIdStep",
      "brigthIdLoading",
      "errorMessage"
    ]),
    ...mapState(useVerificationsStore, [
      "brightIdContextId",
      "brighitIdIntervalRequest"
    ]),
    ...mapState(useDashboardStore, ["addressShow"]),
  },
};
</script>

<style scoped>
.weight-500 {
  font-weight: 500;
}

.text-black {
  color: #323245 !important;
}

.disable-events {
  pointer-events: none;
}

.text-normal {
  text-transform: none;
}

.card-actions {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.card-warning {
  width: 370px;
  background-color: rgba(245, 149, 105, 0.2);
}

.wallet-connected {
  width: 412px;
  min-height: 92px;
  background-color: #5158f621;
  border-radius: 10px;
}
</style>
