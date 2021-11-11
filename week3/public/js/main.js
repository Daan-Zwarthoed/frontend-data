import { getPopularArtistsWorld, getPopularTracksWorld, getPopularArtistsCountry, getPopularTracksCountry } from "./fetches.js";
import { makeSlopeChart, updateSlopeChart } from "./slopeChart.js";
import { makeWorldMap } from "./worldMap.js";
let country = "netherlands";
let artistsOrTracks = "tracks";
let allOrLinks = "all";
let popularArtistsWorld = [];
let popularTracksWorld = [];
let popularArtistsCountry = [];
let popularTracksCountry = [];
const svg = d3.select("svg");
const countryTextArea = document.getElementById("countryTextArea");
const tracksOrArtistsCheckbox = document.getElementById("tracksOrArtistsCheckbox");
const allOrLinksCheckbox = document.getElementById("allOrLinksCheckbox");
const slopeChartDiv = d3.select(".slopeChart");

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

function getData() {
  if (artistsOrTracks === "tracks") makeSlopeChart([...popularTracksCountry, ...popularTracksWorld], allOrLinks);
  if (artistsOrTracks === "artists") makeSlopeChart([...popularArtistsCountry, ...popularArtistsWorld], allOrLinks);
}

svg._groups[0][0].addEventListener("click", async function (event) {
  country = event.target.id;
  await getAllTheData();
  getData();
});

tracksOrArtistsCheckbox.addEventListener("click", function (event) {
  artistsOrTracks = event.target.checked ? "artists" : "tracks";
  getData();
});

allOrLinksCheckbox.addEventListener("click", function (event) {
  allOrLinks = event.target.checked ? "links" : "all";
  getData();
});

slopeChartDiv._groups[0][0].addEventListener("mouseover", async function (event) {
  d3.selectAll(".slopeChart text").style("fill", "black");
  d3.selectAll(".slopeChart path").style("stroke", "black");

  if (event.target.id) {
    d3.selectAll(`.slopeChart text#${event.target.id}`).style("fill", "blue");
    d3.selectAll(`.slopeChart path#${event.target.id}`).style("stroke", "blue");
  }
});

getAllTheData().then(() => {
  getData();
});

makeWorldMap();
