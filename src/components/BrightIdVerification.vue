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

      <v-card-text v-if="brightIdStep == 1" class="text-black">
        <v-row>
          <v-col class="d-flex justify-center mt-9">
            <img width="84px" src="@/assets/verification/brightIdLogo.svg" alt="" />
          </v-col>
        </v-row>
        <v-row class="">
          <v-col class="">
            <h5 class="text-18 font-weight-regular">
              <b class="text-18 weight-600">Step 1:</b> Please verify your
              staker (node runner) address
            </h5>
            <v-row>
              <v-col class="text-center">
                <v-btn v-if="!brightIdContextId" elevation="0"
                  class="rounded-sm mt-6 py-3 px-6 text-body-1 font-weight-medium" color="primary"
                  @click="brightIdVerification" :loading="brigthIdLoading">
                  verify address ({{ addressShow }})
                </v-btn>
                <v-btn v-else elevation="0"
                  class="disable-events rounded-sm mt-6 py-3 px-6 text-body-1 font-weight-medium primary--text"
                  color="#5158F621">
                  address verified!
                </v-btn>
              </v-col>
            </v-row>
            <h5 class="text-18 font-weight-regular mt-11">
              <b class="text-18 weight-600">Step 2:</b> Download BrightID app
              and create an account
            </h5>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <a class="mx-2"
              href="https://play.google.com/store/apps/details?id=org.brightid&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img
                width="162px" height="48px" alt="Get it on Google Play" src="@/assets/verification/googlePlay.svg" /></a>
            <a class="mx-2" href="https://play.google.com/store/apps/details?id=org.brightid"><img width="162px"
                height="48px" alt="Get it on Google Play" src="@/assets/verification/appStore.svg" /></a>
            <v-btn :disabled="!brightIdContextId" x-large elevation="0" class="rounded-sm mt-10 py-4 px-15 text-h6"
              color="primary" @click="brightIdStep = 2">
              I have brightID account
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-if="brightIdStep == 2" class="text-black">
        <v-row>
          <v-col class="d-flex justify-center mt-9">
            <img width="84px" src="@/assets/verification/brightIdLogo.svg" alt="" />
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col cols="2"><b class="text-18 weight-600">Step 3:</b></v-col>
          <v-col class="px-0">
            <p class="text-18 font-weight-regular pr-5">
              join a verification party at
              <a target="_blank" href="meet.brightid.org"> meet.brightid.org</a>
              and choose from one of the scheduled meetings that fit your
              schedule. Once you've successfully participated in a meeting,
              you'll be granted the Meet Verification badge in your BrightID
              app. After receiving this badge, you can now proceed to link your
              BrightID account to Alice (Step 4)
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn x-large elevation="0" class="rounded-sm mt-10 py-4 px-15 text-h6" color="primary"
              @click="brightIdStep = 3">
              I have Meet verification Badge
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-black" v-if="brightIdStep === 3">
        <v-row>
          <v-col cols="2"><b class="text-18 weight-600">Step 3:</b></v-col>
          <v-col class="px-0">
            <p class="text-18 font-weight-regular">
              Open app and scan the QR Code below
            </p>
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col class="d-flex justify-center">
            <qr-code
              :text="`brightid://link-verification/http:%2F%2Fbrightid2.idealmoney.io/Muon/${brightIdContextId}`"></qr-code>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2"><b class="text-18 weight-600">Step 4:</b></v-col>
          <v-col class="px-0">
            <p class="text-18 font-weight-regular">
              After scanning and connecting to brightID, click on submit
              connection and wait 2-5 minutes for verification result to show on
              this window
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn x-large elevation="0" class="rounded-sm mt-2 py-4 px-15 text-h6" color="primary"
              @click="checkBrightIdStatus" :loading="brigthIdLoading">
              Verify Link
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-black" v-if="brightIdStep === 4">
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
              You passed BrightID meet verification <br />
              Your access granted to run Alice Starter node
            </p>
            <v-btn elevation="0" class="rounded-sm mt-10 py-3 px-6 text-body-1 font-weight-medium primary--text"
              color="#5158F621" @click="brightIdDialog = false">
              Back to verification center
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text class="text-black" v-if="brightIdStep === 5">
        <v-row class="mt-15">
          <v-col class="d-flex justify-center">
            <v-badge bottom color="red" icon="mdi-close" overlap offset-x="20" offset-y="20">
              <img width="84px" src="@/assets/verification/brightIdLogo.svg" alt="" />
            </v-badge>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col class="text-center px-15">
            <p class="text-18">
              Sorry, your verification process was unsuccessful. Please try
              again, or contact our <a href="#">Tech Support</a> for further
              assistance
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
  methods: {
    ...mapActions(useVerificationsStore, [
      "checkBrightIdStatus",
      "brightIdVerification",
    ]),
  },
  computed: {
    ...mapWritableState(useVerificationsStore, [
      "brightIdDialog",
      "brightIdStep",
    ]),
    ...mapState(useVerificationsStore, [
      "brightIdContextId",
      "brigthIdLoading",
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
</style>
