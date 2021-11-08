import { getPopularArtistsWorld, getPopularTracksWorld, getPopularArtistsCountry, getPopularTracksCountry } from "./fetches.js";
let country = "netherlands";

async function getAllTheData() {
  await getPopularArtistsWorld().then((popularArtists) => {
    console.log("worldArtist:", popularArtists[0].name);
  });
  await getPopularTracksWorld().then((popularTracks) => {
    console.log("worldTrack:", popularTracks[0].name);
  });
  await getPopularArtistsCountry(country).then((popularArtists) => {
    console.log("countryArtist:", popularArtists[0].name);
  });
  await getPopularTracksCountry(country).then((popularTracks) => {
    console.log("countryTrack:", popularTracks[0].name);
  });
}

getAllTheData();

const svg = d3.select("svg");
const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);
svg
  .append("path")
  .attr("class", "sphere")
  .attr("d", pathGenerator({ type: "Sphere" }));

d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((data) => {
  const countries = topojson.feature(data, data.objects.countries);
  svg.selectAll("path").data(countries.features).enter().append("path").attr("class", "country").attr("d", pathGenerator);
  for (let i = 0; i < countries.features.length; i++) {
    svg.selectAll("path")._groups[0][i].id = countries.features[i].properties.name;
  }
});

const countryTextArea = document.getElementById("countryTextArea");

document.addEventListener("mouseover", function (event) {
  if (event.target.classList[0] === "country") {
    countryTextArea.textContent = event.target.id;
  }
});

svg._groups[0][0].addEventListener("click", function (event) {
  console.log(event.target.id);
});
