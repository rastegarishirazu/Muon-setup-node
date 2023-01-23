<template>
  <v-app
    :class="[
      $vuetify.theme.dark ? 'backgorundpic_dark' : 'backgorundpic_light',
    ]"
  >
    <v-main>
      <router-view />
    </v-main>
    <v-footer padless>
      <v-col cols="12" class="text-center myFont">
        <div class="d-flex align-center text-center justify-center">
          <span class="mx-2 myFont">Powered by</span>
          <img src="@/assets/muon-logo1.svg" alt="" />
        </div>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: { Header },
  data: () => ({
    //
  }),
};
</script>

<style>
.backgorundpic_dark {
  background-color: #313144 !important;
}
.backgorundpic_light {
  background-color: #f5f5f5 !important;
}
</style>
