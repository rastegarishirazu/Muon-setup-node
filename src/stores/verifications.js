import { defineStore } from "pinia";
import { verification } from "@/utils/fetch";
export const useVerificationsStore = defineStore("verificationsStore", {
  state: () => ({
    verifications: {
      telegtamVerified: false,
      discordVerified: false,
      presaleVerified: false,
      privateSaleVerified: false,
      brightidMeetsVerified: false,
      brightidAuraVerified: false,
    },
  }),

  actions: {
    getVerificationsStatus(staker) {
      verification(staker).then((response) => {
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
      });
    },
    yourCallbackFunction(user) {
      // gets user as an input
      // id, first_name, last_name, username,
      // photo_url, auth_date and hash
      console.log(user);
    },
  },
});
