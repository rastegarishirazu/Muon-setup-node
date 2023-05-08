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
    discordResponse: {
      code: "",
      staker: "",
    },
    discord: {
      success: "",
      msg: "",
    },
    brighitIdIntervalRequest: null,
    brightidTryed: 0,
    brightIdStep: 1,
    telegramStep: 1,
    discordStep: 1,
    snackbarErorr: false,
    snackbarErorrMsg: "",
    brigthIdLoading: false,
    discordStatus: "...Loading",
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
          this.telegramStep = 2;
        } else {
          console.log(res.data.message);
          this.telegramStep = 3;
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
            if (res.success) {
              this.verifications.presaleVerified = true;
            } else {
              this.snackbarErorrMsg = res.data.message;
              this.snackbarErorr = true;
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
      const URL = `https://discord.com/api/oauth2/authorize?client_id=1086713207541989428&redirect_uri=https%3A%2F%2Falice.muon.net%2Ftest%2FdiscordVerification%2Fdata&response_type=code&scope=identify&state=${staker}`;
      window.open(
        URL,
        "targetWindow",
        `toolbar=no,
       location=no,
       status=no,
       menubar=no,
       scrollbars=yes,
       resizable=yes,
       width=450,
       height=900`
      );
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
              if (sponsorRes.data.success) {
                this.brightIdContextId = res.data.result.contextId;
                this.brightIdDialog = true;
              } else {
                this.snackbarErorrMsg = sponsorRes.data.message;
                this.snackbarErorr = true;
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },

    brigthReq() {
      const staker = useDashboardStore().account;
      checkBrightIdConnection(staker)
        .then((res) => {
          console.log(res);
          const response = res.data;
          if (
            response.success &&
            (response.result.brightidAuraVerified ||
              response.result.brightidMeetsVerified)
          ) {
            this.verifications.brightidMeetsVerified =
              response.result.brightidMeetsVerified;
            this.verifications.brightidAuraVerified =
              response.result.brightidAuraVerified;
            window.clearInterval(this.brighitIdIntervalRequest);
            console.log("clear interval");

            this.brightIdStep = 3;

            this.brigthIdLoading = false;
          } else {
            this.brightidTryed++;
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          if (this.brightidTryed > 12 * 3) {
            this.brightIdStep = 4;
            this.brigthIdLoading = false;
            window.clearInterval(this.brighitIdIntervalRequest);
            console.log("clear interval");
          }
        });
    },

    checkBrightIdStatus() {
      this.brigthIdLoading = true;
      this.brightidTryed = 0;
      this.brighitIdIntervalRequest = window.setInterval(
        this.brigthReq(),
        5000
      );
      console.log("interval");
      console.log(this.brighitIdIntervalRequest);
    },
    getCodeAndStakerFromRoute(string) {
      this.discordStep = 1;
      console.log(string);
      const code = string.split("code=")[1].split("&")[0];
      const staker = string.split("state=")[1];
      this.discordResponse.code = code;
      this.discordResponse.staker = staker;
      console.log(code);
      console.log(staker);
      discordRequest(code, staker)
        .then((res) => {
          if (res.data.success) {
            this.discordStep = 2;
          } else {
            this.discordStatus = res.data.message;
            this.discordStep = 3;
          }
        })
        .catch((err) => {
          this.discordStep = 3;
          console.log(err);
          this.discordStatus = "problem in server";
        });
    },
  },
});
