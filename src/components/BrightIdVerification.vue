<template>
  <v-dialog width="500px" v-model="brightIdDialog">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Scan by BrightId app
      </v-card-title>

      <v-card-text>
        plase connect to telegram

        <qr-code :text="qrText"></qr-code>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-spacer></v-spacer>
      </v-card-actions>
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
    ...mapActions(useVerificationsStore, ["telegramCallbackFunction"]),
  },
  computed: {
    ...mapWritableState(useVerificationsStore, ["brightIdDialog"]),
    ...mapState(useDashboardStore, {
      qrText(store) {
        const staker = store.account;
        return `https://app.brightid.org/link-verification/http:%2F%2Fbrightid2.idealmoney.io/Muon/${staker}`;
      },
    }),
  },
};
</script>
