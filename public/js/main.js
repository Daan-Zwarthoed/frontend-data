import {
  getPopularArtistsWorld,
  getPopularTracksWorld,
  getPopularArtistsCountry,
  getPopularTracksCountry,
} from "./fetches.js";
import { makeSlopeChart } from "./slopeChart.js";
import { makeWorldMap, removeCountry } from "./worldMap.js";
let country = "netherlands";
let artistsOrTracks = "tracks";
let allOrLinks = "all";
let popularArtistsWorld = [];
let popularTracksWorld = [];
let popularArtistsCountry = [];
let popularTracksCountry = [];
const worldMapSvg = d3.select("svg");
const countryTextArea = d3.select("#countryTextArea");
const tracksOrArtistsCheckbox = d3.select("#tracksOrArtistsCheckbox");
const allOrLinksCheckbox = d3.select("#allOrLinksCheckbox");
const removeCountriesCheckbox = d3.select("#removeCountriesCheckbox");
const slopeChartDiv = d3.select(".slopeChart");

// Gets all the data and adds it to their respective variable
async function getAllTheData() {
  let fetches = [
    getPopularArtistsWorld(),
    getPopularTracksWorld(),
    getPopularArtistsCountry(country),
    getPopularTracksCountry(country),
  ];

  await Promise.all(fetches).then((data) => {
    popularArtistsWorld = data[0];
    popularTracksWorld = data[1];
    popularArtistsCountry = data[2];
    popularTracksCountry = data[3];
  });
}

// Gets the data based on tracks or the artists and makes a new slopechart
function activateMakeSlopeChart() {
  if (artistsOrTracks === "tracks")
    makeSlopeChart(
      [...popularTracksCountry, ...popularTracksWorld],
      allOrLinks
    );
  if (artistsOrTracks === "artists")
    makeSlopeChart(
      [...popularArtistsCountry, ...popularArtistsWorld],
      allOrLinks
    );
}

// When you click on a country it changes the country and loads new data
worldMapSvg.on("click", async function (event) {
  country = event.target.id;
  if (removeCountriesCheckbox.node().checked) removeCountry(country);
  await getAllTheData();
  activateMakeSlopeChart();
});

// tracks or artist checkbox
tracksOrArtistsCheckbox.on("click", function (event) {
  artistsOrTracks = event.target.checked ? "artists" : "tracks";
  activateMakeSlopeChart();
});

// all or links checkbox
allOrLinksCheckbox.on("click", function (event) {
  allOrLinks = event.target.checked ? "links" : "all";
  activateMakeSlopeChart();
});

// Shows the name of every country if you hover over it
worldMapSvg.on("mouseover", function (event) {
  if (event.target.classList[0] === "country")
    countryTextArea.text(event.target.id);
});

// This changes the color of the text and respective line and text on other side to blue on hover
slopeChartDiv.on("mouseover", function (event) {
  d3.selectAll(".slopeChart text").style("fill", "black");
  d3.selectAll(".slopeChart path").style("stroke", "black");

  if (event.target.id) {
    d3.selectAll(`.slopeChart text#${event.target.id}`).style("fill", "blue");
    d3.selectAll(`.slopeChart path#${event.target.id}`).style("stroke", "blue");
  }
});

// Make the slopechart and worldmap on load
async function onStart() {
  makeWorldMap();
  await getAllTheData();
  activateMakeSlopeChart();
}

onStart();
