<template>
  <v-dialog width="570px" v-model="telegramDialog">
    <v-card min-height="602px" class="rounded-lg pb-5">
      <v-toolbar elevation="0">
        <v-spacer></v-spacer>
        <v-btn flat icon color="primary" @click="telegramDialog = false">
          <v-icon color="#193154">fa fa-xmark</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text v-if="telegramStep === 1" class="text-black">
        <v-row class="mt-10">
          <v-col class="d-flex justify-center">
            <img src="@/assets/verification/telegramLogin.svg" width="90px" alt="" />
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col class="text-center">
            <h5 class="text-18 font-weight-regular">
              Please log in to your Telegram account <br />
              to evaluate your activity status.
            </h5>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col class="d-flex justify-center">
            <vue-telegram-login mode="callback" telegram-login="MuonProjectBot" @callback="telegramCallbackFunction" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-else-if="telegramStep === 2" class="text-black pt-10">
        <v-row class="mt-15">
          <v-col class="d-flex justify-center">
            <v-badge bottom color="green" icon="mdi-check" overlap offset-x="35" offset-y="25">
              <img src="@/assets/verification/Telegram.svg" width="118px" alt="" />
            </v-badge>
          </v-col>
        </v-row>
        <v-row class="mt-10" justify="center">
          <v-col cols="10" class="text-center">
            <h5 class="text-18 font-weight-regular">
              Congratulations! <br />
              You passed Telegram Active Community Member verification. You are granted
              access to run an Alice Starter node.
            </h5>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col class="d-flex justify-center">
            <v-btn elevation="0" class="rounded-sm mt-10 py-3 px-6 text-body-1 font-weight-medium primary--text"
              color="#5158F621" @click="telegramDialog = false">
              Back to verification center
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-else-if="telegramStep === 3" class="text-black pt-10">
        <v-row class="mt-15">
          <v-col class="d-flex justify-center">
            <v-badge bottom color="red" icon="mdi-close" overlap offset-x="35" offset-y="25">
              <img src="@/assets/verification/Telegram.svg" width="118px" alt="" />
            </v-badge>
          </v-col>
        </v-row>
        <v-row class="mt-10" justify="center">
          <v-col cols="10" class="text-center">
            <h5 class="text-18 font-weight-regular">
              Sorry. It looks like you haven't met our activity requirement.
              Please consider trying another verification method.
            </h5>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col class="d-flex justify-center">
            <v-btn elevation="0" class="rounded-sm mt-10 py-3 px-6 text-body-1 font-weight-medium primary--text"
              color="#5158F621" @click="telegramDialog = false">
              Back to verification center
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { useVerificationsStore } from "@/stores/verifications";
import { mapActions, mapState, mapWritableState } from "pinia";
import { vueTelegramLogin } from "vue-telegram-login";

export default {
  name: "verificationTelegram",
  components: { vueTelegramLogin },
  methods: {
    ...mapActions(useVerificationsStore, ["telegramCallbackFunction"]),
  },
  computed: {
    ...mapWritableState(useVerificationsStore, ["telegramDialog"]),
    ...mapState(useVerificationsStore, ["telegramStep"]),
  },
};
</script>

<style scoped>
.text-black {
  color: #323245 !important;
}
</style>
