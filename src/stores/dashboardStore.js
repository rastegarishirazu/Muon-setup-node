import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboardStore", {
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
