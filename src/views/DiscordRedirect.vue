<template>
  <v-main>
    <v-row justify="center" style="height: 100%">
      <v-col align-self="center" class="text-center">
        <h1>wait</h1>
        <h1>success:{{ true }}</h1>
        <h1>message: {{ true }}</h1>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { mapActions } from "pinia";
import { useVerificationsStore } from "@/stores/verifications";
export default {
  name: "discordRedirect",

  methods: {
    ...mapActions(useVerificationsStore, ["discordResponsePage"]),
  },
  created() {
    this.discordResponsePage();
  },
};
</script>
