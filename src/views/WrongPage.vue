<template>
  <div>
    <v-responsive min-height="80vh">
      <v-row class="full-height">
        <v-col align-self="center" class="text-center">
          <div>
            <img
              src="@/assets/wrongPage/business-3d-robot-assistant-error.svg"
              alt=""
            />
          </div>

          <div>
            <h1 class="font-weight-bold text-h3 text-shadow mt-5">
              Something went wrong
            </h1>
            <h2 class="mt-6 sub-text">We will be back soon, plese try later</h2>
          </div>
        </v-col>
      </v-row>
    </v-responsive>
  </div>
</template>

<script>
import { useDashboardStore } from "@/stores/dashboardStore";
import { mapWritableState } from "pinia";

export default {
  name: "WrongPage",

  created() {
    this.cardLoading = false;
  },
  computed: {
    ...mapWritableState(useDashboardStore, ["cardLoading"]),
  },
};
</script>

<style scoped>
.text-shadow {
  text-shadow: 2px 3px #5158f6;
}
.sub-text {
  font-size: 32px;
  font-weight: 500;
}
</style>
