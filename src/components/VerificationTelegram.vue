<template>
  <v-dialog width="500px" v-model="telegramDialog">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Connect to telegram
      </v-card-title>

      <v-card-text> plase connect to telegram </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <vue-telegram-login
          mode="callback"
          telegram-login="MuonProjectBot"
          @callback="telegramCallbackFunction"
        />
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useVerificationsStore } from "@/stores/verifications";
import { mapActions, mapWritableState } from "pinia";
import { vueTelegramLogin } from "vue-telegram-login";

export default {
  name: "verificationTelegram",
  components: { vueTelegramLogin },
  methods: {
    ...mapActions(useVerificationsStore, ["telegramCallbackFunction"]),
  },
  computed: {
    ...mapWritableState(useVerificationsStore, ["telegramDialog"]),
  },
};
</script>
