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

const ERRORCODE = {
  1: ()=>'Staker address is not valid or does not belong to a node.',
  2: (platform) => `This ${platform} ${platform === 'presale'? 'address':'account'} address is not eligible.`,
  3: (platform) => `This ${platform} ${platform === 'presale'? 'address':'account'} is already registred by another node.`,
  4: ()=>'Your request has already been registered.',
  5: () => 'Your signature is not valid.',
  11: () => 'Something went wrong. Please try after a while. (error code: 11)',
  12: () => 'Something went wrong. Please try after a while. (error code: 12)',
  'connection': ()=>'Something went wrong. Please try after a while. (connection problem)'
}

export const useVerificationsStore = defineStore("verificationsStore", {
  state: () => ({
    telegramDialog: false,
    brightIdContextId: "",
    presaleLoading: false,
    brightIdDialog: false,
    backToStakerDialog: false,
    verifications: {
      telegramVerified: false,
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
    preslaeStep: 1,
    presaleMessage: "",
    snackbarErorr: false,
    snackbarErorrMsg: "",
    brigthIdLoading: false,
    discordMessage: "...Loading",
    errorMessage : ""
  }),

  actions: {
    getVerificationsStatus(staker) {
      verificationStatus(staker).then((response) => {
        if (response) {
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
        }
        });
    },
    telegramCallbackFunction(user) {
      this.errorMessage = ""
      const staker = useDashboardStore().account;
      // gets user as an input
      // id, first_name, last_name, username,
      // photo_url, auth_date and hash
      console.log(user);
      telegramVerification(user, staker).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.verifications.telegramVerified = true;
          this.telegramStep = 2;
        } else {
          console.log(res.data.message);
          this.errorMessage = ERRORCODE[res.data.errorCode]('Telegram')
          this.telegramStep = 3;
        }
      }).catch(() => {
        this.errorMessage = ERRORCODE['connection']()
        this.telegramStep = 3;
      });
    },
    presaleVerified(staker) {
      this.errorMessage = ""
      const signer = useDashboardStore().account;
      this.presaleLoading = true;
      singMessage(
        "Please sign this message to verify ownership of your Ethereum address to verify its uniqueness for Muon.",
        signer
      ).then(async (signature) => {
        await saleRequest(staker, signer, signature)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              this.preslaeStep = 2;
              this.verifications.presaleVerified = true;
            } else {
              this.errorMessage = ERRORCODE[res.data.errorCode]('presale')
              this.preslaeStep = 3;
              this.presaleMessage = res.data.message;
            }
          })
          .catch((err) => {
            console.log(err);
            this.errorMessage = ERRORCODE['connection']()
            this.preslaeStep = 3;
          })
          .finally(() => {
            this.presaleLoading = false;
          });
      }).catch(() => {
        this.errorMessage = ERRORCODE['connection']()
        this.preslaeStep = 3;
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
       height=900,
       left=500`
      );
    },
    brightIdVerification() {
      this.errorMessage = ""
      const staker = useDashboardStore().account;
      this.brigthIdLoading = true;
      singMessage(
        "Please sign this message to verify ownership of your Ethereum address to verify its uniqueness for Muon.",
        staker
      )
        .then(async (signature) => {
          await getBrightIdContextId(staker, signature)
            .then(async (res) => {
              console.log(res);
              if (!res.data.success) {
                this.errorMessage = ERRORCODE[res.data.errorCode]('BrightID')
                this.brightIdStep = 6
              } else {
                
                await sponsorBrightIdRequest(staker).then((sponsorRes) => {
                  console.log(sponsorRes);
                  if (sponsorRes.data.success) {
                    this.brightIdContextId = res.data.result.contextId;
                    this.brightIdStep = 4;
                  } else {
                    this.errorMessage = ERRORCODE[sponsorRes.data.errorCode]('BrightID')
                    this.brightIdStep = 6
                  }
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.errorMessage = ERRORCODE['connection']()
              this.brightIdStep = 6
            });
        })
        .finally(() => {
          this.brigthIdLoading = false;
        });
    },

    brigthReq() {
      this.errorMessage = ""
      const staker = useDashboardStore().account;
      checkBrightIdConnection(staker)
        .then((res) => {
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
            this.brightIdStep = 5;
            this.brigthIdLoading = false;
          } else if (!response.success && response.errorCode) {
            this.errorMessage = ERRORCODE[response.errorCode]("BrightID")
            this.brightIDMessage = response.message
            this.brightIdStep = 6
            window.clearInterval(this.brighitIdIntervalRequest);
            this.brigthIdLoading = false;
          }
          else {
            this.brightidTryed++;
            this.errorMessage = ""
          }
        })
        .catch((err) => {
          console.log(err);
          this.errorMessage = ERRORCODE['connection']()

        })
        .finally(() => {
          if (this.brightidTryed > 12 * 3) {
            this.brightIdStep = 6;
            this.brigthIdLoading = false;
            window.clearInterval(this.brighitIdIntervalRequest);
          }
        });
    },

    checkBrightIdStatus() {
      this.brigthIdLoading = true;
      this.brightidTryed = 0;
      this.brighitIdIntervalRequest = window.setInterval(this.brigthReq, 5000);
    },
    getCodeAndStakerFromRoute(string) { // discord
      this.errorMessage = ""
      this.discordStep = 1;
      console.log(string.split("code=").length);
      if (string.split("code=").length < 2) {
        this.discordStep = 3;
        return 0;
      }
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
            this.discordMessage = res.data.message;
            this.errorMessage = ERRORCODE[res.data.errorCode]('Discord')
            this.discordStep = 3;
          }
        })
        .catch((err) => {
          this.errorMessage = ERRORCODE['connection']()
          this.discordStep = 3;
          console.log(err);
          this.discordMessage = "problem in server";
        });
    },
    closePopup() {
      console.log(window.opener);
      window.opener.location.reload();
      self.close();
    },
    checkBack(staker) {
      const signer = useDashboardStore().account;
      if (staker === signer) {
        this.router.push("/verification");
      } else {
        this.backToStakerDialog = true;
      }
    },
    clearDataAfterChangeAccount() {
      this.errorMessage = ""
      this.brightIdContextId = "";
      this.discordResponse.code = "";
      this.discordResponse.staker = "";
      window.clearInterval(this.brighitIdIntervalRequest);
      this.brightidTryed = 0;
      this.presaleMessage = ""
      this.brigthIdLoading = false
      this.brightIDMessage = ""
    }
  },
});
