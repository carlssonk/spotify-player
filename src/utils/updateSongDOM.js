const albumCover = document.querySelector("[data-js=album-cover]")
const songName = document.querySelector("[data-js=song__name]")
const songArtists = document.querySelector("[data-js=song__artists]")
const mainContainer = document.querySelector("[data-js=main]")
const song = document.querySelector("[data-js=song]")

export const updateSongDOM = (data) => {
  let commaSeperatedArtists = ""
  data.item.artists.forEach((obj, idx) => {
    commaSeperatedArtists += `${obj.name}${idx === data.item.artists.length - 1 ? "" : ","} `
  })

  albumCover.src = data.item.album.images.length > 1 ? data.item.album.images[1].url : data.item.album.images[0].url
  songName.innerText = data.item.name;
  songArtists.innerText = commaSeperatedArtists;

  const colorThief = new ColorThief();

  // Make sure image is finished loading
  if (albumCover.complete) {
    setColor(colorThief.getColor(albumCover))
  } else {
    albumCover.addEventListener('load', function () {
      setColor(colorThief.getColor(albumCover))
    });
  }

  function setColor(color) {
    mainContainer.style.background = `rgb(${color[0]},${color[1]},${color[2]})`
  }

  handleSongNameSlide()
}


function handleSongNameSlide() {
  const SONG_WIDTH = song.offsetWidth;
  const NAME_WIDTH = songName.offsetWidth;
  const ARTIST_WIDTH = songArtists.offsetWidth;

  if (NAME_WIDTH > SONG_WIDTH) {
    // Calculate animation time
    const LENGTH = NAME_WIDTH - SONG_WIDTH

    // Change these values for different slide speed & delay
    const ANIMATION_TIME = LENGTH / 20;
    const intervalDelay = 2500;

    createAnimationLoop(songName, LENGTH, ANIMATION_TIME, intervalDelay)

  }

  if (ARTIST_WIDTH > SONG_WIDTH) {
    // Calculate animation time
    const LENGTH = ARTIST_WIDTH - SONG_WIDTH

    // Change these values for different slide speed & delay
    const ANIMATION_TIME = LENGTH / 25;
    const intervalDelay = 2500;

    createAnimationLoop(songArtists, LENGTH, ANIMATION_TIME, intervalDelay)
  }


  function createAnimationLoop(slideElement, LENGTH, ANIMATION_TIME, intervalDelay) {

    slideElement.style.transition = `${ANIMATION_TIME}s linear`

    setTimeout(() => {
      slideElement.style.transform = `translate3d(-${LENGTH}px, 0, 0)`

      setTimeout(() => {
        slideElement.style.transform = `translate3d(0, 0, 0)`

        setInterval(() => {
          slideElement.style.transform = "translate3d(0, 0, 0)"
        }, ((ANIMATION_TIME * 1000) * 2) + intervalDelay * 2)

      }, (ANIMATION_TIME * 1000) + intervalDelay)

      setInterval(() => {
        slideElement.style.transform = `translate3d(-${LENGTH}px, 0, 0)`
      }, ((ANIMATION_TIME * 1000) * 2) + intervalDelay * 2)

    }, 2000)

  }


}