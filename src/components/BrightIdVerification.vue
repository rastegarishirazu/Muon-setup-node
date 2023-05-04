<template>
  <v-dialog width="500px" v-model="brightIdDialog">
    <v-card :loading="brigthIdLoading">
      <v-card-title class="text-h5 grey lighten-2">
        Scan by BrightId app
      </v-card-title>

      <v-card-text>
        plase connect to telegram

        <qr-code :text="brightIdContextId"></qr-code>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :loading="brigthIdLoading"
          @click="checkBrightIdStatus"
          color="success"
        >
          I made the connection.
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useVerificationsStore } from "@/stores/verifications";
import { mapActions, mapWritableState, mapState } from "pinia";
import VueQRCodeComponent from "vue-qrcode-component";

export default {
  name: "verificationTelegram",
  components: { "qr-code": VueQRCodeComponent },
  methods: {
    ...mapActions(useVerificationsStore, [
      "telegramCallbackFunction",
      "checkBrightIdStatus",
    ]),
  },
  computed: {
    ...mapWritableState(useVerificationsStore, ["brightIdDialog"]),
    ...mapState(useVerificationsStore, [
      "brightIdContextId",
      "brigthIdLoading",
    ]),
  },
};
</script>
