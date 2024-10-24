import "../css/Sofie.css";

export default function BarChart({ data }) {
  const margin = { top: 20, right: 20, bottom: 30, left: 30 };
  const width = 350 - margin.left - margin.right; // 350 is a default width
  const height = 250 - margin.top - margin.bottom; // 250 is a default height

  const maxBudget = Math.max(...data.map((d) => d.budget));
  const yScale = (value) => height - (value / maxBudget) * height;

  const barWidth = (width / data.length) * 0.8;
  const barGap = (width / data.length) * 0.2;
  const cornerRadius = 20;

  // Threshold for what we consider a "very small" spent amount
  const smallSpentThreshold = 5;

  // Rounds of the tops of the bars
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

  // Converts hex to RGB and then increases lightness
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
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {data.map((item, index) => {
            const spent = item.budget - (item.remaining || item.budget);
            const spentRatio = spent / item.budget;
            const isVerySmallSpent =
              spentRatio > 0 && spentRatio < smallSpentThreshold;
            return (
              <g
                key={item.id}
                transform={`translate(${index * (barWidth + barGap)}, 0)`}
              >
                {/* Outer bar (total budget) - lighter color */}
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
                {/* Inner bar (spent amount) - only if spent > 0 */}
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
                {/* White rectangle to cover very small spent amounts */}
                {isVerySmallSpent && (
                  <rect
                    x={-1}
                    y={height + 0.1} // Position it just above the bottom
                    width={barWidth + 2}
                    height={50} // Make it thin
                    fill="#fefdfb"
                  />
                )}
                {/* Category name */}
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
