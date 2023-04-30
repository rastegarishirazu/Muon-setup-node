<template>
  <div transition="fade-transition">
    <v-card v-show="show" color="#FDEAE1" class="rounded-sm pl-5" elevation="0">
      <v-row>
        <v-col cols="1" align-self="center" class="d-flex justify-center">
          <v-icon class="icon_font" color="#F59569"
            >fas fa-circle-exclamation</v-icon
          >
        </v-col>
        <v-col class="pr-0">
          <p class="text-subtitle-2 allert_font" v-html="message"></p
        ></v-col>
        <v-col cols="2" class="text-end pl-0 pr-6"
          ><v-btn @click="show = false" icon>
            <v-img src="@/assets/dashboard/Close-button.svg"></v-img> </v-btn
        ></v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showCard() {
      this.show = true;
    },
  },
  created() {
    setTimeout(this.showCard, 2000);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
.allert_font {
  font-weight: 400;
  font-family: "Inter", sans-serif !important;
}
.icon_font {
  font-size: 32px;
  font-weight: 900;
}
.theme--light.v-application code {
  background-color: #6f7787 !important;
}
</style>
