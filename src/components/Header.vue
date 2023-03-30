<template>
  <div>
    <v-row class="px-10 pb-md-0 py-3">
      <v-col md="2" sm="3" cols="12" class="text-left">
        <img src="../assets/muon-logo1.svg" width="120px" alt="" />
      </v-col>
      <v-col offset-md="6" md="4" sm="6" cols="7" class="d-flex justify-end">
        <div
          :class="[
            'float-right',
            'card',
            'px-2',
            'py-5',
            'mb-3',
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
            <span class="balance_amount mx-1">{{ aliceBalance }}</span>
            <span class="alice">ALICE</span>
          </div>
        </div>

        <v-btn
          v-if="!isCorrectChain"
          width="fit-content"
          small
          color="#ff58f61a"
          class="py-5"
          elevation="0"
          @click="switchNetwork"
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
            'rounded-lg',
            'px-4',
            'text-body-2',
          ]"
          elevation="0"
          @click="connectWallet"
        >
          {{ addressShow }}
        </v-btn>
        <!-- <div class="card px-2 py-2 justify-center">
          <span class="address">{{ addressShow }}</span>
        </div> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    addressShow: String,
    aliceBalance: String,
    isCorrectChain: Boolean,
    isConnected: Boolean,
    connectWallet: { type: Function },
    switchNetwork: { type: Function },
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
