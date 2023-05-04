<template>
  <v-main>
    <v-row justify="center" style="height: 100%">
      <v-col cols="10" align-self="center" class="text-center">
        <h1 class="text-body-2">{{ discordStatus }}</h1>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useVerificationsStore } from "@/stores/verifications";
export default {
  name: "discordRedirect",

  methods: {
    ...mapActions(useVerificationsStore, ["getCodeAndStakerFromRoute"]),
  },
  created() {
    this.getCodeAndStakerFromRoute(window.location.href);
  },
  computed: {
    ...mapState(useVerificationsStore, ["discordStatus"]),
  },
};
</script>
