<template>
  <v-app-bar
    max-height="64px"
    elevation="0"
    color="rgba(0,0,0,0)"
    class="mb-10"
  >
    <img
      @click="$router.push('/')"
      src="../assets/muon-logo1.svg"
      width="120px"
      alt=""
      class="cursor-pointer"
    />
    <v-spacer></v-spacer>
    <div v-if="$vuetify.breakpoint.mdAndUp" class="d-flex">
      <div
        :class="[
          'rounded-sm',

          'card',
          'px-2',
          'py-5',
          'mr-4',
          'align-center',
          isConnected ? 'isConnected' : '',
        ]"
      >
        <v-responsive max-width="100px">
          <img
            src="../assets/header/Muon-token-icon.svg"
            width="24px"
            height="24px"
            class="token_logo"
            alt=""
          />
          <span class="balance_title text-caption ml-2 blackText--text">
            Balance:
          </span>
        </v-responsive>
        <div>
          <span class="balance_amount mx-1">{{ muonTestTokenShow }}</span>
          <span class="alice">ALICE</span>
        </div>
      </div>

      <v-btn
        v-if="!isCorrectChain"
        width="fit-content"
        small
        color="#ff58f61a"
        class="py-5 'rounded-sm'"
        elevation="0"
        @click="switchToCorrectChain"
      >
        switch network
      </v-btn>
      <v-btn
        v-else
        width="fit-content"
        small
        color="#ff58f61a"
        :class="[
          isConnected ? 'isConnected' : '',
          'py-5',
          'primary--text',
          'rounded-sm',
          'px-4',
          'text-body-2',
        ]"
        elevation="0"
        @click="connectToMetamask"
      >
        {{ addressShow }}
      </v-btn>
    </div>
    <v-app-bar-nav-icon v-else></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>
import { useDashboardStore } from "@/stores/dashboardStore";
import { mapActions, mapState } from "pinia";

export default {
  methods: {
    ...mapActions(useDashboardStore, [
      "connectToMetamask",
      "switchToCorrectChain",
    ]),
  },
  computed: {
    ...mapState(useDashboardStore, [
      "addressShow",
      "isCorrectChain",
      "isConnected",
    ]),
    ...mapState(useDashboardStore, {
      muonTestTokenShow(store) {
        if (store.tokenTestBalance) {
          const amount = Number(store.tokenTestBalance);
          return amount.toFixed(2);
        } else {
          return "0";
        }
      },
    }),
  },
};
</script>

<style scoped>
.card {
  width: fit-content;
  height: 30px;
  background: #ff58f61a;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
}
.isConnected {
  background: rgba(81, 88, 246, 0.1) !important;
  font-weight: 500;
}
.token_logo {
  float: left;
}
.balance_title {
  font-family: "Montserrat" !important;
  font-style: normal;
  font-weight: 400;
  font-size: 14px !important;
  line-height: 17px;
  text-transform: capitalize;
}
.balance_amount {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  text-transform: capitalize;

  /* Primary */

  color: #5158f6;
}
.alice {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;

  /* Black */

  color: #323245;
}
.address {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  text-transform: capitalize;

  /* Primary */

  color: #5158f6;
}
.float-right {
  float: right;
}
</style>
