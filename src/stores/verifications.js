import { defineStore } from "pinia";
import { verification as verificationStatus } from "@/utils/fetch";
import {
  telegramVerification,
  singMessage,
  saleRequest,
  discordRequest,
} from "@/utils/requestVerifications";
import { useDashboardStore } from "./dashboardStore";
export const useVerificationsStore = defineStore("verificationsStore", {
  state: () => ({
    telegramDialog: false,
    presaleLoading: false,
    verifications: {
      telegtamVerified: false,
      discordVerified: false,
      presaleVerified: false,
      brightidMeetsVerified: false,
      brightidAuraVerified: false,
    },
    discord: {
      success: "",
      msg: "",
    },
  }),

  actions: {
    getVerificationsStatus(staker) {
      verificationStatus(staker).then((response) => {
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
    telegramCallbackFunction(user) {
      const staker = useDashboardStore().account;
      // gets user as an input
      // id, first_name, last_name, username,
      // photo_url, auth_date and hash
      console.log(user);
      telegramVerification(user.id, user.username, user.hash, staker).then(
        (res) => {
          console.log(res);
        }
      );
    },
    presaleVerified(staker) {
      this.presaleLoading = true;
      const signer = useDashboardStore().account;
      singMessage(
        "Please sign this message to verify ownership of your Ethereum address to verify its uniqueness for Muon.",
        signer
      ).then(async (signature) => {
        await saleRequest(staker, signer, signature)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.presaleLoading = false;
          });
      });
    },
    discordVerified() {
      const staker = useDashboardStore().account;
      const URL = `https://discord.com/api/oauth2/authorize?client_id=1086713207541989428&redirect_uri=https%3A%2F%2Fmonitor1.muon.net%2Funiqueness%2Fdiscord&response_type=code&scope=identify&state=${staker}`;
      window.open(URL, "_blank");
    },
    discordResponsePage() {
      discordRequest().then((res) => {
        console.log(res);
      });
    },
  },
});