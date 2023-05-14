<template>
  <div :class="[
    $vuetify.breakpoint.lgAndUp ? 'padding-verification-md' : 'px-5 pb-15',
    'mt-10',
  ]">
    <v-row justify="center">
      <v-col style="max-width: 1300px">
        <v-row>
          <v-col md="8" cols="12">
            <v-row justify="space-between">
              <v-col cols="8" class="d-inline-flex align-center">
                <img width="43px" src="@/assets/dashboard/WalletCheck.svg" />
                <h2 class="ml-5 font-weight-regular text-h5">
                  Alice Uniqueness verification
                </h2>
              </v-col>
              <v-col class="text-right">
                <v-btn text @click="$router.push('/')" class="primary--text text-capitalize text-decoration-underline">
                  <img width="24px" src="@/assets/verification/backToDashboard.svg" />Back to dashboard
                </v-btn></v-col>
            </v-row>
            <p class="font-weight-regular text-18 mt-2">
              Welcome to Alice's Uniqueness Verification Center! Here, you can
              complete our verification processes to access and operate our
              3-tier levels of nodes. Please note that each verification method
              corresponds to a specific node tier, granting you the ability to
              run nodes within that tier
            </p>
          </v-col>
          <v-col md="4" cols="12">
            <v-card class="gradient-4 full-height px-8 py-4 rounded-lg" elevation="0">
              <h5 class="font-weight-regular text-18 textGray--text">
                Your verification pass
              </h5>
              <v-card-text class="font-weight-medium px-0 mt-5 text-18">
                <b class="text-18 font-weight-medium" v-for="title in verificationsPass">{{ title }}</b>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="4" cols="12"><v-card :color="verifications['presaleVerified']
            ? 'rgba(35, 181, 211, 0.3)'
            : 'rgba(81, 88, 246, 0.1)'
            " class="node_id_card px-5 py-4 rounded-lg full-height" elevation="0">
              <h5 class="text-18 font-weight-medium">
                Muon Presale Participation
              </h5>
              <v-row class="mt-10">
                <v-col>
                  <b class="font-weight-regular text-body-2 sub-color">Tier(s) authorization:</b>
                  <div class="mt-2">
                    <v-icon color="#414141">mdi-circle-medium</v-icon>
                    <span class="font-weight-regular"> Alice Starter </span>
                  </div>
                </v-col>
                <v-col class="text-right" align-self="center"><v-btn
                    @click="$router.push(`/verification/presale/${account}`)" elevation="0" :color="verifications['presaleVerified']
                      ? '#23B5D3'
                      : 'rgba(81, 88, 246, 0.1)'
                      " :class="[
    'py-6',
    'px-3',
    verifications['presaleVerified']
      ? 'white--text'
      : 'primary--text',
    'text-subtitle-1',
    'rounded-sm',
    'font-weight-medium',
    'text-capitalize',
    {
      'disable-events': verifications['presaleVerified'],
    },
  ]" exact>{{
  verifications["presaleVerified"]
  ? `Verification passed!`
  : `Pass verification`
}}</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="4" cols="12"><v-card :color="verifications['telegtamVerified']
                ? 'rgba(35, 181, 211, 0.3)'
                : 'rgba(81, 88, 246, 0.1)'
              " class="node_id_card px-5 py-4 rounded-lg full-height" elevation="0">
              <h5 class="text-18 font-weight-medium">
                Active Community Member (Telegram)
              </h5>
              <v-row class="mt-10">
                <v-col>
                  <b class="font-weight-regular text-body-2 sub-color">Tier(s) authorization:</b>
                  <div class="mt-2">
                    <v-icon color="#414141">mdi-circle-medium</v-icon>
                    <span class="font-weight-regular"> Alice Starter </span>
                  </div>
                </v-col>
                <v-col class="text-right" align-self="center"><v-btn elevation="0" :color="verifications['telegtamVerified']
                  ? '#23B5D3'
                  : 'rgba(81, 88, 246, 0.1)'
                  " :class="[
    'py-6',
    'px-3',
    verifications['telegtamVerified']
      ? 'white--text'
      : 'primary--text',
    'text-subtitle-1',
    'rounded-sm',
    'font-weight-medium',
    'text-capitalize',
    {
      'disable-events': verifications['telegtamVerified'],
    },
  ]" @click="telegramDialog = true">
                    {{
                      verifications["telegtamVerified"]
                      ? `Verification passed!`
                      : `Pass verification`
                    }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="4" cols="12"><v-card :color="verifications['discordVerified']
                ? 'rgba(35, 181, 211, 0.3)'
                : 'rgba(81, 88, 246, 0.1)'
              " class="node_id_card px-5 py-4 rounded-lg full-height" elevation="0">
              <div class="d-inline-flex align-center">
                <h5 class="text-18 font-weight-medium">
                  Active Community Member (Discord)
                </h5>
                <img class="ml-1" src="@/assets/verification/Info.svg" />
              </div>
              <v-row class="mt-10">
                <v-col>
                  <b class="font-weight-regular text-body-2 sub-color">Tier(s) authorization:</b>
                  <div class="mt-2">
                    <v-icon color="#414141">mdi-circle-medium</v-icon>
                    <span class="font-weight-regular"> Alice Starter </span>
                  </div>
                </v-col>
                <v-col class="text-right" align-self="center"><v-btn elevation="0" :color="verifications['discordVerified']
                  ? '#23B5D3'
                  : 'rgba(81, 88, 246, 0.1)'
                  " :class="[
    'py-6',
    'px-3',
    verifications['discordVerified']
      ? 'white--text'
      : 'primary--text',
    'text-subtitle-1',
    'rounded-sm',
    'font-weight-medium',
    'text-capitalize',
    {
      'disable-events': verifications['discordVerified'],
    },
  ]" @click="discordVerified">{{
  verifications["discordVerified"]
  ? `Verification passed!`
  : `Pass verification`
}}</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="4" cols="12"><v-card :color="verifications['brightidMeetsVerified']
                ? 'rgba(35, 181, 211, 0.3)'
                : 'rgba(81, 88, 246, 0.1)'
              " class="node_id_card px-5 py-4 rounded-lg full-height" elevation="0">
              <div class="d-inline-flex align-center">
                <h5 class="text-18 font-weight-medium">
                  BrightID Meet Verification
                </h5>
                <img class="ml-1" src="@/assets/verification/Info.svg" />
              </div>
              <v-row class="mt-10">
                <v-col>
                  <b class="font-weight-regular text-body-2 sub-color">Tier(s) authorization:</b>
                  <div class="mt-2">
                    <v-icon color="#414141">mdi-circle-medium</v-icon>
                    <span class="font-weight-regular"> Alice Starter </span>
                  </div>
                </v-col>
                <v-col class="text-right" align-self="center"><v-btn elevation="0" :color="verifications['brightidMeetsVerified']
                  ? '#23B5D3'
                  : 'rgba(81, 88, 246, 0.1)'
                  " :class="[
    'py-6',
    'px-3',
    verifications['brightidMeetsVerified']
      ? 'white--text'
      : 'primary--text',
    'text-subtitle-1',
    'rounded-sm',
    'font-weight-medium',
    'text-capitalize',
    {
      'disable-events':
        verifications['brightidMeetsVerified'],
    },
  ]" @click="brightIdDialog = true">{{
  verifications["brightidMeetsVerified"]
  ? `Verification passed!`
  : `Pass verification`
}}</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col md="8" cols="12"><v-card :color="verifications['brightidAuraVerified']
                ? 'rgba(35, 181, 211, 0.3)'
                : 'rgba(81, 88, 246, 0.1)'
              " class="node_id_card px-5 py-4 rounded-lg full-height" elevation="0" disabled>
              <div class="d-inline-flex align-center">
                <h5 class="text-18 font-weight-medium">
                  BrightID Aura Verification (Coming soon)
                </h5>
                <img class="ml-1" src="@/assets/verification/Info.svg" />
              </div>
              <v-row class="mt-10">
                <v-col md="9" cols="12">
                  <b class="font-weight-regular text-body-2 sub-color">Tier(s) authorization:</b>
                  <div class="mt-2 d-inline-flex align-center">
                    <div>
                      <v-icon color="#414141">mdi-circle-medium</v-icon>
                      <b class="font-weight-regular">
                        Alice Pro: <span class="bronze">Bronze</span>
                      </b>
                    </div>
                    <div class="ml-5">
                      <v-icon color="#414141">mdi-circle-medium</v-icon>
                      <b class="font-weight-regular">
                        Alice Master: <span class="silver">Silver</span>
                      </b>
                    </div>
                  </div>
                </v-col>
                <v-col class="text-right" align-self="center">
                  <v-btn elevation="0" :color="verifications['brightidAuraVerified']
                    ? '#23B5D3'
                    : 'rgba(81, 88, 246, 0.1)'
                    " :class="[
    'py-6',
    'px-3',
    verifications['brightidAuraVerified']
      ? 'white--text'
      : 'primary--text',
    'text-subtitle-1',
    'rounded-sm',
    'font-weight-medium',
    'text-capitalize',
    {
      'disable-events': verifications['brightidAuraVerified'],
    },
  ]" @click="">{{
  verifications["brightidAuraVerified"]
  ? `Verification passed!`
  : `Pass verification`
}}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <VerificationTelegram></VerificationTelegram>
    <BrightIdVerification></BrightIdVerification>
    <v-snackbar v-model="snackbarErorr">
      {{ snackbarErorrMsg }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbarErorr = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { useDashboardStore } from "@/stores/dashboardStore";
import { useVerificationsStore } from "@/stores/verifications";
import { mapActions, mapState, mapWritableState } from "pinia";
import VerificationTelegram from "@/components/VerificationTelegram.vue";
import BrightIdVerification from "@/components/BrightIdVerification.vue";

export default {
  name: "verification",
  components: { VerificationTelegram, BrightIdVerification },
  watch: {
    verificationLoading(newData) {
      // this.cardLoading = false;
    },
  },
  methods: {
    ...mapActions(useVerificationsStore, [
      "getVerificationsStatus",
      "presaleVerified",
      "discordVerified",
      "brightIdVerification",
    ]),
  },
  async created() {
    this.getVerificationsStatus(this.account);
  },

  computed: {
    ...mapState(useVerificationsStore, ["verifications"]),
    ...mapState(useDashboardStore, ["account"]),
    ...mapWritableState(useDashboardStore, ["cardLoading"]),
    ...mapWritableState(useVerificationsStore, [
      "telegramDialog",
      "brightIdDialog",
      "snackbarErorr",
      "snackbarErorrMsg",
    ]),
    ...mapState(useVerificationsStore, {
      verificationsPass(store) {
        const verificationTitle = {
          telegtamVerified: "Active Community Member (Telegram)",
          discordVerified: "Active Community Member (Discord)",
          presaleVerified: "Muon Presale Participation",
          brightidMeetsVerified: "BrightID Meet Verification",
          brightidAuraVerified: "BrightID Aura Verification",
        };
        const verifications = store.verifications;
        let myList = [];
        for (const property in verifications) {
          if (verifications[property]) myList.push(verificationTitle[property]);
        }
        if (!myList.length)
          myList.push("You haven’t passed any of the verifications");
        return myList;
      },
    }),
  },
  mounted() {
    this.getVerificationsStatus();
  },
};
</script>

<style scoped>
.gradient-4 {
  background: linear-gradient(92.79deg,
      rgba(246, 150, 81, 0.177) -1.84%,
      rgba(246, 81, 121, 0.183) 108.07%);
}

.sub-color {
  color: #232323;
}

.bronze {
  color: #6a3805;
}

.silver {
  color: #989898;
}

.gold {
  color: #c9b037;
}

@media (max-width: 1510px) {
  .padding-verification-md {
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 70px;
  }
}

@media (min-width: 1510px) {
  .padding-verification-md {
    padding-left: 124px;
    padding-right: 124px;
    padding-bottom: 70px;
  }
}

.disable-events {
  pointer-events: none;
}
</style>
