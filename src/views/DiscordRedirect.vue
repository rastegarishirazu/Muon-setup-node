<template>
  <v-main>
    <v-responsive v-if="discordStep === 1" height="75vh">
      <v-row justify="center" style="height: 100%">
        <v-col align-self="center"></v-col>
        <lottie-vue-player ref="anim" src="https://lottie.host/1fb3a319-394b-446d-8fce-824aa4f1787c/xjtL4nMuB2.json"
          :autoplay="true" :loop="true" height="200px" class="transparent" />
      </v-row>
    </v-responsive>
    <v-row v-else-if="discordStep === 2" justify="center" style="height: 100%">
      <v-col cols="10" align-self="center" class="text-center">
        <v-badge bottom color="green" icon="mdi-check" overlap offset-x="20" offset-y="20">
          <img width="84px" src="@/assets/verification/Discord.svg" alt="" />
        </v-badge>
        <h5 class="mt-5 text-18 font-weight-regular">
          Congratulations! <br />
          You passed Discord Active Community member verification. You are granted access
          to run an Alice Starter node.
        </h5>
        <v-row class="mt-10">
          <v-col class="d-flex justify-center">
            <v-btn elevation="0" class="rounded-sm mt-10 py-3 px-6 text-body-1 font-weight-medium primary--text"
              color="#5158F621" @click="closePopup">
              Back to verification center
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else-if="discordStep === 3" justify="center" style="height: 100%">
      <v-col cols="10" align-self="center" class="text-center">
        <v-badge bottom color="red" icon="mdi-close" overlap offset-x="20" offset-y="20">
          <img width="84px" src="@/assets/verification/Discord.svg" alt="" />
        </v-badge>
        <h5 class="mt-5 text-18 font-weight-regular">
          Sorry. It looks like you haven't met our activity requirement. Please
          consider trying another verification method.
        </h5>
        <v-row class="mt-10">
          <v-col class="d-flex justify-center">
            <v-btn elevation="0" class="rounded-sm mt-10 py-3 px-6 text-body-1 font-weight-medium primary--text"
              color="#5158F621" @click="closePopup">
              Back to verification center
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { useDashboardStore } from "@/stores/dashboardStore";
import { useVerificationsStore } from "@/stores/verifications";
import { mapActions, mapState, mapWritableState } from "pinia";

export default {
  name: "apiVerify",
  components: {},

  methods: {
    ...mapActions(useVerificationsStore, [
      "getCodeAndStakerFromRoute",
      "closePopup",
    ]),
  },
  created() {
    this.getCodeAndStakerFromRoute(window.location.href);
    this.liveChat = false
  },
  computed: {
    ...mapState(useVerificationsStore, ["presaleLoading", "discordStep"]),
    ...mapWritableState(useVerificationsStore, [
      "snackbarErorr",
      "snackbarErorrMsg",
    ]),
    ...mapWritableState(useDashboardStore, ['liveChat'])
  },
};
</script>
