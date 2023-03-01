import { signedFetch } from "@decentraland/SignedFetch";
import { getUserData } from "@decentraland/Identity";
import { MessageOptions, UIMessageSystem } from "./ui";
import messages from "./messages";

let userWallet: string;

enum ClaimDenied {
  BEFORE_EVENT,
  AFTER_EVENT,
  EXISTING_CLAIM,
  IP_LIMIT,
  NO_SUPPLY,
  MANIPULATION,
  INAUTHENTIC
}

async function loadUserData() {
  try {
    const userData = await getUserData();
    userWallet = userData && userData.publicKey;
  } catch (error) {
    log(error);
  }
}

loadUserData();

const DEV_MODE = false;
let API_BASE_URL = DEV_MODE ? "http://localhost:3000/nft/" : "https://api.dcl-vlm.io/nft/";
let requestInProgress = false;

function showMessage(response: any, messageOptions: MessageOptions) {
  requestInProgress = false;

  if (response.error) {
    UIMessageSystem.show(messages.errorMessage, messageOptions);
  } else if (response.reason === ClaimDenied.BEFORE_EVENT) {
    UIMessageSystem.show(messages.beforeEventTime, messageOptions);
  } else if (response.reason === ClaimDenied.AFTER_EVENT) {
    UIMessageSystem.show(messages.afterEventTime, messageOptions);
  } else if (response.reason === ClaimDenied.EXISTING_CLAIM) {
    UIMessageSystem.show(messages.existingClaim, messageOptions);
  } else if (response.reason === ClaimDenied.IP_LIMIT) {
    UIMessageSystem.show(messages.ipLimitReached, messageOptions);
  } else if (response.reason === ClaimDenied.NO_SUPPLY) {
    UIMessageSystem.show(messages.noSupply, messageOptions);
  } else if (response.reason === ClaimDenied.INAUTHENTIC) {
    UIMessageSystem.show(messages.inauthenticConnection, messageOptions);
  } else if (response.success) {
    UIMessageSystem.show(messages.successfulClaim, messageOptions);
  }
}

export default async (claimAction: string, messageOptions: MessageOptions) => {
  try {
    if (!userWallet) {
      UIMessageSystem.show(messages.noWallet);
      return;
    } else if (requestInProgress) {
      return;
    }

    requestInProgress = true;
    let response = await signedFetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ claimAction })
    });

    let json;
    if (!response.text) return;

    json = JSON.parse(response.text);
    showMessage(json, messageOptions);
    return json;
  } catch (error) {
    let response = {
      error: true,
      message: error
    };
    showMessage(response, messageOptions);
    return response;
  }
};
