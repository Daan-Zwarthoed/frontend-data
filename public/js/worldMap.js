const svg = d3.select("svg");
const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);
let countries;
// Makes the world map
export function makeWorldMap() {
  d3.json(
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
  ).then((data) => {
    countries = topojson.feature(data, data.objects.countries);
    svg
      .selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("id", ({ properties }) => {
        return properties.name;
      })
      .attr("d", pathGenerator);
  });
}

export function removeCountry(chosenCountry) {
  for (let i = 0; i < countries.features.length; i++) {
    if (countries.features[i].properties.name === chosenCountry) {
      countries.features.splice(i, 1);
    }
  }

  svg
    .selectAll("path")
    .data(countries.features)
    .attr("class", "country")
    .attr("id", ({ properties }) => {
      return properties.name;
    })
    .attr("d", pathGenerator);

  svg.selectAll("path").data(countries.features).exit().remove();
}
