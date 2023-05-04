import axios from "axios";
import { BASEURL } from "./fetch";
const verificationEndPoint = BASEURL + "/uniqueness";

export const verification = async (staker) => {
  if (staker) {
    let res = await axios.get(
      `${verificationEndPoint}/verifications/${staker}`
    );
    return res;
  }
};

export const telegramVerification = async (user, staker) => {
  user.staker = staker;
  return axios.post(`${verificationEndPoint}/telegtam`, JSON.stringify(user), {
    headers: {
      "Content-Type": "application/json",
    },
    dataType: "json",
  });
};

export const singMessage = async (msg, account) => {
  try {
    const sign = await ethereum.request({
      method: "personal_sign",
      params: [msg, account, "Example password"],
    });
    return sign;
  } catch (error) {
    console.log(error);
  }
};

export const saleRequest = async (staker, signer, signature) => {
  const data = JSON.stringify({
    staker: staker,
    signer: signer,
    signature: signature,
  });
  return await axios.post(`${verificationEndPoint}/sale`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const discordRequest = async () => {
  return axios.get(window.location.href);
};

export const getBrightIdContextId = async (staker, signature) => {
  const data = JSON.stringify({
    staker: staker,
    signature: signature,
  });
  return await axios.post(`${verificationEndPoint}/brightid/contextId`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const sponsorBrightIdRequest = async (staker) => {
  return await axios.post(
    `${verificationEndPoint}/brightid/sponsor`,
    JSON.stringify({ staker: staker }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const checkBrightIdConnection = async (staker) => {
  return await axios.get(`${verificationEndPoint}/brightid?staker=${staker}`);
};
