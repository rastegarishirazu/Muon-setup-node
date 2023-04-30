import { defineStore } from "pinia";
import { verification } from "@/utils/fetch";
import { useDashboardStore } from "./dashboardStore";
export const useVerificationsStore = defineStore("verificationsStore", {
  state: () => ({
    verifications: {
      telegtamVerified: false,
      discordVerified: false,
      presaleVerified: false,
      privateSaleVerified: false,
      brightidMeetsVerified: false,
      brightidAuraVerified: true,
    },
  }),

  actions: {
    getVerificationsStatus(staker) {
      const dashboard = useDashboardStore();
      //   dashboard.$patch({ cardLoading: true });
      verification(staker)
        .then((response) => {
          const data = response.data;
          for (const [key, value] of Object.entries(this.verifications)) {
            this.verifications[key] = false;
          }
          if (data["success"]) {
            for (const [key, value] of Object.entries(data["result"])) {
              this.verifications[key] = value;
            }
          }
          console.log(data);
        })
        .finally(() => {
          //   dashboard.$patch({ cardLoading: false });
        });
    },
  },
});
