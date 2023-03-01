<template>
  <v-progress-linear v-model="test" height="25"></v-progress-linear>
</template>

<script>
export default {
  name: "initialNode",
  props: {
    startTime: Number,
  },
  data: () => ({
    watingTime: 8, // minutes
  }),
  methods: {
    remainCalculating() {
      var now = new Date().getTime();
      var remain = now - startTime;
      return this.watingTime * 60 - remain;
    },
    persentComplete() {},
  },
};
</script>
