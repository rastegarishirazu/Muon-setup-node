<template>
  <v-btn
    elevation="0"
    class="rounded-sm text-body-1 font-weight-medium primary--text"
    color="#5158F621"
    @click="checkBack($route.params.staker)"
    ><img width="24px" src="@/assets/verification/backToDashboard.svg" />Back to
    verification center
  </v-btn>
</template>

<script>
import { useVerificationsStore } from "@/stores/verifications";
import { mapActions } from "pinia";

export default {
  name: "backToVerification",
  methods: {
    ...mapActions(useVerificationsStore, ["checkBack"]),
  },
};
</script>
