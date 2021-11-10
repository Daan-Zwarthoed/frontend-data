export function makeSlopeChart(plotChartData) {
  const slopeGraphSelf = Plot.plot({
    x: { type: "point", axis: "top", label: null },
    y: { axis: null, inset: 20 },
    marks: [
      Plot.line(plotChartData, { x: "country", y: "position", z: "name", strokeWidth: 1 }),
      Plot.text(
        plotChartData,
        Plot.selectFirst({
          x: "country",
          y: "position",
          z: "name",
          text: (d) => {
            if (d.country === "netherlands") return `${d.name} ${d.position}`;
          },
          textAnchor: "end",
          dx: -3,
        })
      ),
      Plot.text(
        plotChartData,
        Plot.selectLast({
          x: "country",
          y: "position",
          z: "name",
          text: (d) => {
            if (d.country === "world") return `${d.position} ${d.name}`;
          },
          textAnchor: "start",
          dx: 3,
        })
      ),
    ],
  });

  const slopeGraphDiv = d3.select(".slopeGraph");
  slopeGraphDiv._groups[0][0].appendChild(slopeGraphSelf);
}

export function updateSlopeChart(plotChartData) {}
