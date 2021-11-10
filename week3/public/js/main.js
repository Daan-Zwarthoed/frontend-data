import { getPopularArtistsWorld, getPopularTracksWorld, getPopularArtistsCountry, getPopularTracksCountry } from "./fetches.js";
import { makeSlopeChart } from "./slopeChart.js";
import { makeWorldMap } from "./worldMap.js";
let country = "netherlands";
let artistsOrTracks = "artists";
let popularArtistsWorld = [];
let popularTracksWorld = [];
let popularArtistsCountry = [];
let popularTracksCountry = [];
const svg = d3.select("svg");
const countryTextArea = document.getElementById("countryTextArea");
const tracksOrArtistsCheckbox = document.getElementById("tracksOrArtistsCheckbox");

async function getAllTheData() {
  await getPopularArtistsWorld().then((popularArtists) => {
    popularArtistsWorld = popularArtists;
  });
  await getPopularTracksWorld().then((popularTracks) => {
    popularTracksWorld = popularTracks;
  });
  await getPopularArtistsCountry(country).then((popularArtists) => {
    popularArtistsCountry = popularArtists;
  });
  await getPopularTracksCountry(country).then((popularTracks) => {
    popularTracksCountry = popularTracks;
  });
}

document.addEventListener("mouseover", function (event) {
  if (event.target.classList[0] === "country") {
    countryTextArea.textContent = event.target.id;
  }
});

svg._groups[0][0].addEventListener("click", function (event) {
  console.log(event.target.id);
});

tracksOrArtistsCheckbox.addEventListener("click", function (event) {
  artistsOrTracks = event.target.checked ? "artists" : "tracks";
  if (artistsOrTracks === "tracks") makeSlopeChart([...popularTracksCountry, ...popularTracksWorld]);
  if (artistsOrTracks === "artists") makeSlopeChart([...popularArtistsCountry, ...popularArtistsWorld]);
});

getAllTheData().then(() => {
  makeSlopeChart([...popularTracksCountry, ...popularTracksWorld]);
});

makeWorldMap();
