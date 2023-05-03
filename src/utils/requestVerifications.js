import axios from "axios";
import { BASEURL } from "./fetch";
const verificationEndPoint = BASEURL + "/uniqueness/verifications";

export const telegramVerification = async (
  telegramId,
  telegramUsername,
  hash,
  staker
) => {
  const user = {
    id: telegramId,
    username: telegramUsername,
    hash: hash,
    staker: staker,
  };
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
  return await axios.post(
    `${verificationEndPoint}/sale`,
    {
      staker: staker,
      signer: signer,
      signature: signature,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const discordRequest = async () => {
  return axios.get(window.location.href);
};

export const getBrightIdContextId = async (staker, signature) => {
  return await axios.post(
    `${verificationEndPoint}/brightid/contextId`,
    {
      staker: staker,
      signature: signature,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
