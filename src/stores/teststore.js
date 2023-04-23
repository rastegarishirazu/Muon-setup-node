import { defineStore } from "pinia";

export const useTestStore = defineStore("testStore", {
  state: () => ({
    jafarTest: 2,
  }),
  getters: {
    doubleJafar: (state) => state.jafarTest * 2,
  },
  actions: {
    increment() {
      this.jafarTest++;
    },
  },
});
