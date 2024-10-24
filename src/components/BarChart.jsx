import "../css/Sofie.css";

export default function BarChart({ data }) {
  const svgWidth = 400;
  const svgHeight = 300;
  const margin = { top: 20, right: 20, bottom: 30, left: 20 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const maxBudget = Math.max(...data.map((d) => d.budget));
  const yScale = (value) => height - (value / maxBudget) * height;

  const barWidth = (width / data.length) * 0.8;
  const barGap = (width / data.length) * 0.2;
  const cornerRadius = 25;

  // Threshold for what we consider a "very small" spent amount
  const smallSpentThreshold = 5; // 5% of the budget

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

  function getLighterColor(color) {
    // Convert hex to RGB, then increase lightness
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

  const yAxis = () => {
    const ticks = 5;
    return Array.from({ length: ticks }, (_, i) => (
      <g key={i} transform={`translate(0, ${(i * height) / (ticks - 1)})`}></g>
    ));
  };

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {yAxis()}
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
              <text
                x={barWidth / 2}
                y={height + 15}
                textAnchor="middle"
                fontSize="12"
                fontFamily="sans-serif"
              >
                {item.name}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
