const svg = d3.select("svg");

// Makes the world map
export function makeWorldMap() {
  const projection = d3.geoNaturalEarth1();
  const pathGenerator = d3.geoPath().projection(projection);
  svg
    .append("path")
    .attr("class", "sphere")
    .attr("d", pathGenerator({ type: "Sphere" }));

  d3.json(
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
  ).then((data) => {
    const countries = topojson.feature(data, data.objects.countries);
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
