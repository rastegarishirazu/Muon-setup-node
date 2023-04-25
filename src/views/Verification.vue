<template>
  <div class="padding-verification mt-10">
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
            <v-btn
              text
              @click="$router.push('/')"
              class="primary--text text-capitalize text-decoration-underline"
            >
              <img
                width="24px"
                src="@/assets/verification/backToDashboard.svg"
              />Back to dashboard
            </v-btn></v-col
          >
        </v-row>
        <p class="font-weight-regular text-18 mt-2">
          Welcome to Alice's Uniqueness Verification Center! Here, you can
          complete our verification processes to access and operate our 3-tier
          levels of nodes. Please note that each verification method corresponds
          to a specific node tier, granting you the ability to run nodes within
          that tier
        </p>
      </v-col>
      <v-col md="4" cols="12">
        <v-card
          class="gradient-4 full-height px-8 py-4 rounded-lg"
          elevation="0"
        >
          <h5 class="font-weight-regular text-18 textGray--text">
            Your verification pass
          </h5>
          <v-card-text class="font-weight-medium px-0 mt-5 text-18">
            You haven’t passed any of the verifications
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" cols="12"
        ><v-card
          color="rgba(81, 88, 246, 0.1)"
          class="node_id_card px-5 py-4 rounded-lg full-height"
          elevation="0"
        >
          <h5 class="text-18 font-weight-medium">
            Muon Private sale Participation
          </h5>
          <v-row class="mt-10">
            <v-col>
              <b class="font-weight-regular text-body-2 sub-color"
                >Tier(s) authorization:</b
              >
              <div class="mt-2">
                <v-icon color="#414141">mdi-circle-medium</v-icon>
                <span class="font-weight-regular"> Alice Starter </span>
              </div>
            </v-col>
            <v-col class="text-right" align-self="center"
              ><v-btn
                elevation="0"
                color="rgba(81, 88, 246, 0.1)"
                class="py-6 px-3 primary--text text-subtitle-1 rounded-sm font-weight-medium text-capitalize"
                @click=""
                >Pass verification</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col md="4" cols="12"
        ><v-card
          color="rgba(81, 88, 246, 0.1)"
          class="node_id_card px-5 py-4 rounded-lg full-height"
          elevation="0"
        >
          <h5 class="text-18 font-weight-medium">Muon Presale Participation</h5>
          <v-row class="mt-10">
            <v-col>
              <b class="font-weight-regular text-body-2 sub-color"
                >Tier(s) authorization:</b
              >
              <div class="mt-2">
                <v-icon color="#414141">mdi-circle-medium</v-icon>
                <span class="font-weight-regular"> Alice Starter </span>
              </div>
            </v-col>
            <v-col class="text-right" align-self="center"
              ><v-btn
                elevation="0"
                color="rgba(81, 88, 246, 0.1)"
                class="py-6 px-3 primary--text text-subtitle-1 rounded-sm font-weight-medium text-capitalize"
                @click=""
                >Pass verification</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col md="4" cols="12"
        ><v-card
          color="rgba(81, 88, 246, 0.1)"
          class="node_id_card px-5 py-4 rounded-lg full-height"
          elevation="0"
        >
          <div class="d-inline-flex align-center">
            <h5 class="text-18 font-weight-medium">Active discord users</h5>
            <img class="ml-1" src="@/assets/verification/Info.svg" />
          </div>
          <v-row class="mt-10">
            <v-col>
              <b class="font-weight-regular text-body-2 sub-color"
                >Tier(s) authorization:</b
              >
              <div class="mt-2">
                <v-icon color="#414141">mdi-circle-medium</v-icon>
                <span class="font-weight-regular"> Alice Starter </span>
              </div>
            </v-col>
            <v-col class="text-right" align-self="center"
              ><v-btn
                elevation="0"
                color="rgba(81, 88, 246, 0.1)"
                class="py-6 px-3 primary--text text-subtitle-1 rounded-sm font-weight-medium text-capitalize"
                @click=""
                >Pass verification</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="8" cols="12"
        ><v-card
          color="rgba(81, 88, 246, 0.1)"
          class="node_id_card px-5 py-4 rounded-lg full-height"
          elevation="0"
        >
          <div class="d-inline-flex align-center">
            <h5 class="text-18 font-weight-medium">
              BrightID Aura Verification
            </h5>
            <img class="ml-1" src="@/assets/verification/Info.svg" />
          </div>
          <v-row class="mt-10">
            <v-col cols="8">
              <b class="font-weight-regular text-body-2 sub-color"
                >Tier(s) authorization:</b
              >
              <div class="mt-2 d-inline-flex align-center">
                <div>
                  <v-icon color="#414141">mdi-circle-medium</v-icon>
                  <b class="font-weight-regular">
                    Alice Starter: <span class="boronze">Boronze</span>
                  </b>
                </div>
                <div class="ml-5">
                  <v-icon color="#414141">mdi-circle-medium</v-icon>
                  <b class="font-weight-regular">
                    Alice Starter: <span class="silver">Silver</span>
                  </b>
                </div>
                <div class="ml-5">
                  <v-icon color="#414141">mdi-circle-medium</v-icon>
                  <b class="font-weight-regular">
                    Alice Starter: <span class="gold">Gold</span>
                  </b>
                </div>
              </div>
            </v-col>
            <v-col class="text-right" align-self="center"
              ><v-btn
                elevation="0"
                color="rgba(81, 88, 246, 0.1)"
                class="py-6 px-3 primary--text text-subtitle-1 rounded-sm font-weight-medium text-capitalize"
                @click=""
                >Pass verification</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col md="4" cols="12"
        ><v-card
          color="rgba(81, 88, 246, 0.1)"
          class="node_id_card px-5 py-4 rounded-lg full-height"
          elevation="0"
        >
          <div class="d-inline-flex align-center">
            <h5 class="text-18 font-weight-medium">
              BrightID Meet Verification
            </h5>
            <img class="ml-1" src="@/assets/verification/Info.svg" />
          </div>
          <v-row class="mt-10">
            <v-col>
              <b class="font-weight-regular text-body-2 sub-color"
                >Tier(s) authorization:</b
              >
              <div class="mt-2">
                <v-icon color="#414141">mdi-circle-medium</v-icon>
                <span class="font-weight-regular"> Alice Starter </span>
              </div>
            </v-col>
            <v-col class="text-right" align-self="center"
              ><v-btn
                elevation="0"
                color="rgba(81, 88, 246, 0.1)"
                class="py-6 px-3 primary--text text-subtitle-1 rounded-sm font-weight-medium text-capitalize"
                @click=""
                >Pass verification</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { useDashboardStore } from "@/stores/dashboardStore";
import { mapWritableState } from "pinia";

export default {
  name: "verification",

  created() {
    this.cardLoading = false;
  },
  computed: {
    ...mapWritableState(useDashboardStore, ["cardLoading"]),
  },
};
</script>

<style scoped>
.gradient-4 {
  background: linear-gradient(
    92.79deg,
    rgba(246, 150, 81, 0.177) -1.84%,
    rgba(246, 81, 121, 0.183) 108.07%
  );
}
.sub-color {
  color: #232323;
}
.boronze {
  color: #6a3805;
}
.silver {
  color: #989898;
}
.gold {
  color: #c9b037;
}
.padding-verification {
  padding-left: 124px;
  padding-right: 124px;
  padding-bottom: 70px;
}
</style>
