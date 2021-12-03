import { refreshToken } from "./refreshToken.js"
let authoAuthOFailed = false; // failsafe if refreshtoken fails

export const checkDeviceStatus = async (ACCESS_TOKEN, REFRESH_TOKEN) => {
  if (authoAuthOFailed) return;

  const res = await fetch("https://api.spotify.com/v1/me/player/devices", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()

  if (data.error && data.error.status === 401) {
    // GENERATE NEW TOKEN
    console.log("OLD ACCESS_TOKEN: " + ACCESS_TOKEN)
    const wasSuccessful = await refreshToken(REFRESH_TOKEN);
    if (wasSuccessful) {
      console.log("Was Successful!")
      // LISTEN FOR DEVICE HERE
      return checkDeviceStatus(ACCESS_TOKEN, REFRESH_TOKEN)
    }
    authoAuthOFailed = true;
    return false;
  }

  return data.devices
}