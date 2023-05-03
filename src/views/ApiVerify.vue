<template>
  <v-main>
    <v-row justify="center" style="height: 100%">
      <v-col align-self="center" class="text-center d-flex justify-center">
        <v-card width="400px" :loading="presaleLoading">
          <v-card-title primary-title>
            {{ $route.params.api }} verification
          </v-card-title>
          <v-card-text class="py-12 text-center">
            Node staker address: {{ $route.params.staker }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="presaleVerified($route.params.staker)"
              color="success"
              :loading="presaleLoading"
              >verify</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import { useVerificationsStore } from "@/stores/verifications";
import { mapActions, mapState } from "pinia";

export default {
  name: "apiVerify",
  components: {},

  methods: {
    ...mapActions(useVerificationsStore, ["presaleVerified"]),
  },
  computed: {
    ...mapState(useVerificationsStore, ["presaleLoading"]),
  },
};
</script>
