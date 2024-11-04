/* SOFIE */
import "../css/Sofie.css";

export default function BarChart({ data }) {
  // styles the margin around the bars in the chart
  const margin = { top: 20, right: 0, bottom: 30, left: 0 };

  // calculates the width and height of the bars, 250 and 350 being default units
  const width = 350 - margin.left - margin.right;
  const height = 250 - margin.top - margin.bottom;

  // sets a maximum of the number of bars to be displayed
  const maxBars = 9;

  // calculates the ideal width of the bars and the gap between them based on the set maximum amount of bars - to make them look consistent no matter the amount of bars
  const idealBarWidth = (width / maxBars) * 0.8;
  const idealBarGap = (width / maxBars) * 0.2;

  // if there are more categories/bars than 9 the width gets adjustet
  const barWidth =
    data.length > maxBars ? (width / data.length) * 0.8 : idealBarWidth;
  const barGap =
    data.length > maxBars ? (width / data.length) * 0.2 : idealBarGap;

  // the total width that all bars and gaps will occupy
  const totalWidth = data.length * (barWidth + barGap);

  // centers the bars in the chart if there are fewer than 9 bars
  const offsetX = data.length < maxBars ? (width - totalWidth) / 2 : 0;

  // scales the height of the bars - the maximim budget value is used to scale the rest of the bars
  const maxBudget = Math.max(...data.map((d) => d.budget));
  const yScale = (value) => height - (value / maxBudget) * height;

  // makes sure the corner radius is not larger than half the bar width for visual purposes
  const cornerRadius = Math.min(20, barWidth / 2);

  // thesholds for what are consideres small spending amounts and small budget amounts - if they are concideres small, a rectangle is added to hide bar styling "under" the bars
  const smallSpentThreshold = 5;
  const smallBudgetThreshold = 40;

  // the tops of the bars gets rounded
  function roundedTopBarPath(x, y, width, height, radius) {
    return `
      M ${x},${y + height}
      L ${x},${y + radius}
      Q ${x},${y} ${x + radius},${y}
      L ${x + width - radius},${y}
      Q ${x + width},${y} ${x + width},${y + radius}
      L ${x + width},${y + height}
      Z
    `;
  }

  // makes the background color of the bars lighter
  function getLighterColor(color) {
    let r = parseInt(color.slice(1, 3), 16);
    let g = parseInt(color.slice(3, 5), 16);
    let b = parseInt(color.slice(5, 7), 16);

    r = Math.min(255, r + 40);
    g = Math.min(255, g + 40);
    b = Math.min(255, b + 40);

    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  return (
    <div>
      <svg
        className="placement_txt_barchart"
        preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 350 250`}
      >
        <g transform={`translate(${margin.left + offsetX}, ${margin.top})`}>
          {/* maps through each item from the data and calculates them to render them */}
          {data.map((item, index) => {
            const spent = item.budget - (item.remaining || item.budget);
            const spentRatio = spent / item.budget;
            const isVerySmallSpent =
              spentRatio > 0 && spentRatio < smallSpentThreshold;
            const isSmallBudget = item.budget < smallBudgetThreshold;
            return (
              <g
                key={item.id}
                transform={`translate(${index * (barWidth + barGap)}, 0)`}
              >
                {/* outer bar, budget, gets lighter color */}
                <path
                  d={roundedTopBarPath(
                    0,
                    yScale(item.budget),
                    barWidth,
                    height - yScale(item.budget),
                    cornerRadius
                  )}
                  fill={getLighterColor(item.color || "#E0E0E0")}
                />
                {/* inner bar, spent amount, gets category color */}
                {spent > 0 && (
                  <path
                    d={roundedTopBarPath(
                      0,
                      yScale(spent),
                      barWidth,
                      height - yScale(spent),
                      cornerRadius
                    )}
                    fill={item.color || "#4CAF50"}
                  />
                )}
                {/* rectangle to cover very small spent amounts or small budget amounts "under" the bars for visual purposes */}
                {(isVerySmallSpent || isSmallBudget) && (
                  <rect
                    x={-1}
                    y={height + 0.1}
                    width={barWidth + 2}
                    height={50}
                    fill="#FBE9E9"
                  />
                )}
                {/* category name under the bar */}
                <text x={barWidth / 2} y={height + 15} textAnchor="middle">
                  {item.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
