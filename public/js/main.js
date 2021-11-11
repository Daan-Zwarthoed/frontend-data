import {
  getPopularArtistsWorld,
  getPopularTracksWorld,
  getPopularArtistsCountry,
  getPopularTracksCountry,
} from "./fetches.js";
import { makeSlopeChart } from "./slopeChart.js";
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
const tracksOrArtistsCheckbox = document.getElementById(
  "tracksOrArtistsCheckbox"
);
const allOrLinksCheckbox = document.getElementById("allOrLinksCheckbox");
const slopeChartDiv = d3.select(".slopeChart");

// Gets all the data and adds it to their respective variable
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
// Shows the name of every country if you hover over it
document.addEventListener("mouseover", function (event) {
  if (event.target.classList[0] === "country") {
    countryTextArea.textContent = event.target.id;
  }
});

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
svg._groups[0][0].addEventListener("click", async function (event) {
  country = event.target.id;
  await getAllTheData();
  activateMakeSlopeChart();
});

// tracks or artist checkbox
tracksOrArtistsCheckbox.addEventListener("click", function (event) {
  artistsOrTracks = event.target.checked ? "artists" : "tracks";
  activateMakeSlopeChart();
});

// all or links checkbox
allOrLinksCheckbox.addEventListener("click", function (event) {
  allOrLinks = event.target.checked ? "links" : "all";
  activateMakeSlopeChart();
});

// This changes the color of the text and respective line and text on other side to blue on hover
slopeChartDiv._groups[0][0].addEventListener(
  "mouseover",
  async function (event) {
    d3.selectAll(".slopeChart text").style("fill", "black");
    d3.selectAll(".slopeChart path").style("stroke", "black");

    if (event.target.id) {
      d3.selectAll(`.slopeChart text#${event.target.id}`).style("fill", "blue");
      d3.selectAll(`.slopeChart path#${event.target.id}`).style(
        "stroke",
        "blue"
      );
    }
  }
);

// Make the slopechart and worldmap on load
getAllTheData().then(() => {
  activateMakeSlopeChart();
});
makeWorldMap();
