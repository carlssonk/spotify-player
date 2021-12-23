
import { setVolumeIcon } from "./setVolumeIcon.js";
import { playIcon, pauseIcon, unlikeIcon, likeIcon } from "./svgIcons.js";

import {
  stopTrackBtn, shuffleBtn, shuffleIcon, shuffleBlob,
  repeatBtn, repeatIcon, repeatBlob, repeatTrackBlob,
  musicBullet, musicWave, heartBtn
} from "./spotifyControllerDOM.js";

import {
  isPlaying, isShuffle, isLiked, currentVolume, repeatState, playingType,
} from "./handleSpotifyControllers.js"

export const updateControllerDOM = () => {

  if (playingType === "episode") {
    shuffleBtn.disabled = true
    repeatBtn.disabled = true
    heartBtn.disabled = true

    shuffleBtn.style.cursor = "not-allowed"
    repeatBtn.style.cursor = "not-allowed"
    heartBtn.style.cursor = "not-allowed"
  }

  stopTrackBtn.innerHTML = isPlaying ? pauseIcon() : playIcon();

  isLiked ? heartBtn.innerHTML = likeIcon() : heartBtn.innerHTML = unlikeIcon()

  if (!isPlaying) {
    musicWave.style.visibility = "hidden";
    musicBullet.style.display = "block";
  }

  if (isShuffle) {
    shuffleIcon.style.stroke = "#1DB954";
    shuffleBlob.style.display = "block";
  }

  if (repeatState === "context" || repeatState === "track") {
    repeatIcon.style.stroke = "#1DB954";
    repeatBlob.style.display = "block";
    if (repeatState === "track") {
      repeatTrackBlob.style.display = "grid"
    }
  }

  setVolumeIcon(currentVolume)
}