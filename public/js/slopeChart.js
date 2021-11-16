// https://observablehq.com/@d3/slope-chart
let slopeChartSelf;
let plotChartDataFiltered = [];
const slopeChartDiv = d3.select(".slopeChart");

// Filters the data out that doesnt exist twice
function filterSlopeChartData(plotChartData) {
  plotChartDataFiltered = [];
  plotChartData.forEach((dataElement) => {
    let count = 0;
    plotChartData.forEach((dataElement2) => {
      if (dataElement2.name === dataElement.name) count++;
    });
    if (count === 2) plotChartDataFiltered.push(dataElement);
  });
}

function plotSlopeChart(plotChartData, dataTextElements) {
  // This returns an svg element that has all the data in it
  slopeChartSelf = Plot.plot({
    x: {
      type: "point",
      axis: "top",
      label: `${plotChartData[0].country} - world`,
    },
    y: { axis: null, inset: -15, reverse: true },
    marks: [
      // Makes the lines
      Plot.line(plotChartDataFiltered, {
        x: "country",
        y: "position",
        z: "name",
        strokeWidth: 1.5,
      }),
      // Makes the text on the left
      Plot.text(
        dataTextElements,
        Plot.selectFirst({
          x: "country",
          y: "position",
          z: "name",
          text: (d) => {
            if (d.country === dataTextElements[0].country)
              return `${d.name} ${d.position}`;
          },
          textAnchor: "end",
          dx: -2,
        })
      ),
      // Makes the text on the right
      Plot.text(
        dataTextElements,
        Plot.selectLast({
          x: "country",
          y: "position",
          z: "name",
          text: (d) => {
            if (d.country !== dataTextElements[0].country)
              return `${d.name} ${d.position}`;
          },
          textAnchor: "start",
          dx: 2,
        })
      ),
    ],
  });
}

function addIdPerElement() {
  // This adds the name of every datapoint to their element and connecting line
  let indexNumber = -1;
  const slopeChartPaths = d3.selectAll(".slopeChart path")._groups[0];
  d3.selectAll("text").attr("id", (_, _1, slopeChartTexts) => {
    indexNumber++;
    // Loops through every line and text to check if their coordinates match.
    if (slopeChartTexts[indexNumber].y.baseVal[0]) {
      for (let index = 0; index < slopeChartPaths.length; index++) {
        if (slopeChartPaths[index].getAttribute("d").split(".")[1]) {
          if (
            slopeChartPaths[index]
              .getAttribute("d")
              .split(".")[1]
              .split(",")
              .includes(
                slopeChartTexts[indexNumber].y.baseVal[0].valueAsString
                  .split(".")[0]
                  .toString()
              )
          ) {
            // If the coordinates match up then the name of the song or artist gets added to the lines id
            slopeChartPaths[index].id = slopeChartTexts[
              indexNumber
            ].innerHTML.replaceAll(/[0-9 ? ! . ' ; & ( )]/g, "");
          }
        }
      }
    }
    // Add name of the song or artist to the id of the text
    return slopeChartTexts[indexNumber].innerHTML.replaceAll(
      /[0-9 ? ! . ' ; & ( )]/g,
      ""
    );
  });
}

// This function makes the slope chart
export function makeSlopeChart(plotChartData, allOrLinks) {
  filterSlopeChartData(plotChartData);

  // The data that is used for the textelements
  const dataTextElements =
    allOrLinks === "links" ? plotChartDataFiltered : plotChartData;

  if (slopeChartSelf) slopeChartSelf.remove();
  slopeChartDiv.text("");

  if (plotChartData[51]) {
    plotSlopeChart(plotChartData, dataTextElements);
    slopeChartDiv.node().appendChild(slopeChartSelf);
  } else {
    slopeChartDiv.text(
      "This country either does not have any songs or does not exist in the API"
    );
  }

  addIdPerElement();
}
