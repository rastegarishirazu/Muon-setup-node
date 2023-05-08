<template>
  <v-main>
    <v-row justify="center" style="height: 100%">
      <v-col cols="10" align-self="center" class="text-center">
        <v-badge
          bottom
          color="red"
          icon="mdi-close"
          overlap
          offset-x="20"
          offset-y="20"
        >
          <img
            width="84px"
            src="@/assets/verification/brightIdLogo.svg"
            alt=""
          />
        </v-badge>
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
