<template>
  <v-app class="backgorundpic_light">
    <Header
      v-if="!cardLoading"
      :addressShow="addressShow"
      :aliceBalance="muonTestTokenShow"
      :connectWallet="connectToMetamask"
      :switchNetwork="switchToCorrectChain"
      :isCorrectChain="isCorrectChain"
      :isConnected="isConnected"
    ></Header>
    <router-view />
    <v-footer app padless color="rgba(0,0,0,0)">
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
import Header from "./components/Header.vue";

export default {
  name: "app",
  components: { Header },
};
</script>

<style scoped lang="scss">
.backgorundpic_light {
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
