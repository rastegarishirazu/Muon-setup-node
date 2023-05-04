import { defineStore } from "pinia";
import {
  telegramVerification,
  singMessage,
  saleRequest,
  discordRequest,
  getBrightIdContextId,
  verification as verificationStatus,
  sponsorBrightIdRequest,
  checkBrightIdConnection,
} from "@/utils/requestVerifications";
import { useDashboardStore } from "./dashboardStore";
export const useVerificationsStore = defineStore("verificationsStore", {
  state: () => ({
    telegramDialog: false,
    brightIdContextId: "",
    presaleLoading: false,
    brightIdDialog: false,
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
    brighitIdIntervalRequest: null,
    brigIdTryed: 0,
  }),

  actions: {
    getVerificationsStatus(staker) {
      verificationStatus(staker).then((response) => {
        const data = response.data;
        console.log(data);
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
      telegramVerification(user, staker).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.verifications.telegtamVerified = true;
        }
      });
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
            if (res.data.success) {
              this.verifications.presaleVerified = true;
            }
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
      window.open(
        URL,
        "targetWindow",
        `toolbar=no,
       location=no,
       status=no,
       menubar=no,
       scrollbars=yes,
       resizable=yes,
       width=400,
       height=900`
      );
    },
    discordResponsePage() {
      discordRequest().then((res) => {
        console.log(res);
      });
    },
    brightIdVerification() {
      const staker = useDashboardStore().account;
      singMessage(
        "Please sign this message to verify ownership of your Ethereum address to verify its uniqueness for Muon.",
        staker
      ).then(async (signature) => {
        await getBrightIdContextId(staker, signature)
          .then(async (res) => {
            console.log(res);
            await sponsorBrightIdRequest(staker).then((sponsorRes) => {
              console.log(sponsorRes);
            });
            if (res.data.success) {
              this.brightIdContextId = res.data.result.contextId;
              this.brightIdDialog = true;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    checkBrightIdStatus() {
      const staker = useDashboardStore().account;
      this.brigIdTryed = 0;
      this.brighitIdIntervalRequest = setInterval(
        checkBrightIdConnection(staker)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              this.verifications.brightidMeetsVerified = true;
              clearInterval(this.brighitIdIntervalRequest);
            } else {
              this.brigIdTryed++;
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            if (this.brigIdTryed > 5) {
              clearInterval(this.brighitIdIntervalRequest);
            }
          }),
        20 * 1000
      );
    },
  },
});
