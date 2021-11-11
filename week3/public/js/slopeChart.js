// https://observablehq.com/@d3/slope-chart
let slopeChartSelf;
export function makeSlopeChart(plotChartData, allOrLinks) {
  if (slopeChartSelf) slopeChartSelf.remove();
  slopeChartSelf = Plot.plot({
    x: { type: "point", axis: "top", label: `${plotChartData[0].country} - world` },
    y: { axis: null, inset: -15, reverse: true },
    marks: [
      Plot.line(plotChartData, {
        x: "country",
        y: "position",
        z: "name",
        strokeWidth: 1,
      }),
      Plot.text(
        plotChartData,
        Plot.selectFirst({
          x: "country",
          y: "position",
          z: "name",
          text: (d) => {
            if (d.country !== "world") {
              if (allOrLinks === "links") {
                let index = 0;
                let showLabel = false;
                plotChartData.forEach((dataElement) => {
                  if (dataElement.name === d.name) {
                    index++;
                    if (index === 2) {
                      showLabel = true;
                    }
                  }
                });
                if (showLabel === true) return `${d.name} ${d.position}`;
              } else {
                return `${d.name} ${d.position}`;
              }
            }
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
            if (d.country === "world") {
              if (allOrLinks === "links") {
                let index = 0;
                let showLabel = false;
                plotChartData.forEach((dataElement) => {
                  if (dataElement.name === d.name) {
                    index++;
                    if (index === 2) {
                      showLabel = true;
                    }
                  }
                });
                if (showLabel === true) return `${d.name} ${d.position}`;
              } else {
                return `${d.name} ${d.position}`;
              }
            }
          },
          textAnchor: "start",
          dx: 3,
        })
      ),
    ],
  });

  const slopeChartDiv = d3.select(".slopeChart");
  slopeChartDiv._groups[0][0].appendChild(slopeChartSelf);
  let indexNumber = -1;
  const testDing = document.querySelectorAll(".slopeChart path");
  d3.selectAll("text").attr("id", (a, b, c) => {
    indexNumber++;
    if (c[indexNumber].y.baseVal[0]) {
      for (let index = 0; index < testDing.length; index++) {
        if (testDing[index]) {
          if (testDing[index].getAttribute("d").split(".")[1]) {
            if (testDing[index].getAttribute("d").split(".")[1].split(",")[1]) {
              if (testDing[index].getAttribute("d").split(".")[1].split(",").includes(c[indexNumber].y.baseVal[0].valueAsString.split(".")[0].toString())) {
                testDing[index].id = c[indexNumber].innerHTML.replaceAll(" ", "").replaceAll("!", "").replaceAll(".", "").replaceAll(/[0-9]/g, "");
              }
            }
          }
        }
      }
    }
    return c[indexNumber].innerHTML.replaceAll(" ", "").replaceAll("!", "").replaceAll(".", "").replaceAll(/[0-9]/g, "");
  });
}

export function updateSlopeChart(plotChartData) {}
